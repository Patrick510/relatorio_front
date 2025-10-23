"use client";

import { useState, useEffect } from "react";
import { usePaciente } from "@/hooks/usePaciente";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Paciente } from "@/types";

export default function AtendimentoPage() {
  const { listarPacientes, loading } = usePaciente();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredPacientes, setFilteredPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await listarPacientes();
      setPacientes(data);
      setFilteredPacientes(data);
    };
    fetchPacientes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPacientes(pacientes);
    } else {
      const filtered = pacientes.filter((p) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPacientes(filtered);
    }
  }, [searchTerm, pacientes]);

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Atendimento</h1>
        <p className="text-muted-foreground">
          Selecione um paciente para visualizar seus dados e documentos
        </p>
      </div>

      {/* 🔍 Busca */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar paciente por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* ⏳ Carregando */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* ⚠️ Nenhum paciente */}
      {!loading && filteredPacientes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm
                ? "Nenhum paciente encontrado com esse nome"
                : "Nenhum paciente cadastrado"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* 📋 Lista de pacientes */}
      {!loading && filteredPacientes.length > 0 && (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredPacientes.map((paciente) => (
            <AccordionItem
              key={paciente.id}
              value={paciente.id.toString()} // ← corrigido para string
              className="border rounded-lg bg-card"
            >
              <AccordionTrigger className="px-4 hover:no-underline hover:bg-accent/50 rounded-t-lg">
                <div className="flex items-center gap-3 text-left">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{paciente.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {calcularIdade(paciente.dataNascimento)} anos
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4">
                <div className="space-y-6 pt-4">
                  {/* 👤 Dados do Paciente */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dados do Paciente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Nome Completo
                        </p>
                        <p className="font-medium">{paciente.nome}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Data de Nascimento
                        </p>
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(paciente.dataNascimento).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Idade</p>
                        <p className="font-medium">
                          {calcularIdade(paciente.dataNascimento)} anos
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant="outline" className="mt-1">
                          {paciente.responsavel
                            ? "Com Responsável"
                            : "Responsável por si"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* 👨‍👩‍👧 Responsável */}
                  {paciente.responsavel && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Dados do Responsável
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Nome</p>
                          <p className="font-medium">
                            {paciente.responsavel.nome}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Parentesco
                          </p>
                          <p className="font-medium">
                            {paciente.responsavel.parentesco}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Celular
                          </p>
                          <p className="font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {paciente.responsavel.celular}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {paciente.responsavel.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 📄 Documentos */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documentos
                    </h3>
                    <Card>
                      <CardContent className="py-8 text-center">
                        <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-muted-foreground mb-2">
                          Nenhum documento cadastrado
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Os documentos criados via formulários aparecerão aqui
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
