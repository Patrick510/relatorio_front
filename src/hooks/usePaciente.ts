"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PacienteCompleto } from "@/types";

export function usePaciente() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const api = axios.create({
    baseURL: "http://localhost:8080/praxis",
    headers: { "Content-Type": "application/json" },
  });

  async function register(
    ehResponsavel: boolean,
    paciente: { nome: string; dataNascimento: number },
    responsavel: {
      nome: string;
      parentesco: string;
      celular: string;
      email: string;
    }
  ) {
    setLoading(true);
    setError("");
    try {
      await api.post("/usuarios", { ehResponsavel, paciente, responsavel });
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

  async function listarPacientes() {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/paciente");
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          "Erro ao listar usuários: " +
            (err.response?.data?.message || err.message)
        );
      } else {
        setError("Erro ao listar usuários");
      }
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function atualizarPaciente(
    id: number,
    data: Partial<PacienteCompleto>
  ) {
    setLoading(true);
    setError("");
    try {
      await api.put(`/paciente/${id}`, data);
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          "Erro ao atualizar paciente: " +
            (err.response?.data?.message || err.message)
        );
      } else {
        setError("Erro ao atualizar paciente");
      }
    } finally {
      setLoading(false);
    }
  }

  return { register, listarPacientes, atualizarPaciente, loading, error };
}
