"use server";

import { cookies } from "next/headers";

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    });
};

export const clearAuthCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
};

export const getAccessToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
};

export const getUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return null;

    try {
        const { jwtDecode } = await import("jwt-decode");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};
