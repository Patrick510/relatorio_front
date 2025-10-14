"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useUsuario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const api = axios.create({
    baseURL: "http://localhost:8080/praxis",
    headers: { "Content-Type": "application/json" },
  });

  async function register(
    nome: string,
    cargoId: number,
    email: string,
    senha: string
  ) {
    setLoading(true);
    setError("");
    try {
      await api.post("/usuarios", { nome, cargoId, email, senha });
      router.push("/login");
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          "Erro ao cadastrar: " + (err.response?.data?.message || err.message)
        );
      } else {
        setError("Erro ao cadastrar");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }
  return { register, loading, error };
}
