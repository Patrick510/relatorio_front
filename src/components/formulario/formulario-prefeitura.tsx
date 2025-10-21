"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormularioPrefeituraProps {
  onVoltar: () => void;
}

export default function FormularioPrefeitura() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Formulário Prefeitura enviado");
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Relatório Prefeitura</h1>
            <p className="text-muted-foreground">
              Formulário em desenvolvimento
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Em Desenvolvimento</CardTitle>
            <CardDescription>
              Este formulário será implementado em breve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              O formulário da Prefeitura está sendo desenvolvido e estará
              disponível em breve.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
