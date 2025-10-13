"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useProtectedRoute(roleRequired?: string) {
  const { isAuthenticated, getRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const tokenExists = isAuthenticated();
    const role = getRole(); // leitura localStorage dentro do useEffect

    if (!tokenExists) {
      router.push("/login");
      return;
    }

    if (roleRequired && role !== roleRequired) {
      router.push("/acesso-negado");
    }
  }, [roleRequired, router, getRole, isAuthenticated]);
}
