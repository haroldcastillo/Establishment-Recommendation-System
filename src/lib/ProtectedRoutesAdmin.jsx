import React from "react";

export default function ProtectedRoutesAdmin({ children }) {
    const router = useRouter();
    const user = useSelector((state) => state?.user.user.data);
    React.useEffect(() => {
        if (user) {
            if (user.role !== "admin") {
                router.push("/");
            }
        }
    }, [user]);
    if (!user || user.role !== "admin") return null;
    return <div>{children}</div>;
}
