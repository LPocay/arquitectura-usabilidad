import { Comando } from './comandos/comando';

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

export type Accion = {
  comando: AccionTipo;
  modificacion: TODO;
  indice?: number;
}

export enum AccionTipo {
  Eliminar = 'Eliminado',
  Modificar = 'Modificado'
}
