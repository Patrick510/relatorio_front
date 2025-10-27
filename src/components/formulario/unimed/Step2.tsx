"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { FormData } from "@/types/relatorio";

interface Step2Props {
  comportamentoAtual: string;
  setComportamentoAtual: (value: string) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  adicionarComportamento: () => void;
  removerComportamento: (id: string) => void;
  comportamentos: Array<{ id: string; descricao: string }>;
}

export default function Passo2({
  comportamentoAtual,
  setComportamentoAtual,
  adicionarComportamento,
  removerComportamento,
  comportamentos,
}: Readonly<Step2Props>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Comportamentos Observados
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Textarea
            placeholder="Descreva o comportamento observado..."
            value={comportamentoAtual}
            onChange={(e) => setComportamentoAtual(e.target.value)}
            rows={3}
            className="flex-1 text-sm md:text-base"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault();
                adicionarComportamento();
              }
            }}
          />
          <Button
            type="button"
            onClick={adicionarComportamento}
            className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-[40px]"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {comportamentos.length > 0 && (
          <div className="space-y-2">
            {comportamentos.map((comportamento) => (
              <div
                key={comportamento.id}
                className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3"
              >
                <p className="flex-1 text-sm">{comportamento.descricao}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => removerComportamento(comportamento.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
