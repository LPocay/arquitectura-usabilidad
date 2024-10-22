import { TODO } from "./types";

export interface Comando {
  ejecutar(todos: TODO[], ...arg: any): TODO[];
}
