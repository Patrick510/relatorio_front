import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Sistema de Gerenciamento
          </h1>
          <p className="text-xl text-muted-foreground">
            Gerencie seus usuários, documentos e configurações de forma simples
            e eficiente
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/login">
              <LogIn />
              Fazer Login
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">
              <UserPlus />
              Criar Conta
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/dashboard"
              className="font-medium text-primary hover:underline"
            >
              Ir para o Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
