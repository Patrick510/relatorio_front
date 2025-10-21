"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Role } from "@/types";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Cria uma instância do Axios com baseURL padrão
  const api = axios.create({
    baseURL: "http://localhost:8080/praxis/auth",
    headers: { "Content-Type": "application/json" },
  });

  // Login
  async function login(email: string, senha: string) {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/login", { email, senha });
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      router.push("/dashboard");
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Credenciais inválidas");
      } else {
        setError("Erro de conexão com o servidor");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  }

  // Funções de autenticação
  function getToken() {
    return localStorage.getItem("token");
  }

  function getRole(): Role | null {
    const role = localStorage.getItem("role");
    if (!role) return null;

    switch (role) {
      case "SUPER_ADMIN":
        return Role.SUPER_ADMIN;
      case "ADMIN":
        return Role.ADMIN;
      case "USER":
        return Role.USER;
      case "RESPONSAVEL":
        return Role.RESPONSAVEL;
      case "ATENDENTE":
        return Role.ATENDENTE;
      case "PSICOLOGO":
        return Role.PSICOLOGO;
      default:
        return null;
    }
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
  };
}
