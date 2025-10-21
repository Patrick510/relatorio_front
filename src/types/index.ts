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

export enum Role {
  ADMIN = 0,
  USER = 1,
  RESPONSAVEL = 2,
  ATENDENTE = 3,
  PSICOLOGO = 4,
}
