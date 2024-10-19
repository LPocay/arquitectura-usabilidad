import { Comando } from './comando';

export enum TODOEstados {
  Completo = 'Completo',
  EnProceso = 'EnProceso',
  SinEmpezar = 'SinEmpezar',
}

export type TODO = {
  titulo: string;
  estado: TODOEstados;
}

export type MapComandos = {
  [key: string]: Comando
}
