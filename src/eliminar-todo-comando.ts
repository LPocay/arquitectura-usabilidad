import { Comando } from './comando';
import { TODO } from './types';

export class EliminarTODOs implements Comando {
  ejecutar(todos: TODO[], indice_eliminar: number): TODO[] {
    const totalTODOs = todos.length;
    if (indice_eliminar < 0 || indice_eliminar > totalTODOs - 1) {
      throw new Error("Indice invalido");
    }
    const todosModificados = todos.filter((_, i) => i !== indice_eliminar);
    return todosModificados;
  }
}
