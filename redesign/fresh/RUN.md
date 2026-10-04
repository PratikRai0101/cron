# Run the Strata app locally

Use Terminal on this Mac. Xcode and Node/npm are already installed.

```sh
cd /Users/pratikrai/Development/cron
git switch feat/strata-redesign
cd apps/mobile
npx expo run:ios --device "Monolith Strata QA" --port 8083
```

This builds/installs the Debug development client, opens the QA simulator and starts Metro. It preserves app data. Keep this Terminal window open. If Expo reports that port8083 is already running this project, use that server; if it offers another port, accept it. For a fresh checkout, run `npm install` at the repository root before entering apps/mobile.

Once the development client is installed, future JS-only sessions are faster:

```sh
cd /Users/pratikrai/Development/cron/apps/mobile
npx expo start --dev-client --port 8083
```

Open Device Hub, select Monolith Strata QA and start it, then press `i` in the Expo terminal. This app uses a custom development client for native glass; Expo Go is not the intended runtime. Press `r` to reload; Ctrl+C stops Metro. Restarting Metro does not erase saved work. Rebuild with the first command after changing native dependencies.

To see the motion: press and hold an action; switch tabs; select an identity to change the total/goal bar; complete a task; run Focus for at least one minute and finish to deposit a layer. iOS Settings → Accessibility → Motion → Reduce Motion switches to movement-free feedback.

All work is on feat/strata-redesign, committed locally and not pushed.
