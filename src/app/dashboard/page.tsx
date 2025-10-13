"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  useProtectedRoute(); // qualquer usuário logado
  const { logout, getRole } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Role do usuário: {getRole()}</p>
      <button
        onClick={logout}
        className="bg-red-600 text-white rounded p-2 mt-4 hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}
