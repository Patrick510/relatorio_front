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
  role: string;
};

export enum Role {
  ADMIN = 0,
  USER = 1,
  TECH_INNOVATOR = 2,
}

// NOVOS
export type TipoRelatorio = "prefeitura" | "unimed" | null;

export interface Comportamento {
  id: string;
  descricao: string;
}

export interface MotivosContinuidade {
  id: string;
  motivo: string;
}

export interface FormData {
  paciente: string;
  coordenadora: string;
  psicologo: string;
  introducao: string;
  comportamentos: Comportamento[];
  evolucao: {
    engajamento: string;
    afetividade: string;
    organizacao: string;
    crisesEResistencias: string;
    comunicacaoFuncional: string;
    coordenacaoMotora: string;
  };
  conclusao: string;
  motivosContinuidade: MotivosContinuidade[];
}
