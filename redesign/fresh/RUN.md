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

Open Device Hub, select Monolith Strata QA and start it, then press `i` in the Expo terminal. This command uses the custom development client. Expo Go is also supported with a matching SDK54 runtime; see below. Press `r` to reload; Ctrl+C stops Metro. Restarting Metro does not erase saved work. Rebuild with the first command after changing native dependencies.

To see the motion: press and hold an action; switch tabs; select an identity to change the total/goal bar; complete a task; run Focus for at least one minute and finish to deposit a layer. iOS Settings → Accessibility → Motion → Reduce Motion switches to movement-free feedback.

All work is on feat/strata-redesign, committed locally and not pushed.

## Expo Go

```sh
cd /Users/pratikrai/Development/cron/apps/mobile
npm run go -- --port 8087
```

This explicitly selects Expo Go, even though expo-dev-client is installed. Keep Terminal open. For a phone, use the same Wi-Fi and scan the QR code (iPhone Camera or Expo Go on Android). Expo Go54.0.7 is installed on this Mac’s Monolith Strata QA simulator. SDK54 CLI’s `i` shortcut cannot detect the Simulator app in Xcode27’s Device Hub layout. Start that device in Device Hub and use a second Terminal:

```sh
xcrun simctl openurl 572DF708-46B2-41D2-BA97-6CD0FDDC4608 exp://127.0.0.1:8087
```

On Macs with the conventional Simulator app, `i` can install/open the compatible Expo Go version.

The project currently uses SDK54. A phone’s Expo Go version must support that SDK. Expo’s current documentation confirms the Apple App Store build supports SDK54, so this branch can use it on a physical iPhone. Compatible SDK54 versions for Android and iOS Simulator are available through https://expo.dev/go. If the phone reports a version mismatch, check its supported SDK before upgrading this branch. expo-glass-effect is included in Expo Go; the existing opaque navigation fallback handles unsupported iOS/Android glass. Expo Go has its own app storage, so development-client records do not automatically appear there.

Verified2026-10-05: Expo Go54.0.7 loaded SDK54.0.0, onboarding skip reached Strata’s core screen without a missing-native-module error. The launch script is validated by actual Metro output (“Using Expo Go”). Expo’s current SDK54 GlassEffect docs confirm Expo Go inclusion: https://docs.expo.dev/versions/v54.0.0/sdk/glass-effect/ . Physical iPhone/App Store SDK54 support: https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/ . Physical phone connection remains unverified.
