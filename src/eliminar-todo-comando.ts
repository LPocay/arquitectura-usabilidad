import { Comando } from './comando';
import { pedirInputUsuario } from './consola';
import { HistorialAcciones } from './historial-acciones';
import { AccionTipo, TODO } from './types';

export class EliminarTODOs implements Comando {
  historialAcciones: HistorialAcciones;
  constructor(acciones: HistorialAcciones) {
    this.historialAcciones = acciones;
  }
  ejecutar(todos: TODO[], indice_a_eliminar: number) {
    const totalTODOs = todos.length;
    if (indice_a_eliminar < 0 || indice_a_eliminar > totalTODOs - 1) {
      throw new Error("Indice invalido");
    }
    const todosModificados = todos.filter((_, i) => i !== indice_a_eliminar);
    this.historialAcciones.agregar(AccionTipo.Eliminar, todos[indice_a_eliminar])
    return todosModificados;
  }

  async mostrar(todos: TODO[]) {
    console.log('Eliminar TODO')
    console.log('-------------------------')
    todos.forEach((todo, indice) => {
      console.log(`${indice + 1}) ${todo.titulo} - ${todo.estado}`)
    })
    const indice = await pedirInputUsuario('TODO: ')
    const indice_modificar = parseInt(indice, 10) - 1;
    return indice_modificar;
  }
}
