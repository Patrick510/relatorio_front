"use client";

import { useState } from "react";
import { Plus, X, Send, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCargo } from "@/hooks/useCargo";

type Cargo = {
  nome: string;
};

export default function CargosPage() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const { cadastrarCargos, loading, error } = useCargo();
  const [novoCargo, setNovoCargo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adicionarCargo = () => {
    if (novoCargo.trim()) {
      setCargos([...cargos, { nome: novoCargo.trim() }]);
      setNovoCargo("");
    }
  };

  const removerCargo = (index: number) => {
    setCargos(cargos.filter((_, i) => i !== index));
  };

  const enviarCargos = async () => {
    if (cargos.length === 0) return;

    setIsSubmitting(true);
    try {
      await cadastrarCargos(cargos.map((cargo) => cargo.nome));
      setCargos([]);
      alert("Cargos enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar cargos:", error);
      alert("Erro ao enviar cargos");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Gerenciar Cargos
        </h1>
        <p className="text-muted-foreground">
          Adicione e gerencie os cargos do sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Cargos</CardTitle>
          <CardDescription>
            Digite o nome do cargo e clique em adicionar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input e botão de adicionar */}
          <div className="flex gap-2">
            <Input
              placeholder="Nome do cargo"
              value={novoCargo}
              onChange={(e) => setNovoCargo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  adicionarCargo();
                }
              }}
            />
            <Button onClick={adicionarCargo} disabled={!novoCargo.trim()}>
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>

          {/* Lista de cargos adicionados */}
          {cargos.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">
                Cargos adicionados ({cargos.length})
              </h3>
              <div className="space-y-2">
                {cargos.map((cargo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                  >
                    <span className="text-sm text-foreground">
                      {cargo.nome}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerCargo(index)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Botão de enviar */}
              <Button
                onClick={enviarCargos}
                disabled={isSubmitting}
                className="w-full"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar Cargos"}
              </Button>
            </div>
          )}

          {cargos.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Nenhum cargo adicionado ainda
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
