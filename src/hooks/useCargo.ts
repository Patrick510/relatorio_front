"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useCargo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const api = axios.create({
    baseURL: "http://localhost:8080/praxis/cargos",
    headers: { "Content-Type": "application/json" },
  });

  // Criar um cargo
  async function cadastrarCargo(nome: string) {
    setLoading(true);
    setError("");
    try {
      await api.post("/", { nome });
      router.push("/");
      return true;
    } catch (err) {
      setError("Erro ao adicionar cargo");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Criar vários cargos
  async function cadastrarCargos(nomes: string[]) {
    setLoading(true);
    setError("");
    try {
      const cargos = nomes.map((nome) => ({ nome }));
      await api.post("/bulk", cargos);
      router.push("/");
      return true;
    } catch (err) {
      setError("Erro ao adicionar cargos");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Listar cargos
  async function listarCargos() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("");
      return res.data;
    } catch (err) {
      setError("Erro ao listar cargos");
      return [];
    } finally {
      setLoading(false);
    }
  }

  return { cadastrarCargo, cadastrarCargos, listarCargos, loading, error };
}
