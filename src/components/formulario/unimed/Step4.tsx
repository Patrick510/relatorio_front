"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { FormData } from "@/types/relatorio";

interface Passo4Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function Passo4({
  formData,
  setFormData,
}: Readonly<Passo4Props>) {
  const [motivoAtual, setMotivoAtual] = useState("");

  // Adiciona um novo motivo à lista
  const adicionarMotivo = () => {
    const texto = motivoAtual.trim();
    if (!texto) return;

    const novoMotivo = {
      id: Date.now().toString(), // seu FormData usa string para id
      motivo: texto,
    };

    setFormData({
      ...formData,
      motivosContinuidade: [...formData.motivosContinuidade, novoMotivo],
    });

    setMotivoAtual("");
  };

  // Remove motivo pelo id
  const removerMotivo = (id: string) => {
    setFormData({
      ...formData,
      motivosContinuidade: formData.motivosContinuidade.filter(
        (m) => m.id !== id
      ),
    });
  };

  return (
    <>
      {/* --- Conclusão --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Conclusão</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Escreva a conclusão do relatório..."
            value={formData.conclusao}
            onChange={(e) =>
              setFormData({ ...formData, conclusao: e.target.value })
            }
            rows={6}
            className="text-sm md:text-base"
          />
        </CardContent>
      </Card>

      {/* --- Motivos da Continuidade --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Motivos da Continuidade da Terapia ABA
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Textarea
              placeholder="Descreva um motivo para continuidade..."
              value={motivoAtual}
              onChange={(e) => setMotivoAtual(e.target.value)}
              rows={3}
              className="flex-1 text-sm md:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                  adicionarMotivo();
                }
              }}
            />

            <Button
              type="button"
              onClick={adicionarMotivo}
              className="bg-emerald-600 hover:bg-emerald-700 sm:w-[40px] w-full"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {formData.motivosContinuidade.length > 0 && (
            <div className="space-y-2">
              {formData.motivosContinuidade.map((motivo) => (
                <div
                  key={motivo.id}
                  className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3"
                >
                  <p className="flex-1 text-sm">{motivo.motivo}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => removerMotivo(motivo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
