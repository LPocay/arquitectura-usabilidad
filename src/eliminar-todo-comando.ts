import { Comando } from './comando';
import { TODO } from './types';

export class EliminarTODOs implements Comando {
  ejecutar(todos: TODO[], indice_eliminar: number): TODO[] {
    const todosModificados = todos.filter((_, i) => i !== indice_eliminar);
    return todosModificados;
  }
}
