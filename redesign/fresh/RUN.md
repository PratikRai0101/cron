# Run the Strata app locally

Use Terminal on this Mac. The project uses Expo SDK 57, React Native 0.86.3 and React 19.2.3. Node 22.13 or newer is required. Xcode and Node/npm are already installed.

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

Open Device Hub, select Monolith Strata QA and start it, then press `i` in the Expo terminal. This command uses the custom development client. Expo Go is also supported with a matching SDK57 runtime; see below. Press `r` to reload; Ctrl+C stops Metro. Restarting Metro does not erase saved work. Rebuild with the first command after changing native dependencies.

To see the motion: press and hold an action; switch tabs; select an identity to change the total/goal bar; complete a task; run Focus for at least one minute and finish to deposit a layer. iOS Settings → Accessibility → Motion → Reduce Motion switches to movement-free feedback.

All work is on feat/strata-redesign, committed locally and not pushed.

## Expo Go

```sh
cd /Users/pratikrai/Development/cron/apps/mobile
npm run go -- --port 8087
```

This explicitly selects Expo Go, even though expo-dev-client is installed. Keep Terminal open. For a phone, use the same Wi-Fi and scan the QR code (iPhone Camera or Expo Go on Android). Expo Go57.0.9 is installed on this Mac’s Monolith Strata QA simulator. Expo CLI’s `i` shortcut cannot detect the Simulator app in Xcode27’s Device Hub layout. Start that device in Device Hub and use a second Terminal:

```sh
xcrun simctl openurl 572DF708-46B2-41D2-BA97-6CD0FDDC4608 exp://127.0.0.1:8087
```

On Macs with the conventional Simulator app, `i` can install/open the compatible Expo Go version.

The project uses SDK57. A phone’s Expo Go runtime must support SDK57. Expo’s SDK57 release notes currently direct physical iPhone users to `eas go`; the App Store version may report a mismatch. Obtain the matching iOS runtime using the official instructions at https://expo.dev/go (EAS sign-in/device setup may be required). Matching Android and iOS Simulator versions are also available there. Source: https://expo.dev/changelog/sdk-57 .

Expo Go has its own app storage, so development-client records do not automatically appear there. Native glass keeps its opaque fallback on unsupported devices.

Verified 2026-10-05 after upgrade: Expo Go57.0.9 reports SDK57.0.0 and loads Strata on the QA simulator. Grid, Profile, Settings and Focus work; explicit dark appearance updates the screen. Production iOS/Android Hermes and web exports pass. Fresh native Debug simulator build also passes and is installed on QA. A physical phone connection remains unverified.

After an SDK/native dependency change, rebuild the custom development client rather than opening an older installed build. Native folders are generated and ignored by Git. If a different checkout still has SDK54-generated folders, back them up, then run `npx expo prebuild --platform ios` before `npx expo run:ios`. SDK57 prebuild regenerates native folders by default; `--no-clean` preserves an existing native project. The checked-in config enables scene support for Xcode27/iOS27 and sets the iOS minimum to16.4.

## Inspect and correct recorded work
Reload the current Expo Go session after pulling these JS changes; no native rebuild is needed. On Grid, idle/Recorded Focus, Profile or History, tap a slice or **Inspect layers**. Select a record, then **Edit record** to change duration or identity. Timed sessions accept minutes and seconds; manual logs accept whole minutes. The date and task stay attached. **Remove record** removes one entry; the inline **Undo** restores it. Edits and newly recorded work also offer Undo. Undo lasts until another record change, dismissal or app restart.

The compressed base opens **Older work**, listing each record it represents. The compact editor scrolls when needed with larger text or more identities. Native SE keyboard verification is in `record-shots/r2/compact-keyboard.png`; Android keyboard behavior needs physical-device verification.
