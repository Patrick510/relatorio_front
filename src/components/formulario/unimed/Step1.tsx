"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/relatorio";

interface Passo1Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function Passo1({
  formData,
  setFormData,
}: Readonly<Passo1Props>) {
  return (
    <>
      {/* Informações básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Paciente */}
          <div className="space-y-2">
            <Label htmlFor="paciente">Paciente</Label>
            <Select
              value={formData.paciente}
              onValueChange={(value) =>
                setFormData({ ...formData, paciente: value })
              }
            >
              <SelectTrigger id="paciente">
                <SelectValue placeholder="Selecione o paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paciente1">João Silva</SelectItem>
                <SelectItem value="paciente2">Maria Santos</SelectItem>
                <SelectItem value="paciente3">Pedro Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Coordenadora */}
          <div className="space-y-2">
            <Label htmlFor="coordenadora">Coordenadora</Label>
            <Select
              value={formData.coordenadora}
              onValueChange={(value) =>
                setFormData({ ...formData, coordenadora: value })
              }
            >
              <SelectTrigger id="coordenadora">
                <SelectValue placeholder="Selecione a coordenadora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coord1">Ana Paula Costa</SelectItem>
                <SelectItem value="coord2">Juliana Ferreira</SelectItem>
                <SelectItem value="coord3">Carla Mendes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Psicólogo */}
          <div className="space-y-2">
            <Label htmlFor="psicologo">Psicólogo(a)</Label>
            <Select
              value={formData.psicologo}
              onValueChange={(value) =>
                setFormData({ ...formData, psicologo: value })
              }
            >
              <SelectTrigger id="psicologo">
                <SelectValue placeholder="Selecione o(a) psicólogo(a)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psi1">Dr. Carlos Almeida</SelectItem>
                <SelectItem value="psi2">Dra. Beatriz Lima</SelectItem>
                <SelectItem value="psi3">Dr. Rafael Souza</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Introdução */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Introdução</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Escreva a introdução do relatório..."
            value={formData.introducao}
            onChange={(e) =>
              setFormData({ ...formData, introducao: e.target.value })
            }
            rows={6}
            className="text-sm md:text-base"
          />
        </CardContent>
      </Card>
    </>
  );
}
