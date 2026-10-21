"""Draw an iPhone 17 Pro frame around real iOS captures, and publish the demo.

Both published forms come from one decoded frame set, so the framed and
frameless files carry the identical sequence in the identical order.

The frame is a static titanium band and black glass drawn around the capture.
The app pixels inside it are copied through untouched; only the four screen
corners are rounded, exactly as a real display curves into the body.

Requires macOS with ffmpeg and Pillow:

    python3 redesign/onboarding-core/demo/create-demo.py
"""
from pathlib import Path
from PIL import Image, ImageDraw
import math, subprocess, json, shutil

ROOT = Path(__file__).resolve().parents[3]
DEMO = ROOT / 'redesign/onboarding-core/demo'
SHOTS = ROOT / 'redesign/fresh/native-shots'
SOURCE = Path('/tmp/monolith-hands-on/hands-on-take2.mp4')

GLASS_PT, BAND_PT = 12.0, 5.0
DEVICE_RADIUS_PT, SCREEN_RADIUS_PT = 66.0, 55.0
LOGICAL_W = 402          # iPhone 17 Pro logical width
SCREEN_OUT_W = 720       # published screen width
FPS = 30
TMP = Path('/tmp/monolith-frame/work')


def band_gradient(w, h):
    """Titanium: a soft vertical gradient with a bright upper-left sheen."""
    base = Image.new('RGB', (w, h), (0, 0, 0))
    px = base.load()
    for y in range(h):
        t = y / max(1, h - 1)
        v = int(196 - 74 * t + 26 * math.sin(t * math.pi))
        for x in range(w):
            u = x / max(1, w - 1)
            sheen = int(16 * (1 - u) * math.sin(t * math.pi * 0.8))
            c = max(0, min(255, v + sheen))
            px[x, y] = (c, c - 2, c - 6)
    return base


def frame_parts(screen_w, screen_h):
    """Return (frame RGB, screen mask L, offset) for a given screen size."""
    scale = screen_w / LOGICAL_W
    glass = int(round(GLASS_PT * scale))
    band = int(round(BAND_PT * scale))
    W, H = screen_w + 2 * (glass + band), screen_h + 2 * (glass + band)
    r_dev = int(round(DEVICE_RADIUS_PT * scale))
    r_glass = int(round((DEVICE_RADIUS_PT - BAND_PT) * scale))
    r_screen = int(round(SCREEN_RADIUS_PT * scale))
    off = band + glass

    canvas = Image.new('RGB', (W, H), (14, 16, 18))
    mask = Image.new('L', (W, H), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, W - 1, H - 1), radius=r_dev, fill=255)
    canvas.paste(band_gradient(W, H), (0, 0), mask)
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle((0, 0, W - 1, H - 1), radius=r_dev, outline=(232, 232, 236),
                        width=max(1, int(scale * 0.8)))
    d.rounded_rectangle((band, band, W - band - 1, H - band - 1), radius=r_glass, fill=(8, 9, 10))

    smask = Image.new('L', (screen_w, screen_h), 0)
    ImageDraw.Draw(smask).rounded_rectangle((0, 0, screen_w - 1, screen_h - 1), radius=r_screen, fill=255)
    return canvas, smask, off


def frame_still(screen: Image.Image, out: Path):
    frame, mask, off = frame_parts(screen.width, screen.height)
    frame.paste(screen.convert('RGB'), (off, off), mask)
    frame.save(out, quality=95)
    return out


def build_stills():
    out_dir = SHOTS / 'framed'
    out_dir.mkdir(parents=True, exist_ok=True)
    for shot in sorted(SHOTS.glob('0*.png')):
        frame_still(Image.open(shot), out_dir / shot.name)
        print('framed', shot.name)


def decode_frames(source: Path, out_dir: Path, width: int) -> list:
    """Decode the capture to a PNG sequence at the published width."""
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)
    subprocess.run([
        'ffmpeg', '-y', '-v', 'error', '-i', str(source),
        '-vf', f'scale={width}:-2:flags=lanczos', '-fps_mode', 'passthrough',
        str(out_dir / '%05d.png')], check=True)
    return sorted(out_dir.glob('*.png'))


def encode_from_frames(files: list, out: Path, compose=None, crf: int = 21):
    """Encode a PNG sequence, optionally compositing each frame first."""
    TMP.mkdir(parents=True, exist_ok=True)
    staged = TMP / 'staged'
    if staged.exists():
        shutil.rmtree(staged)
    staged.mkdir(parents=True)
    for i, f in enumerate(files):
        im = Image.open(f).convert('RGB')
        if compose:
            im = compose(im)
        im.save(staged / f'{i:05d}.png')
    subprocess.run([
        'ffmpeg', '-y', '-v', 'error', '-framerate', str(FPS), '-i', str(staged / '%05d.png'),
        '-an', '-map_metadata', '-1', '-map_chapters', '-1',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', str(crf), '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', '-threads', '4', str(out)], check=True)
    return out


def build_videos(source: Path):
    files = decode_frames(source, TMP / 'screen', SCREEN_OUT_W)
    sw, sh = Image.open(files[0]).size
    frame, mask, off = frame_parts(sw, sh)

    def compose(im):
        canvas = frame.copy()
        canvas.paste(im, (off, off), mask)
        return canvas

    encode_from_frames(files, DEMO / 'monolith-hands-on-demo.mp4')
    encode_from_frames(files, DEMO / 'monolith-hands-on-demo-framed.mp4', compose=compose)
    return len(files)


def build_gifs(source: Path):
    for name, width, fps, colors, out_w, out_h in [
        ('monolith-hands-on-demo-framed.gif', 240, 10, 64, 250, 530),
        ('monolith-hands-on-demo.gif', 200, 10, 64, 190, 414),
    ]:
        frames = TMP / f'gifsrc-{name}'
        if frames.exists():
            shutil.rmtree(frames)
        frames.mkdir(parents=True)
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-vf',
                        f'fps={fps},scale={width}:-2:flags=lanczos', '-q:v', '4',
                        str(frames / '%05d.png')], check=True)
        files = sorted(frames.glob('*.png'))
        sw, sh = Image.open(files[0]).size
        if 'framed' in name:
            frame, mask, off = frame_parts(sw, sh)
        else:
            frame, mask, off = None, None, 0
        staged = TMP / f'gifstaged-{name}'
        if staged.exists():
            shutil.rmtree(staged)
        staged.mkdir(parents=True)
        for i, f in enumerate(files):
            im = Image.open(f).convert('RGB')
            if frame is not None:
                canvas = frame.copy()
                canvas.paste(im, (off, off), mask)
                im = canvas
            im.resize((out_w, out_h), Image.LANCZOS).save(staged / f'{i:05d}.png')
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-framerate', str(fps),
                        '-i', str(staged / '%05d.png'), '-vf',
                        f'split[a][b];[a]palettegen=max_colors={colors}:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=2',
                        '-loop', '0', str(DEMO / name)], check=True)
        print('gif', name, (DEMO / name).stat().st_size // 1024, 'KB')


if __name__ == '__main__':
    build_stills()
    print('video frames', build_videos(SOURCE))
    build_gifs(SOURCE)
