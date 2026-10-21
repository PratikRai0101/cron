# Monolith — hands-on demo

**[Watch the demo](./monolith-hands-on-demo-framed.mp4)** · 34 seconds · 780 × 1626 · 30 fps · 1.0 MB

A continuous, normal-speed recording of the native iOS app:

1. Inspect a layer and its recorded activity.
2. Scroll to today's work and create a task.
3. Enter a time estimate and save it.
4. Start task-linked focus, then pause and resume.

Blue touch indicators show the actual taps and swipes. The recording uses local sample data on the iOS 26.5 Simulator. It demonstrates the working app, not mockups or a marketing slideshow.

## Preview and sharing

[![Animated hands-on preview](./monolith-hands-on-demo-framed.gif)](./monolith-hands-on-demo-framed.mp4)

Use the MP4 for a portfolio, recruiter email or direct message. The GIF is a smaller animated preview for GitHub READMEs; click it to open the full-quality video.

For a website, upload the MP4 and use:

```html
<video controls muted playsinline preload="metadata"
  aria-label="Monolith hands-on app demo"
  style="display:block;width:100%;max-width:360px;height:auto">
  <source src="monolith-hands-on-demo-framed.mp4" type="video/mp4">
  <a href="monolith-hands-on-demo-framed.mp4">Watch the Monolith demo</a>
</video>
```

## The iPhone frame

Every published capture comes from one device: the **iPhone 17 Pro** on the iOS 26.5 Simulator — 402 × 874 points at 3× (1206 × 2622 pixels). Nothing in the repository is captured from an Android or Pixel device.

| File | Size | What it is |
|---|---|---|
| `monolith-hands-on-demo-framed.mp4` | 780 × 1626 | The demo inside a drawn iPhone 17 Pro frame |
| `monolith-hands-on-demo-framed.gif` | 250 × 530 | Animated preview of the same |
| `monolith-hands-on-demo.mp4` | 720 × 1566 | The same recording with no frame, for full-screen playback |
| `monolith-hands-on-demo.gif` | 190 × 414 | Frameless GIF |
| `monolith-full-workflow.mp4` | 1206 × 2622 | Six-minute walkthrough of onboarding through every feature |

The frame is a static titanium band and black glass drawn around the capture. Inside it:

- The app pixels are **byte-identical** to the source. Verified on the stills: maximum difference 0 across the entire screen area, with only the four 55 pt screen corners rounded, exactly as a real display curves into the body.
- The recording is never cut, stitched, retimed or sped up. Both files carry the **identical 1,016 frames in the identical order**, at the same 33.87-second duration.
- Comparing the framed video against the frameless one, the app region matches to a maximum difference of 0.65/255 — H.264 re-encoding noise only, with no frame shifted or dropped.

## Full walkthrough

`monolith-full-workflow.mp4` (6 minutes, native capture, embedded chapters) covers the whole product: onboarding, task and session flows, history and record editing, identities, profile, settings and dark mode. Use it when a reader wants the complete feature set rather than a thirty-second impression.

## Capture notes

- Fresh native Release-build capture with `agent-device`, including touch indicators.
- No internal cuts, scene stitching, inserted holds or playback-speed changes.
- The full MP4s pass a decode check; the preview GIFs are downsampled and palette-quantised for README playback, and the MP4s retain the full 30 fps.
- Machine-readable evidence: [monolith-hands-on-demo.capture.json](./monolith-hands-on-demo.capture.json).

This recording replaces the earlier montage-style showcase, which was removed.
