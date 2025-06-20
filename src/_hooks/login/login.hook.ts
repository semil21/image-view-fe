"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loginType } from "@/_types/login.types";
import { LoginService } from "@/_service/login/login.service";

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: LoginService,
        onSuccess: (data) => {
            if (typeof window !== "undefined" && data?.token) {
                localStorage.setItem("token", data.token);
                toast.success("Welcome back.", {
                    autoClose: 2000,

                    onClose: () => {
                        router.push("/dashboard");
                    },
                });
            } else {
                toast.error("Login failed. Please try again.");
            }
        },
        onError: () => {
            toast.error("Login failed. Please try again.");
        },
    });
};
