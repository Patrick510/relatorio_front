"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Usuario, Cargo } from "@/types";

interface EditUserModalProps {
  user: Usuario | null;
  cargos: Cargo[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: number, data: Partial<Usuario>) => Promise<void>;
}

export function EditUserModal({
  user,
  cargos,
  open,
  onOpenChange,
  onSave,
}: Readonly<EditUserModalProps>) {
  const [formData, setFormData] = useState({
    nome: "",
    cargoNome: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("Setting form data for user:", user);
      setFormData({
        nome: user.nome,
        cargoNome: user.cargoNome || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await onSave(user.id, formData);
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Editar Usuário
          </DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              placeholder="Nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo</Label>
            <Select
              value={formData.cargoNome}
              onValueChange={(value) =>
                setFormData({ ...formData, cargoNome: value })
              }
            >
              <SelectTrigger id="cargo">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {cargos.map((cargo) => (
                  <SelectItem key={cargo.id} value={cargo.nome}>
                    {cargo.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
