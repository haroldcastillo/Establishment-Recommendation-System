"use client";
import React from "react";
import ProtectedRoutes from "@/lib/ProtectedRoutes";
import BaseLayout from "@/layout/baseLayout";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useSelector((state: any) => state?.user.user.data);
    React.useEffect(() => {
        if (user) {
            if (user.role !== "admin") {
                router.push("/");
            }
        }
    }, [user]);
    if (!user || user.role !== "admin") return null;
    return (
        <ProtectedRoutes>
            <BaseLayout>{children}</BaseLayout>
        </ProtectedRoutes>
    );
}
