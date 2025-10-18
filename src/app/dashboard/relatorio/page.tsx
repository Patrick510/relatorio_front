export default function RelatorioPage() {
  return (
    <div>
      <h1>Relatório</h1>
      <p>Conteúdo do relatório...</p>
    </div>
  );
}

// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { X, Plus, FileText, Send } from "lucide-react"

// type TipoRelatorio = "prefeitura" | "unimed" | null

// interface Comportamento {
//   id: string
//   descricao: string
// }

// interface MotivosContinuidade {
//   id: string
//   motivo: string
// }

// interface FormData {
//   paciente: string
//   coordenadora: string
//   psicologo: string
//   introducao: string
//   comportamentos: Comportamento[]
//   evolucao: {
//     engajamento: string
//     afetividade: string
//     organizacao: string
//     crisesEResistencias: string
//     comunicacaoFuncional: string
//     coordenacaoMotora: string
//   }
//   conclusao: string
//   motivosContinuidade: MotivosContinuidade[]
// }

// export default function RelatorioPage() {
//   const [tipoRelatorio, setTipoRelatorio] = useState<TipoRelatorio>(null)
//   const [comportamentoAtual, setComportamentoAtual] = useState("")
//   const [motivoAtual, setMotivoAtual] = useState("")

//   const [formData, setFormData] = useState<FormData>({
//     paciente: "",
//     coordenadora: "",
//     psicologo: "",
//     introducao: "",
//     comportamentos: [],
//     evolucao: {
//       engajamento: "",
//       afetividade: "",
//       organizacao: "",
//       crisesEResistencias: "",
//       comunicacaoFuncional: "",
//       coordenacaoMotora: "",
//     },
//     conclusao: "",
//     motivosContinuidade: [],
//   })

//   const adicionarComportamento = () => {
//     if (comportamentoAtual.trim()) {
//       setFormData({
//         ...formData,
//         comportamentos: [...formData.comportamentos, { id: Date.now().toString(), descricao: comportamentoAtual }],
//       })
//       setComportamentoAtual("")
//     }
//   }

//   const removerComportamento = (id: string) => {
//     setFormData({
//       ...formData,
//       comportamentos: formData.comportamentos.filter((c) => c.id !== id),
//     })
//   }

//   const adicionarMotivo = () => {
//     if (motivoAtual.trim()) {
//       setFormData({
//         ...formData,
//         motivosContinuidade: [...formData.motivosContinuidade, { id: Date.now().toString(), motivo: motivoAtual }],
//       })
//       setMotivoAtual("")
//     }
//   }

//   const removerMotivo = (id: string) => {
//     setFormData({
//       ...formData,
//       motivosContinuidade: formData.motivosContinuidade.filter((m) => m.id !== id),
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Preparar dados para envio
//     const dadosParaEnvio = {
//       tipo: tipoRelatorio,
//       ...formData,
//     }

//     console.log("[v0] Dados do relatório:", dadosParaEnvio)

//     // Aqui você faria a chamada para a API
//     // await fetch('/api/relatorios', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify(dadosParaEnvio),
//     // })
//   }

//   // Cores baseadas no tipo de relatório
//   const corTema = tipoRelatorio === "prefeitura" ? "slate" : tipoRelatorio === "unimed" ? "emerald" : "blue"
//   const corBotao =
//     tipoRelatorio === "prefeitura" ? "bg-slate-900 hover:bg-slate-800" : "bg-emerald-600 hover:bg-emerald-700"

//   if (!tipoRelatorio) {
//     return (
//       <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
//             <CardTitle className="text-2xl">Novo Relatório</CardTitle>
//             <CardDescription>Selecione o tipo de relatório que deseja criar</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <Button
//               onClick={() => setTipoRelatorio("prefeitura")}
//               className="w-full bg-slate-900 hover:bg-slate-800"
//               size="lg"
//             >
//               Relatório Prefeitura
//             </Button>
//             <Button
//               onClick={() => setTipoRelatorio("unimed")}
//               className="w-full bg-emerald-600 hover:bg-emerald-700"
//               size="lg"
//             >
//               Relatório Unimed
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6">
//       <div className="mx-auto max-w-4xl space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Relatório {tipoRelatorio === "prefeitura" ? "Prefeitura" : "Unimed"}</h1>
//             <p className="text-muted-foreground">Preencha os campos abaixo para gerar o relatório</p>
//           </div>
//           <Button variant="outline" onClick={() => setTipoRelatorio(null)}>
//             Trocar Tipo
//           </Button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Informações Básicas */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Informações Básicas</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="paciente">Paciente</Label>
//                 <Select
//                   value={formData.paciente}
//                   onValueChange={(value) => setFormData({ ...formData, paciente: value })}
//                 >
//                   <SelectTrigger id="paciente">
//                     <SelectValue placeholder="Selecione o paciente" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="paciente1">João Silva</SelectItem>
//                     <SelectItem value="paciente2">Maria Santos</SelectItem>
//                     <SelectItem value="paciente3">Pedro Oliveira</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="coordenadora">Coordenadora</Label>
//                 <Select
//                   value={formData.coordenadora}
//                   onValueChange={(value) => setFormData({ ...formData, coordenadora: value })}
//                 >
//                   <SelectTrigger id="coordenadora">
//                     <SelectValue placeholder="Selecione a coordenadora" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="coord1">Ana Paula Costa</SelectItem>
//                     <SelectItem value="coord2">Juliana Ferreira</SelectItem>
//                     <SelectItem value="coord3">Carla Mendes</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="psicologo">Psicólogo(a)</Label>
//                 <Select
//                   value={formData.psicologo}
//                   onValueChange={(value) => setFormData({ ...formData, psicologo: value })}
//                 >
//                   <SelectTrigger id="psicologo">
//                     <SelectValue placeholder="Selecione o(a) psicólogo(a)" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="psi1">Dr. Carlos Almeida</SelectItem>
//                     <SelectItem value="psi2">Dra. Beatriz Lima</SelectItem>
//                     <SelectItem value="psi3">Dr. Rafael Souza</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Introdução */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Introdução</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Textarea
//                 placeholder="Escreva a introdução do relatório..."
//                 value={formData.introducao}
//                 onChange={(e) => setFormData({ ...formData, introducao: e.target.value })}
//                 rows={6}
//               />
//             </CardContent>
//           </Card>

//           {/* Comportamentos */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Comportamentos Observados</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex gap-2">
//                 <Textarea
//                   placeholder="Descreva o comportamento observado..."
//                   value={comportamentoAtual}
//                   onChange={(e) => setComportamentoAtual(e.target.value)}
//                   rows={3}
//                   className="flex-1"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && e.ctrlKey) {
//                       e.preventDefault()
//                       adicionarComportamento()
//                     }
//                   }}
//                 />
//                 <Button type="button" onClick={adicionarComportamento} className={corBotao} size="icon">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               {formData.comportamentos.length > 0 && (
//                 <div className="space-y-2">
//                   {formData.comportamentos.map((comportamento) => (
//                     <div key={comportamento.id} className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3">
//                       <p className="flex-1 text-sm">{comportamento.descricao}</p>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         className="h-6 w-6 shrink-0"
//                         onClick={() => removerComportamento(comportamento.id)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Evolução */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Evolução</CardTitle>
//               <CardDescription>Descreva a evolução do paciente em cada aspecto</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="engajamento">Engajamento</Label>
//                 <Textarea
//                   id="engajamento"
//                   placeholder="Descreva o engajamento do paciente..."
//                   value={formData.evolucao.engajamento}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       evolucao: { ...formData.evolucao, engajamento: e.target.value },
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="afetividade">Afetividade</Label>
//                 <Textarea
//                   id="afetividade"
//                   placeholder="Descreva a afetividade do paciente..."
//                   value={formData.evolucao.afetividade}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       evolucao: { ...formData.evolucao, afetividade: e.target.value },
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="organizacao">Organização</Label>
//                 <Textarea
//                   id="organizacao"
//                   placeholder="Descreva a organização do paciente..."
//                   value={formData.evolucao.organizacao}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       evolucao: { ...formData.evolucao, organizacao: e.target.value },
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="crisesEResistencias">Crises e Resistências</Label>
//                 <Textarea
//                   id="crisesEResistencias"
//                   placeholder="Descreva as crises e resistências..."
//                   value={formData.evolucao.crisesEResistencias}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       evolucao: { ...formData.evolucao, crisesEResistencias: e.target.value },
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="comunicacaoFuncional">Comunicação Funcional</Label>
//                 <Textarea
//                   id="comunicacaoFuncional"
//                   placeholder="Descreva a comunicação funcional..."
//                   value={formData.evolucao.comunicacaoFuncional}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       evolucao: { ...formData.evolucao, comunicacaoFuncional: e.target.value },
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="coordenacaoMotora">Coordenação Motora</Label>
//                 <Textarea
//                   id="coordenacaoMotora"
//                   placeholder="Descreva a coordenação motora..."
//                   value={formData.evolucao.coordenacaoMotora}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       evolucao: { ...formData.evolucao, coordenacaoMotora: e.target.value },
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Conclusão */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Conclusão</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Textarea
//                 placeholder="Escreva a conclusão do relatório..."
//                 value={formData.conclusao}
//                 onChange={(e) => setFormData({ ...formData, conclusao: e.target.value })}
//                 rows={6}
//               />
//             </CardContent>
//           </Card>

//           {/* Motivos da Continuidade */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Motivos da Continuidade da Terapia ABA</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex gap-2">
//                 <Textarea
//                   placeholder="Descreva um motivo para continuidade..."
//                   value={motivoAtual}
//                   onChange={(e) => setMotivoAtual(e.target.value)}
//                   rows={3}
//                   className="flex-1"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && e.ctrlKey) {
//                       e.preventDefault()
//                       adicionarMotivo()
//                     }
//                   }}
//                 />
//                 <Button type="button" onClick={adicionarMotivo} className={corBotao} size="icon">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               {formData.motivosContinuidade.length > 0 && (
//                 <div className="space-y-2">
//                   {formData.motivosContinuidade.map((motivo) => (
//                     <div key={motivo.id} className="flex items-start gap-2 rounded-lg border bg-muted/50 p-3">
//                       <p className="flex-1 text-sm">{motivo.motivo}</p>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         className="h-6 w-6 shrink-0"
//                         onClick={() => removerMotivo(motivo.id)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Botão de Envio */}
//           <div className="flex justify-end gap-3">
//             <Button type="button" variant="outline" size="lg">
//               Salvar Rascunho
//             </Button>
//             <Button type="submit" className={corBotao} size="lg">
//               <Send className="mr-2 h-4 w-4" />
//               Enviar Relatório
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
