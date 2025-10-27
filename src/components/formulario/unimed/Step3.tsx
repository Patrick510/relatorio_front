"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/relatorio";

interface Passo3Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function Passo3({
  formData,
  setFormData,
}: Readonly<Passo3Props>) {
  // Campos de evolução
  const camposEvolucao = [
    {
      id: "engajamento",
      label: "Engajamento",
      placeholder: "Descreva o engajamento do paciente...",
    },
    {
      id: "afetividade",
      label: "Afetividade",
      placeholder: "Descreva a afetividade do paciente...",
    },
    {
      id: "organizacao",
      label: "Organização",
      placeholder: "Descreva a organização do paciente...",
    },
    {
      id: "crisesEResistencias",
      label: "Crises e Resistências",
      placeholder: "Descreva as crises e resistências...",
    },
    {
      id: "comunicacaoFuncional",
      label: "Comunicação Funcional",
      placeholder: "Descreva a comunicação funcional...",
    },
    {
      id: "coordenacaoMotora",
      label: "Coordenação Motora",
      placeholder: "Descreva a coordenação motora...",
    },
  ];

  // Atualiza campo específico dentro de evolucao
  const handleChange = (campo: string, valor: string) => {
    setFormData({
      ...formData,
      evolucao: {
        ...formData.evolucao,
        [campo]: valor,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Evolução</CardTitle>
        <CardDescription className="text-sm">
          Descreva a evolução do paciente em cada aspecto
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {camposEvolucao.map((campo) => (
          <div key={campo.id} className="space-y-2">
            <Label htmlFor={campo.id}>{campo.label}</Label>
            <Textarea
              id={campo.id}
              placeholder={campo.placeholder}
              value={(formData.evolucao as never)[campo.id] || ""}
              onChange={(e) => handleChange(campo.id, e.target.value)}
              rows={3}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
