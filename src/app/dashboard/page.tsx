"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Carregando...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Bem-vindo, {session.user?.name}</h1>
      <p>Seu email: {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white rounded p-2 hover:bg-red-700 transition"
      >
        Sair
      </button>
    </div>
  );
}
