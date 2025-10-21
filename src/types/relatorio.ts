export type TipoRelatorio = "prefeitura" | "unimed" | null;

export interface Comportamento {
  id: string;
  descricao: string;
}

export interface MotivosContinuidade {
  id: string;
  motivo: string;
}

export interface FormData {
  paciente: string;
  coordenadora: string;
  psicologo: string;
  introducao: string;
  comportamentos: Comportamento[];
  evolucao: {
    engajamento: string;
    afetividade: string;
    organizacao: string;
    crisesEResistencias: string;
    comunicacaoFuncional: string;
    coordenacaoMotora: string;
  };
  conclusao: string;
  motivosContinuidade: MotivosContinuidade[];
}
