---
description: How to set up a Firebase project and enable Google Authentication
---

# Firebase Setup Guide

Follow these steps to configure your Firebase project for this application.

## 1. Create a Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** or **"Create a project"**.
3.  Enter a project name (e.g., `arvion-rent-auth`) and click **Continue**.
4.  (Optional) Disable Google Analytics for now to speed up setup, then click **Create project**.
5.  Wait for the project to be ready and click **Continue**.

## 2. Register a Web App
1.  In the project overview page, click the **Web icon (`</>`)** to add a web app.
2.  Enter an app nickname (e.g., `Arvion Rent Web`).
3.  Uncheck "Also set up Firebase Hosting" (unless you want it).
4.  Click **Register app**.

## 3. Get Configuration Keys
1.  After registering, you will see a code block with `firebaseConfig`.
2.  Copy the values from this object and paste them into your `.env.local` file:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

3.  Click **Continue to console**.

## 4. Enable Authentication
1.  In the left sidebar, click **Build** > **Authentication**.
2.  Click **Get started**.
3.  Select the **Sign-in method** tab.
4.  Click **Google**.
5.  Toggle **Enable** to the ON position.
6.  Set the **Project support email** (select your email).
7.  Click **Save**.

## 5. Configure Authorized Domains (Important for Production)
1.  Still in the **Settings** tab of Authentication (or "Authorized domains" section).
2.  `localhost` is added by default.
3.  If you deploy your app (e.g., to Vercel), add your production domain here (e.g., `arvion-rent.vercel.app`).

## 6. Verification
1.  Restart your Next.js development server:
    ```bash
    npm run dev
    ```
2.  Open your app, go to Login/Signup, and test the Google button.
