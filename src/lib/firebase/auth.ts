import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    type UserCredential
} from "firebase/auth";
import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const firebaseAuth = {
    /**
     * Sign in with Google
     */
    async loginWithGoogle(): Promise<UserCredential> {
        if (!auth) {
            throw new Error("Firebase Authentication is not initialized. Check your environment variables.");
        }
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result;
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    },

    /**
     * Sign out
     */
    async logout(): Promise<void> {
        if (!auth) return;
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out", error);
            throw error;
        }
    },
};
