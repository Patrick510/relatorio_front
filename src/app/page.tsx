"use client";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold">Página Inicial</h1>
      <a href="/login" className="text-blue-600 underline">
        Ir para Login
      </a>
    </main>
  );
}
