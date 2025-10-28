"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RelatorioFormData } from "@/types";

export function useForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const api = axios.create({
    baseURL: "http://localhost:8080/praxis/pdf",
    headers: { "Content-Type": "application/json" },
  });

  async function gerarFormulario(formularioData: RelatorioFormData) {
    setLoading(true);
    setError("");
    try {
      await api.post(
        `/${formularioData.idPaciente}`,
        formularioData.formularioDTO
      );
      router.push("/");
      return true;
    } catch (err) {
      console.error("Erro ao gerar formulário:", err);
      setError("Erro ao gerar relatório");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { gerarFormulario, loading, error };
}
