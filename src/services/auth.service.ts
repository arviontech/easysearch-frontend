"use server";

import { cookies } from "next/headers";


export const  setTokenIntheCookie = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("access-token", token);
}