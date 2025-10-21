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
