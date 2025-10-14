"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus } from "lucide-react";
import { useUsuario } from "@/hooks/useUsuario";
import { useCargo } from "@/hooks/useCargo";
import CardForm from "@/components/cardForm";
import { Cargo } from "@/types";
import { signupSchema } from "@/types/signup";

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { register, loading, error } = useUsuario();
  const { listarCargos } = useCargo();
  const [cargos, setCargos] = useState<Cargo[]>([]);

  useEffect(() => {
    async function fetchCargos() {
      const cargosData = await listarCargos();
      setCargos(cargosData);
    }

    fetchCargos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nome: "",
      cargoId: cargos.length > 0 ? cargos[0].id.toString() : "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      register(data.nome, parseInt(data.cargoId), data.email, data.senha);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Signup error:", err.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Formulário */}
      <div className="flex flex-1 items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
              Criar conta
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Preencha os dados para começar
            </p>
          </div>

          <CardForm
            form={form}
            cargos={cargos}
            onSubmit={onSubmit}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {/* Lado direito - Imagem/Ilustração */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary/10 lg:via-primary/5 lg:to-background">
        <div className="max-w-md space-y-6 p-8 text-center">
          <div className="mx-auto h-64 w-64 rounded-full bg-primary/20 flex items-center justify-center">
            <UserPlus className="h-32 w-32 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Junte-se a nós</h2>
          <p className="text-muted-foreground">
            Crie sua conta e tenha acesso a todas as funcionalidades do sistema.
            Gerencie usuários, documentos e muito mais em uma plataforma
            completa.
          </p>
        </div>
      </div>
    </div>
  );
}
