"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function SignInPage() {
  const { register, loading, error } = useAuth();
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(nome, cargo, email, senha);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 border rounded-lg"
      >
        <h1 className="text-xl font-bold text-center">Cadastro</h1>
        <input
          className="border p-2 rounded"
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Cargo"
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}
