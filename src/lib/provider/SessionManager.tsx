"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser, setToken } from "@/lib/redux/features/auth/authSlice";
import { getUser, getAccessToken } from "@/lib/actions/auth";

export default function SessionManager({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initSession = async () => {
            const user = await getUser();
            const token = await getAccessToken();

            if (user && token) {
                dispatch(setUser(user as any));
                dispatch(setToken(token));
            }
        };

        initSession();
    }, [dispatch]);

    return <>{children}</>;
}
