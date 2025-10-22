// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Save, User, Phone, Mail, Heart, UserCheck } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { usePaciente } from "@/hooks/usePaciente";
// import { Responsavel, Paciente } from "@/types";

// export default function ResponsavelPage() {
//   const { listarPacientes, atualizarPaciente, loading } = usePaciente();

//   const [pacientes, setPacientes] = useState<Paciente[]>([]);
//   const [pacienteSelecionado, setPacienteSelecionado] = useState<string>("");
//   const [responsavel, setResponsavel] = useState<Responsavel>({
//     nome: "",
//     parentesco: "",
//     celular: "",
//     email: "",
//     contatoPrincipal: false,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [jaTemResponsavel, setJaTemResponsavel] = useState(false);

//   useEffect(() => {
//     const buscarPacientes = async () => {
//       const lista = await listarPacientes();
//       setPacientes(lista);
//     };
//     buscarPacientes();
//   }, []);

//   useEffect(() => {
//     if (pacienteSelecionado) {
//       const paciente = pacientes.find((p) => p.id === pacienteSelecionado);
//       if (paciente?.responsavel) {
//         // Paciente já tem responsável - preencher campos
//         setResponsavel(paciente.responsavel);
//         setJaTemResponsavel(true);
//       } else {
//         // Paciente não tem responsável - limpar campos
//         setResponsavel({
//           nome: "",
//           parentesco: "",
//           celular: "",
//           email: "",
//           contatoPrincipal: false,
//         });
//         setJaTemResponsavel(false);
//       }
//     }
//   }, [pacienteSelecionado, pacientes]);

//   const formatarCelular = (valor: string) => {
//     const numeros = valor.replace(/\D/g, "");
//     if (numeros.length <= 11) {
//       return numeros
//         .replace(/^(\d{2})(\d)/g, "($1) $2")
//         .replace(/(\d{5})(\d)/, "$1-$2")
//         .replace(/(-\d{4})\d+?$/, "$1");
//     }
//     return valor;
//   };

//   const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const valorFormatado = formatarCelular(e.target.value);
//     setResponsavel({ ...responsavel, celular: valorFormatado });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const sucesso = await atualizarPaciente(pacienteSelecionado, responsavel);

//       if (sucesso) {
//         alert(
//           jaTemResponsavel
//             ? "Responsável atualizado com sucesso!"
//             : "Responsável adicionado com sucesso!"
//         );
//         // Atualizar lista de pacientes
//         const lista = await listarPacientes();
//         setPacientes(lista);
//       } else {
//         alert("Erro ao salvar responsável");
//       }
//     } catch (error) {
//       console.error("[v0] Erro ao enviar:", error);
//       alert("Erro ao salvar responsável");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const pacienteAtual = pacientes.find((p) => p.id === pacienteSelecionado);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
//           {jaTemResponsavel ? "Alterar Responsável" : "Adicionar Responsável"}
//         </h1>
//         <p className="text-sm text-muted-foreground md:text-base">
//           Selecione um paciente e preencha os dados do responsável
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <UserCheck className="h-5 w-5" />
//               Selecionar Paciente
//             </CardTitle>
//             <CardDescription>
//               Escolha o paciente para adicionar ou alterar o responsável
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="paciente">Paciente *</Label>
//               <Select
//                 value={pacienteSelecionado}
//                 onValueChange={setPacienteSelecionado}
//                 disabled={loading}
//               >
//                 <SelectTrigger id="paciente">
//                   <SelectValue
//                     placeholder={
//                       loading
//                         ? "Carregando pacientes..."
//                         : "Selecione um paciente"
//                     }
//                   />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {pacientes.map((paciente) => (
//                     <SelectItem key={paciente.id} value={paciente.id}>
//                       {paciente.nome} - {paciente.idade} anos
//                       {paciente.responsavel && " (Já tem responsável)"}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {pacienteAtual && (
//               <div className="rounded-lg border bg-muted/50 p-4">
//                 <p className="text-sm font-medium">Paciente selecionado:</p>
//                 <p className="text-sm text-muted-foreground">
//                   {pacienteAtual.nome} - {pacienteAtual.idade} anos
//                 </p>
//                 {pacienteAtual.responsavel && (
//                   <p className="mt-1 text-sm font-medium text-amber-600">
//                     Este paciente já possui um responsável cadastrado
//                   </p>
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {pacienteSelecionado && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <User className="h-5 w-5" />
//                 Dados do Responsável
//               </CardTitle>
//               <CardDescription>
//                 {jaTemResponsavel
//                   ? "Altere os dados do responsável"
//                   : "Preencha os dados do responsável"}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="nomeResponsavel"
//                   className="flex items-center gap-2"
//                 >
//                   <User className="h-4 w-4" />
//                   Nome Completo *
//                 </Label>
//                 <Input
//                   id="nomeResponsavel"
//                   placeholder="Digite o nome completo do responsável"
//                   value={responsavel.nome}
//                   onChange={(e) =>
//                     setResponsavel({ ...responsavel, nome: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="parentesco" className="flex items-center gap-2">
//                   <Heart className="h-4 w-4" />
//                   Parentesco *
//                 </Label>
//                 <Select
//                   value={responsavel.parentesco}
//                   onValueChange={(value) =>
//                     setResponsavel({ ...responsavel, parentesco: value })
//                   }
//                   required
//                 >
//                   <SelectTrigger id="parentesco">
//                     <SelectValue placeholder="Selecione o parentesco" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="MAE">Mãe</SelectItem>
//                     <SelectItem value="PAI">Pai</SelectItem>
//                     <SelectItem value="AVO">Avô/Avó</SelectItem>
//                     <SelectItem value="TIO">Tio/Tia</SelectItem>
//                     <SelectItem value="IRMAO">Irmão/Irmã</SelectItem>
//                     <SelectItem value="TUTOR">Tutor Legal</SelectItem>
//                     <SelectItem value="OUTRO">Outro</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="celular" className="flex items-center gap-2">
//                     <Phone className="h-4 w-4" />
//                     Celular *
//                   </Label>
//                   <Input
//                     id="celular"
//                     placeholder="(11) 98888-7777"
//                     value={responsavel.celular}
//                     onChange={handleCelularChange}
//                     required
//                     maxLength={15}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="flex items-center gap-2">
//                     <Mail className="h-4 w-4" />
//                     Email *
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="email@exemplo.com"
//                     value={responsavel.email}
//                     onChange={(e) =>
//                       setResponsavel({ ...responsavel, email: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="contatoPrincipal"
//                   checked={responsavel.contatoPrincipal}
//                   onCheckedChange={(checked) =>
//                     setResponsavel({
//                       ...responsavel,
//                       contatoPrincipal: checked as boolean,
//                     })
//                   }
//                 />
//                 <Label
//                   htmlFor="contatoPrincipal"
//                   className="cursor-pointer text-sm font-normal"
//                 >
//                   Este é o contato principal
//                 </Label>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {pacienteSelecionado && (
//           <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
//             <Button
//               type="button"
//               variant="outline"
//               size="lg"
//               className="w-full bg-transparent sm:w-auto"
//               onClick={() => {
//                 setPacienteSelecionado("");
//                 setResponsavel({
//                   nome: "",
//                   parentesco: "",
//                   celular: "",
//                   email: "",
//                   contatoPrincipal: false,
//                 });
//               }}
//             >
//               Cancelar
//             </Button>
//             <Button
//               type="submit"
//               disabled={
//                 isSubmitting ||
//                 loading ||
//                 !responsavel.nome ||
//                 !responsavel.parentesco
//               }
//               className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
//               size="lg"
//             >
//               <Save className="mr-2 h-4 w-4" />
//               {isSubmitting
//                 ? "Salvando..."
//                 : jaTemResponsavel
//                 ? "Alterar Responsável"
//                 : "Adicionar Responsável"}
//             </Button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }
