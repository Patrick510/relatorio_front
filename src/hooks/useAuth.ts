"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function login(email: string, senha: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/praxis/auth", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, senha }),
      });

      if (!res.ok) {
        setError("Credenciais inválidas");
        return false;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      router.push("/dashboard");
      return true;
    } catch {
      setError("Erro de conexão com o servidor");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(
    nome: string,
    cargo: string,
    email: string,
    senha: string
  ) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/praxis/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ nome, cargo, email, senha }),
      });
      if (!res.ok) {
        setError("Erro ao cadastrar");
        return false;
      }
      router.push("/login");
      return true;
    } catch {
      setError("Erro de conexão com o servidor");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function getRole() {
    return localStorage.getItem("role");
  }

  function isAuthenticated() {
    return !!getToken();
  }

  return {
    login,
    logout,
    getToken,
    getRole,
    isAuthenticated,
    loading,
    error,
    register,
  };
}
