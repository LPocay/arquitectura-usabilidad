import { TODO } from "../types";

export interface Comando {
  ejecutar(todos: TODO[], ...args: any): TODO[];
  mostrar(todos: TODO[]): any;
}
