import React from "react";
import BaseLayout from "@/layout/baseLayout";
import ProtectedRoutes from "@/lib/ProtectedRoutes";
export default function layout({ children }) {
    return (
        <ProtectedRoutes>
            <BaseLayout>{children}</BaseLayout>
        </ProtectedRoutes>
    );
}
