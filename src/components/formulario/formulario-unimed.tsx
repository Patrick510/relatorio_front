"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import type { FormData } from "@/types/relatorio";
import Passo2 from "./unimed/Step2";
import Passo1 from "./unimed/Step1";
import Passo3 from "./unimed/Step3";
import Passo4 from "./unimed/Step4";
import { useForm } from "@/hooks/useForm";

export default function FormularioUnimed() {
  const [currentStep, setCurrentStep] = useState(1);
  const { gerarFormulario, loading, error } = useForm();
  const totalSteps = 4;

  const [comportamentoAtual, setComportamentoAtual] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosParaEnvio = {
      idPaciente: 1, // ou vindo de contexto/rota
      formularioDTO: {
        introducao: formData.introducao,
        comportamentos: formData.comportamentos.map((c) => c.descricao),
        evolucao: [
          {
            engajamento: formData.evolucao.engajamento,
            afetividade: formData.evolucao.afetividade,
            organizacao: formData.evolucao.organizacao,
            crisesEResistencias: formData.evolucao.crisesEResistencias,
            comunicacaoFuncional: formData.evolucao.comunicacaoFuncional,
            coordenacaoMotora: formData.evolucao.coordenacaoMotora,
          },
        ],
        conclusao: formData.conclusao,
        listaConclusao: formData.motivosContinuidade.map((m) => m.motivo),
        nomeCoordenadora: formData.coordenadora,
        nomePsicologa: formData.psicologo,
      },
    };

    console.log("[ENVIANDO PARA BACKEND]", dadosParaEnvio);

    const sucesso = await gerarFormulario(dadosParaEnvio);

    if (sucesso) {
      console.log("✅ Relatório enviado com sucesso!");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepTitles = [
    "Informações Básicas e Introdução",
    "Comportamentos Observados",
    "Evolução",
    "Conclusão e Motivos da Continuidade",
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">Relatório Unimed</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Preencha os campos abaixo para gerar o relatório
          </p>
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-foreground md:text-lg">
            Etapa {currentStep} de {totalSteps}: {stepTitles[currentStep - 1]}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {currentStep === 1 && (
            <Passo1 formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 2 && (
            <Passo2
              comportamentoAtual={comportamentoAtual}
              setComportamentoAtual={setComportamentoAtual}
              formData={formData}
              setFormData={setFormData}
              adicionarComportamento={adicionarComportamento}
              removerComportamento={removerComportamento}
              comportamentos={formData.comportamentos}
            />
          )}

          {currentStep === 3 && (
            <Passo3 formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 4 && (
            <Passo4 formData={formData} setFormData={setFormData} />
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto bg-transparent"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent"
              >
                Salvar Rascunho
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                  size="lg"
                >
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Enviar Relatório
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
