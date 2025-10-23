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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  User,
  Calendar,
  FileText,
  Users,
  Phone,
  Mail,
  Heart,
  Edit,
  Loader2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { usePaciente } from "@/hooks/usePaciente";
import { Paciente, PacienteFormData, ResponsavelFormData } from "@/types";

export default function EditarPacientePage() {
  const { listarPacientes, atualizarPaciente, atrelarResponsavel, loading } =
    usePaciente();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pacienteForm, setPacienteForm] = useState<PacienteFormData>({
    nome: "",
    dataNascimento: "",
    outrasInformacoes: "",
    celular: "",
    email: "",
  });

  const [responsavelForm, setResponsavelForm] = useState<ResponsavelFormData>({
    nome: "",
    parentesco: "",
    celular: "",
    email: "",
    contatoPrincipal: false,
  });

  const [idade, setIdade] = useState<number | null>(null);
  const [ehResponsavel, setEhResponsavel] = useState<boolean>(false);

  // 🧭 Carrega pacientes
  useEffect(() => {
    const carregarPacientes = async () => {
      const data = await listarPacientes();
      setPacientes(data);
    };
    carregarPacientes();
  }, []);

  // 🎂 Calcula idade
  useEffect(() => {
    if (pacienteForm.dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(pacienteForm.dataNascimento);
      let idadeCalc = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idadeCalc--;
      }
      setIdade(idadeCalc);
      setEhResponsavel(idadeCalc >= 18);
    } else {
      setIdade(null);
      setEhResponsavel(false);
    }
  }, [pacienteForm.dataNascimento]);

  // 🔍 Filtro
  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✏️ Ao clicar em um paciente
  const handlePacienteClick = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setPacienteForm({
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento,
      celular: paciente.responsavel?.celular || "",
      email: paciente.responsavel?.email || "",
      outrasInformacoes: "",
    });

    setResponsavelForm({
      nome: paciente.responsavel?.nome || "",
      parentesco: paciente.responsavel?.parentesco || "",
      celular: paciente.responsavel?.celular || "",
      email: paciente.responsavel?.email || "",
      contatoPrincipal: false,
    });

    setIsDialogOpen(true);
  };

  // 📱 Máscara simples (pode ser substituída por react-input-mask)
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

  // 💾 Envio da atualização
  // Atualizar apenas o paciente
  const handleAtualizarPaciente = async () => {
    if (!selectedPaciente) return;
    setIsSubmitting(true);

    try {
      const payload = {
        paciente: {
          nome: pacienteForm.nome,
          dataNascimento: pacienteForm.dataNascimento,
        },
      };

      // await atualizarPaciente(selectedPaciente.id, payload);
      alert("Paciente atualizado com sucesso!");
      setIsDialogOpen(false);
      const data = await listarPacientes();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      alert("Erro ao atualizar paciente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Atualizar apenas o responsável
  const handleAtualizarResponsavel = async () => {
    if (!selectedPaciente) return;
    setIsSubmitting(true);

    try {
      await atrelarResponsavel(
        selectedPaciente.id,
        {
          nome: responsavelForm.nome,
          parentesco: responsavelForm.parentesco,
          celular: responsavelForm.celular,
          email: responsavelForm.email,
        },
        responsavelForm.contatoPrincipal
      );

      alert("Responsável atualizado com sucesso!");
      setIsDialogOpen(false);
      const data = await listarPacientes();
      setPacientes(data);
    } catch (error) {
      console.error("Erro ao atualizar responsável:", error);
      alert("Erro ao atualizar responsável.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🧱 UI
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Editar Paciente</h1>
        <p className="text-muted-foreground">
          Selecione um paciente para editar seus dados
        </p>
      </div>

      {/* 🔍 Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Paciente</CardTitle>
          <CardDescription>
            Pesquise pelo nome do paciente que deseja editar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Digite o nome do paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredPacientes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Nenhum paciente encontrado
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPacientes.map((paciente) => {
            const idade = (() => {
              const nasc = new Date(paciente.dataNascimento);
              const hoje = new Date();
              let anos = hoje.getFullYear() - nasc.getFullYear();
              const mes = hoje.getMonth() - nasc.getMonth();
              if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate()))
                anos--;
              return anos;
            })();

            return (
              <Card
                key={paciente.id}
                onClick={() => handlePacienteClick(paciente)}
                className="cursor-pointer transition hover:border-primary hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" /> {paciente.nome}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {idade} anos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paciente.responsavel ? (
                    <p className="text-sm text-muted-foreground">
                      Responsável: {paciente.responsavel.nome}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Responsável por si
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Paciente</DialogTitle>
            <DialogDescription>
              Atualize os dados do paciente e responsável
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            {/* Form principal */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Paciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label>Nome</Label>
                <Input
                  value={pacienteForm.nome}
                  onChange={(e) =>
                    setPacienteForm({ ...pacienteForm, nome: e.target.value })
                  }
                  required
                />
                <Label>Data de Nascimento</Label>
                <Input
                  type="date"
                  value={pacienteForm.dataNascimento}
                  onChange={(e) =>
                    setPacienteForm({
                      ...pacienteForm,
                      dataNascimento: e.target.value,
                    })
                  }
                  required
                />
                {idade !== null && (
                  <p className="text-sm text-muted-foreground">
                    Idade: {idade} anos
                  </p>
                )}

                <Button
                  type="button"
                  onClick={handleAtualizarPaciente}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" /> Alterar Paciente
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Responsável */}
            {!ehResponsavel && idade !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Responsável</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Label>Nome</Label>
                  <Input
                    value={responsavelForm.nome}
                    onChange={(e) =>
                      setResponsavelForm({
                        ...responsavelForm,
                        nome: e.target.value,
                      })
                    }
                    required
                  />
                  <Label>Parentesco</Label>
                  <Input
                    value={responsavelForm.parentesco}
                    onChange={(e) =>
                      setResponsavelForm({
                        ...responsavelForm,
                        parentesco: e.target.value,
                      })
                    }
                    required
                  />
                  <Label>Celular</Label>
                  <Input
                    value={responsavelForm.celular}
                    onChange={(e) =>
                      setResponsavelForm({
                        ...responsavelForm,
                        celular: formatarCelular(e.target.value),
                      })
                    }
                    required
                  />
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={responsavelForm.email}
                    onChange={(e) =>
                      setResponsavelForm({
                        ...responsavelForm,
                        email: e.target.value,
                      })
                    }
                    required
                  />

                  {!ehResponsavel && (
                    <Button
                      type="button"
                      onClick={handleAtualizarResponsavel}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Users className="mr-2 h-4 w-4" /> Alterar Responsável
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Botões */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
