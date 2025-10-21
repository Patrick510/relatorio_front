"use client";

import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { Usuario, Cargo } from "@/types";
import { useUsuario } from "@/hooks/useUsuario";
import { useCargo } from "@/hooks/useCargo";
import { EditUserModal } from "@/components/listUserModal";

export default function EditarUser() {
  const { listarUsers, atualizarUsuario, loading } = useUsuario();
  const { listarCargos } = useCargo();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [usersData, cargosData] = await Promise.all([
        listarUsers(),
        listarCargos(),
      ]);
      setUsuarios(usersData);
      setCargos(cargosData);
    };
    loadData();
  }, []);

  const filteredUsers = usuarios.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user: Usuario) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSave = async (id: number, data: Partial<Usuario>) => {
    await atualizarUsuario(id, data);
    const updatedUsers = await listarUsers();
    setUsuarios(updatedUsers);
  };

  let content;

  if (loading) {
    content = (
      <div className="text-center py-8 text-muted-foreground">
        Carregando usuários...
      </div>
    );
  } else if (filteredUsers.length === 0) {
    content = (
      <div className="text-center py-8 text-muted-foreground">
        {searchTerm
          ? "Nenhum usuário encontrado com esse nome."
          : "Nenhum usuário disponível."}
      </div>
    );
  } else {
    content = (
      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => handleUserClick(user)}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition-colors text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground">
                {user.nome} | {user.cargoNome}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Editar Usuário
          </h1>
          <p className="text-muted-foreground">
            Pesquise e selecione um usuário para editar suas informações.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar usuário por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">{content}</div>
        </Card>
      </div>

      <EditUserModal
        user={selectedUser}
        cargos={cargos}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
      />
    </div>
  );
}
