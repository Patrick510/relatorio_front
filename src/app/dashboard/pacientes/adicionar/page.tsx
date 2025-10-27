"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  User,
  Calendar,
  FileText,
  Users,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { usePaciente } from "@/hooks/usePaciente";
import {
  PacienteCompleto,
  PacienteFormData,
  ResponsavelFormData,
} from "@/types";

export default function AdicionarPacientePage() {
  const { registrarPacienteResponsavel } = usePaciente();
  const [paciente, setPaciente] = useState<PacienteFormData>({
    nome: "",
    dataNascimento: "",
  });

  const [responsavel, setResponsavel] = useState<ResponsavelFormData>({
    nome: "",
    parentesco: "",
    celular: "",
    email: "",
    contatoPrincipal: false,
  });

  const [idade, setIdade] = useState<number | null>(null);
  const [ehResponsavel, setEhResponsavel] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (paciente.dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(paciente.dataNascimento);
      let idadeCalculada = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();

      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeCalculada--;
      }

      setIdade(idadeCalculada);
      setEhResponsavel(idadeCalculada >= 18);
    } else {
      setIdade(null);
      setEhResponsavel(false);
    }
  }, [paciente.dataNascimento]);

  const formatarCelular = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 11) {
      return numeros
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return valor;
  };

  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCelular(e.target.value);
    setResponsavel({ ...responsavel, celular: valorFormatado });
  };

  const handleCelularPacienteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valorFormatado = formatarCelular(e.target.value);
    setPaciente({ ...paciente, celular: valorFormatado });
  };

  // dentro do seu componente AdicionarPacientePage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // pacientePayload deve ter o formato esperado pelo backend (LocalDate via string YYYY-MM-DD)
      const pacientePayload = {
        nome: paciente.nome,
        dataNascimento: paciente.dataNascimento, // "YYYY-MM-DD" do input date
      };

      // montar responsavelPayload ou null quando ehResponsavel === true
      const responsavelPayload = ehResponsavel
        ? null
        : {
            nome: responsavel.nome,
            parentesco: responsavel.parentesco, // ex: "MAE", "PAI", "TUTOR" (string igual ao enum)
            celular: responsavel.celular || "",
            email: responsavel.email || "",
            role: "RESPONSAVEL", // importante: enviar um role compatível com o enum do backend
          };

      const sucesso = await registrarPacienteResponsavel(
        ehResponsavel,
        pacientePayload,
        responsavelPayload
      );

      if (sucesso) {
        alert("Paciente cadastrado com sucesso!");
        // limpar estado
        setPaciente({
          nome: "",
          dataNascimento: "",
        });
        setResponsavel({
          nome: "",
          parentesco: "",
          celular: "",
          email: "",
          contatoPrincipal: false,
        });
      }
    } catch (error) {
      console.error("[v0] Erro ao enviar:", error);
      alert("Erro ao cadastrar paciente");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Cadastrar Paciente
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Preencha os dados do paciente e do responsável (se necessário)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados do Paciente
            </CardTitle>
            <CardDescription>Informações básicas do paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome Completo <span className="text-red-500 ml-[-4px]">*</span>
              </Label>
              <Input
                id="nome"
                placeholder="Digite o nome completo do paciente"
                value={paciente.nome}
                onChange={(e) =>
                  setPaciente({ ...paciente, nome: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dataNascimento"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Data de Nascimento{" "}
                <span className="text-red-500 ml-[-4px]">*</span>
              </Label>
              <Input
                id="dataNascimento"
                type="date"
                value={paciente.dataNascimento}
                onChange={(e) =>
                  setPaciente({ ...paciente, dataNascimento: e.target.value })
                }
                required
              />
              {idade !== null && (
                <p className="text-sm text-muted-foreground">
                  Idade: <span className="font-semibold">{idade} anos</span>
                </p>
              )}
            </div>

            {ehResponsavel && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="celularPaciente"
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Celular <span className="text-red-500 ml-[-4px]">*</span>
                  </Label>
                  <Input
                    id="celularPaciente"
                    placeholder="(11) 98888-7777"
                    value={paciente.celular}
                    onChange={handleCelularPacienteChange}
                    required={ehResponsavel}
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="emailPaciente"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email <span className="text-red-500 ml-[-4px]">*</span>
                  </Label>
                  <Input
                    id="emailPaciente"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={paciente.email}
                    onChange={(e) =>
                      setPaciente({ ...paciente, email: e.target.value })
                    }
                    required={ehResponsavel}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="outrasInformacoes"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Outras Informações (Opcional)
              </Label>
              <Textarea
                id="outrasInformacoes"
                placeholder="Informações adicionais sobre o paciente..."
                value={paciente.outrasInformacoes}
                onChange={(e) =>
                  setPaciente({
                    ...paciente,
                    outrasInformacoes: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {idade !== null && (
          <Card
            className={
              ehResponsavel
                ? "border-emerald-500 bg-emerald-50/50"
                : "border-blue-500 bg-blue-50/50"
            }
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-2 ${
                    ehResponsavel ? "bg-emerald-500" : "bg-blue-500"
                  }`}
                >
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {ehResponsavel
                      ? "Paciente será o próprio responsável"
                      : "Paciente precisa de um responsável"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {ehResponsavel
                      ? "O paciente tem 18 anos ou mais e será registrado como responsável de si mesmo."
                      : "O paciente tem menos de 18 anos. Preencha os dados do responsável abaixo."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!ehResponsavel && idade !== null && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Dados do Responsável
              </CardTitle>
              <CardDescription>
                Informações do responsável legal pelo paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="nomeResponsavel"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Nome Completo *
                </Label>
                <Input
                  id="nomeResponsavel"
                  placeholder="Digite o nome completo do responsável"
                  value={responsavel.nome}
                  onChange={(e) =>
                    setResponsavel({ ...responsavel, nome: e.target.value })
                  }
                  required={!ehResponsavel}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentesco" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Parentesco *
                </Label>
                <Select
                  value={responsavel.parentesco}
                  onValueChange={(value) =>
                    setResponsavel({ ...responsavel, parentesco: value })
                  }
                  required={!ehResponsavel}
                >
                  <SelectTrigger id="parentesco">
                    <SelectValue placeholder="Selecione o parentesco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAE">Mãe</SelectItem>
                    <SelectItem value="PAI">Pai</SelectItem>
                    <SelectItem value="AVO">Avô/Avó</SelectItem>
                    <SelectItem value="TIO">Tio/Tia</SelectItem>
                    <SelectItem value="IRMAO">Irmão/Irmã</SelectItem>
                    <SelectItem value="TUTOR">Tutor Legal</SelectItem>
                    <SelectItem value="OUTRO">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="celular" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Celular *
                  </Label>
                  <Input
                    id="celular"
                    placeholder="(11) 98888-7777"
                    value={responsavel.celular}
                    onChange={handleCelularChange}
                    required={!ehResponsavel}
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={responsavel.email}
                    onChange={(e) =>
                      setResponsavel({ ...responsavel, email: e.target.value })
                    }
                    required={!ehResponsavel}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contatoPrincipal"
                  checked={responsavel.contatoPrincipal}
                  onCheckedChange={(checked) =>
                    setResponsavel({
                      ...responsavel,
                      contatoPrincipal: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="contatoPrincipal"
                  className="cursor-pointer text-sm font-normal"
                >
                  Este é o contato principal
                </Label>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              isSubmitting || !paciente.nome || !paciente.dataNascimento
            }
            className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
            size="lg"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Cadastrando..." : "Cadastrar Paciente"}
          </Button>
        </div>
      </form>
    </div>
  );
}
