"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/_components/loader/loader";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Invalid token values
    if (!token || token === "undefined" || token === "null") {
      router.push("/");
    } else {
      setIsCheckingAuth(false); // Only continue when valid token
    }
  }, [router]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
