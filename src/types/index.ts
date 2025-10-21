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
