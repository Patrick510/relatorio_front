"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Send } from "lucide-react";
import type { FormData } from "@/types/relatorio";

export default function FormularioUnimed() {
  const [comportamentoAtual, setComportamentoAtual] = useState("");
  const [motivoAtual, setMotivoAtual] = useState("");

  const [formData, setFormData] = useState<FormData>({
    paciente: "",
    coordenadora: "",
    psicologo: "",
    introducao: "",
    comportamentos: [],
    evolucao: {
      engajamento: "",
      afetividade: "",
      organizacao: "",
      crisesEResistencias: "",
      comunicacaoFuncional: "",
      coordenacaoMotora: "",
    },
    conclusao: "",
    motivosContinuidade: [],
  });

  const adicionarComportamento = () => {
    if (comportamentoAtual.trim()) {
      setFormData({
        ...formData,
        comportamentos: [
          ...formData.comportamentos,
          { id: Date.now().toString(), descricao: comportamentoAtual },
        ],
      });
      setComportamentoAtual("");
    }
  };

  const removerComportamento = (id: string) => {
    setFormData({
      ...formData,
      comportamentos: formData.comportamentos.filter((c) => c.id !== id),
    });
  };

  const adicionarMotivo = () => {
    if (motivoAtual.trim()) {
      setFormData({
        ...formData,
        motivosContinuidade: [
          ...formData.motivosContinuidade,
          { id: Date.now().toString(), motivo: motivoAtual },
        ],
      });
      setMotivoAtual("");
    }
  };

  const removerMotivo = (id: string) => {
    setFormData({
      ...formData,
      motivosContinuidade: formData.motivosContinuidade.filter(
        (m) => m.id !== id
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosParaEnvio = {
      tipo: "unimed",
      ...formData,
    };

    console.log("[v0] Dados do relatório Unimed:", dadosParaEnvio);

    // Chamada para a API
    await fetch("/api/relatorios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosParaEnvio),
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Relatório Unimed</h1>
            <p className="text-sm text-muted-foreground md:text-base">
              Preencha os campos abaixo para gerar o relatório
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente</Label>
                <Select
                  value={formData.paciente}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paciente: value })
                  }
                >
                  <SelectTrigger id="paciente">
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paciente1">João Silva</SelectItem>
                    <SelectItem value="paciente2">Maria Santos</SelectItem>
                    <SelectItem value="paciente3">Pedro Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordenadora">Coordenadora</Label>
                <Select
                  value={formData.coordenadora}
                  onValueChange={(value) =>
                    setFormData({ ...formData, coordenadora: value })
                  }
                >
                  <SelectTrigger id="coordenadora">
                    <SelectValue placeholder="Selecione a coordenadora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coord1">Ana Paula Costa</SelectItem>
                    <SelectItem value="coord2">Juliana Ferreira</SelectItem>
                    <SelectItem value="coord3">Carla Mendes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="psicologo">Psicólogo(a)</Label>
                <Select
                  value={formData.psicologo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, psicologo: value })
                  }
                >
                  <SelectTrigger id="psicologo">
                    <SelectValue placeholder="Selecione o(a) psicólogo(a)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="psi1">Dr. Carlos Almeida</SelectItem>
                    <SelectItem value="psi2">Dra. Beatriz Lima</SelectItem>
                    <SelectItem value="psi3">Dr. Rafael Souza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Introdução */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Introdução</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Escreva a introdução do relatório..."
                value={formData.introducao}
                onChange={(e) =>
                  setFormData({ ...formData, introducao: e.target.value })
                }
                rows={6}
                className="text-sm md:text-base"
              />
            </CardContent>
          </Card>

          {/* Comportamentos */}
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
                  className="bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.comportamentos.length > 0 && (
                <div className="space-y-2">
                  {formData.comportamentos.map((comportamento) => (
                    <div
                      key={comportamento.id}
                      className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3"
                    >
                      <p className="flex-1 text-sm">
                        {comportamento.descricao}
                      </p>
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

          {/* Evolução */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Evolução</CardTitle>
              <CardDescription className="text-sm">
                Descreva a evolução do paciente em cada aspecto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="engajamento">Engajamento</Label>
                <Textarea
                  id="engajamento"
                  placeholder="Descreva o engajamento do paciente..."
                  value={formData.evolucao.engajamento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evolucao: {
                        ...formData.evolucao,
                        engajamento: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="afetividade">Afetividade</Label>
                <Textarea
                  id="afetividade"
                  placeholder="Descreva a afetividade do paciente..."
                  value={formData.evolucao.afetividade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evolucao: {
                        ...formData.evolucao,
                        afetividade: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizacao">Organização</Label>
                <Textarea
                  id="organizacao"
                  placeholder="Descreva a organização do paciente..."
                  value={formData.evolucao.organizacao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evolucao: {
                        ...formData.evolucao,
                        organizacao: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crisesEResistencias">
                  Crises e Resistências
                </Label>
                <Textarea
                  id="crisesEResistencias"
                  placeholder="Descreva as crises e resistências..."
                  value={formData.evolucao.crisesEResistencias}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evolucao: {
                        ...formData.evolucao,
                        crisesEResistencias: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comunicacaoFuncional">
                  Comunicação Funcional
                </Label>
                <Textarea
                  id="comunicacaoFuncional"
                  placeholder="Descreva a comunicação funcional..."
                  value={formData.evolucao.comunicacaoFuncional}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evolucao: {
                        ...formData.evolucao,
                        comunicacaoFuncional: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordenacaoMotora">Coordenação Motora</Label>
                <Textarea
                  id="coordenacaoMotora"
                  placeholder="Descreva a coordenação motora..."
                  value={formData.evolucao.coordenacaoMotora}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evolucao: {
                        ...formData.evolucao,
                        coordenacaoMotora: e.target.value,
                      },
                    })
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Conclusão */}
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

          {/* Motivos da Continuidade */}
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
                  className="bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
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

          {/* Botão de Envio */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
            >
              Salvar Rascunho
            </Button>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
              size="lg"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar Relatório
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
