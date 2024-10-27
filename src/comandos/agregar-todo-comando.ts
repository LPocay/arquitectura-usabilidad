import { Comando } from "./comando";
import { pedirInputUsuario } from "../consola";
import { TODO, TODOEstados } from "../types"

export class AgregarTODO implements Comando {
  ejecutar(todos: TODO[], titulo: string) {
    const todo: TODO = {
      titulo: titulo,
      estado: TODOEstados.SinEmpezar
    }
    return todos.concat(todo);
  }

  async mostrar(_: TODO[]) {
    console.log('Agregar un nuevo TODO')
    console.log('-------------------------')
    const titulo = await pedirInputUsuario('Título: ')
    return titulo;
  }

}
