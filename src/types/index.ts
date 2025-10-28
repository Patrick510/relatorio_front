import { ElementType } from "react";

// EXISTENTES
export type Cargo = {
  id: number;
  nome: string;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  cargoId: number;
  cargoNome?: string;
  role: string;
};

export type PacienteFormData = {
  nome: string;
  dataNascimento: string;
  celular?: string;
  email?: string;
  outrasInformacoes?: string;
};

export type ResponsavelFormData = {
  nome: string;
  parentesco: string;
  celular: string;
  email: string;
  contatoPrincipal: boolean;
};

export type PacienteCompleto = {
  id: number;
  paciente: Paciente | null;
  responsavel: Responsavel | null;
};

export type Responsavel = {
  id: number;
  nome: string;
  parentesco: string;
  celular: string;
  email: string;
};

export type Paciente = {
  id: number;
  nome: string;
  dataNascimento: string; // ← mudou de number para string
  responsavel?: Responsavel | null; // ← adicionado
};

export enum Role {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  USER = 2,
  RESPONSAVEL = 3,
  ATENDENTE = 4,
  PSICOLOGO = 5,
}

interface SubItem {
  label: string;
  href: string;
  disabled?: boolean; // opcional
}

export interface MenuItem {
  icon: ElementType;
  label: string;
  href: string;
  rolesPermitidas?: Role[];
  subItems?: SubItem[];
}

// types/index.ts

export type EvolucaoDTO = {
  engajamento: string;
  afetividade: string;
  organizacao: string;
  crisesEResistencias: string;
  comunicacaoFuncional: string;
  coordenacaoMotora: string;
};

export type RelatorioFormData = {
  idPaciente: number;
  formularioDTO: {
    introducao: string;
    comportamentos: string[];
    evolucao: EvolucaoDTO[]; // ✅ agora bate com o backend
    conclusao: string;
    listaConclusao: string[];
    nomeCoordenadora: string;
    nomePsicologa: string;
  };
};
