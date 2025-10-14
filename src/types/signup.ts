// src/types/signup.ts
import * as z from "zod";

export const signupSchema = z
  .object({
    nome: z
      .string()
      .min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
    cargoId: z.string().min(1, { message: "Selecione um cargo" }),
    email: z.string().email({ message: "Email inválido" }),
    senha: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

// Tipo baseado no schema
export type SignupFormValues = z.infer<typeof signupSchema>;
