# Phone OTP Verification App (Quiz 4)

A React Native / Expo mobile application that verifies users via SMS OTP using **Firebase Phone Authentication**.

## Features

- Phone number entry with country‑code picker (default: Pakistan).
- "Send OTP" initiates a Firebase phone‑auth verification request.
- OTP entry screen for the user to paste the received code.
- Real‑time countdown and "Resend" option.
- Success / error screens with clear messages.
- Ability to change the phone number and restart the flow.
- Loading indicators and validation for all inputs.

## How It Works

1. **Phone Entry** – The user selects a country (dial code + national number) and taps **Send OTP**.
2. **Firebase Verification** – Expo’s **Firebase JS SDK** calls `auth().signInWithPhoneNumber(phone, recaptchaVerifier)`. This sends a verification code via SMS (if the project has the Blaze pay‑as‑you‑go plan). For this assignment the **free Spark plan** blocks real SMS, so we rely on **Firebase predefined test phone numbers** for a genuine verification flow without incurring SMS charges.
3. **OTP Entry** – The user types the 6‑digit code from the Firebase console (or from an actual SMS if a Blaze plan is enabled later) and taps **Verify**.
4. **Result** – Shows a success screen on correct code or an error screen with hints.

## Firebase Console Setup (Required for Real SMS)

1. **Enable Phone Sign‑in** – Go to **Authentication → Sign‑in method** in the Firebase Console and enable **Phone**.
2. **SMS Region Policy** – Optional but recommended. Set your allowed countries (e.g., `+92` for Pakistan) under **Authentication → Settings → SMS region policy**.
3. **Authorized Domains** – Add the host you will use the app on (e.g., `exp.host/@your-username/Quiz4-PhoneOTP`). `localhost` is **not** allowed for phone auth.
4. **Test Numbers** – For development without Blaze, add a fictional number (e.g., `+1 650‑555‑3434`) and its matching code under **Sign‑in method → Phone numbers for testing**.

> **Note:** The app currently works with Firebase test numbers, so you can verify the flow without paying. If you enable Blaze, real SMS will be sent and will incur charges. No billing was enabled during this implementation.

## Project Structure

```
Quiz4-PhoneOTP/
├── .env                 # Firebase client keys (git‑ignored)
├── .env.example         # Template for .env (includes placeholders)
├── .gitignore           # Ignores node_modules, build artifacts, env files
├── app.json             # Expo configuration
├── package.json         # Dependencies (see installation instructions)
├── tsconfig.json        # TypeScript config
├── README.md            # This file
├── assets/              # App icons / splash screens
├── src/
│   ├── app/            # Expo Router routes (screens)
│   │   ├── _layout.tsx # Root navigator (currently just a slot)
│   │   ├── (auth)/index.tsx      # Phone entry screen
│   │   ├── (auth)/otp.tsx        # OTP input screen
│   │   ├── (auth)/success.tsx    # Success after verification
│   │   └── (auth)/error.tsx      # Error / retry screen
│   ├── lib/            # Shared utilities, Firebase, error handling, OTP session store
│   │   ├── firebase.ts
│   │   ├── errors.ts
│   │   ├── otpSession.ts
│   │   └── countries.ts
│   └── theme.ts        # Centralised colours and spacing
```

## Installation & Run

### Prerequisites

- Node.js (v22+ recommended)
- Expo CLI (`npm install -g expo-cli`) or use the `expo` package in this repo (recommended)

### Install Dependencies

The project uses **Expo Install** to guarantee SDK‑compatible versions.

```bash
# From the project root
cd Quiz4-PhoneOTP
npx expo install
```

> **Why `npx expo install`?** It resolves versions that match the Expo SDK (currently v58) and handles native modules correctly.

### Start the App

#### Expo Go (Android / iOS)

1. Install the **Expo Go** app on your phone.
2. Run `npx expo start` in the terminal.
3. Scan the QR code with Expo Go – the app will load automatically.

#### Development Build (Android only – iOS requires a Mac)

If you need native phone‑auth (reCAPTCHA) on Android, use a development build:

```bash
npx expo run:android   # builds an APK with Google Play Services
```

Open the generated APK on your phone and follow the same QR code steps.

### Firebase Configuration

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open **Firebase Console → Project Settings → Your apps → Web app** and copy the API key, project ID, etc. into `.env`.

3. Restart the dev server (`npx expo start --clear`) after editing `.env`.

### Development with Test Numbers

If you cannot or do not want to enable Blaze:

- In the Firebase Console, add a test phone number and verification code (see **Phone numbers for testing**).
- In the app, the OTP screen will accept the code you configured. This is **not** a real SMS but a valid verification for development.

## Screenshots & Evidence (Required for Submission)

The repository now contains the **source code** and a `Screenshots/` folder (currently empty – you must fill this).

### What You Must Do on Your Android Phone

1. **Run the App** – Follow the "Start the App" instructions above and capture:
   - **Screenshot 1**: Phone entry screen with a sample number (`+92 300 1234567`) selected.
   - **Screenshot 2**: OTP screen after clicking **Send OTP** (show the 6‑digit input boxes and the countdown/resend button).
   - **Screenshot 3**: Success screen after entering the **correct test‑number code** (e.g., `654321`).
   - **Screenshot 4**: Error screen after typing an incorrect code.

2. **Screen Recording** – Record a video of the complete flow:
   - Enter phone number → tap **Send OTP**.
   - Receive the verification code (either from Firebase test numbers or an actual SMS if you have Blaze).
   - Enter the code → verification succeeds.

3. Export the recording as an MP4, rename it (e.g., `otp-demo.mp4`), and place it inside `Evidence/` (create the folder) or rename accordingly.

4. Add the screenshots and video to the repository **after** you have them. The GitHub submission deadline is strict – we can push updated commits later.

## Building & Submission

- **GitHub Repository**: https://github.com/muhammadalisajjad-dev/Quiz4-PhoneOTP
- **Commit History** – The current commit (`9a465cd`) contains the core OTP flow, error handling, and a minimal UI.

You can continue to polish the UI, add animations, or improve error messages. Every new change should be committed and pushed to the same remote.

## Acknowledgements

- Firebase Phone Authentication documentation and error guidance.
- Expo Router for navigation.
- The existing Firebase project `safeskip-a2` was reused for its client configuration (API keys only).

---

*Prepared for Quiz 4 – OTP Phone Verification.*

> **Important**: This implementation works with Firebase’s free test numbers. If you enable Blaze billing, real SMS will be sent and will incur charges. No billing was enabled during this work.*