import { Comando } from "./comando";
import { pedirInputUsuario } from "./consola";
import { HistorialAcciones } from "./historial-acciones";
import { Accion, AccionTipo, TODO } from "./types";

type DeshacerArgs = {
  accion: Accion,
  indice_deshacer: number,
}

export class DeshacerComando implements Comando {
  historialAcciones: HistorialAcciones;

  constructor(acciones: HistorialAcciones) {
    this.historialAcciones = acciones;
  }

  ejecutar(todos: TODO[], { accion, indice_deshacer }: DeshacerArgs) {
    const todosModificado = this.deshacerAccion(todos, accion);
    this.historialAcciones.sacarAccion(indice_deshacer);
    return todosModificado;
  }

  mostrar(_: TODO[]) {
    if (this.historialAcciones.acciones.length === 0) {
      console.log('No tienes cambios para deshacer');
      return;
    }

    if (this.historialAcciones.acciones.length === 1) {
      return { accion: this.historialAcciones.acciones[0], indice_deshacer: 0 };
    }

    return this.mostrarCambios()
  }

  async mostrarCambios() {
    console.log('Cambios disponibles');
    this.historialAcciones.mostrar()
    const indice = await pedirInputUsuario('Cambio: ')
    const indice_deshacer = parseInt(indice, 10) - 1;
    if (indice_deshacer < 0 || indice_deshacer > this.historialAcciones.acciones.length - 1) {
      throw new Error("Indice invalido");
    }

    const accion = this.historialAcciones.acciones[indice_deshacer];
    return { accion, indice_deshacer } as DeshacerArgs;
  }

  deshacerEliminar(todos: TODO[], accion: Accion) {
    const todosModificados = todos.concat(accion.modificacion);
    return todosModificados;
  }

  deshacerModificar(todos: TODO[], accion: Accion) {
    if (accion.indice === undefined) return todos;
    const todosMoficados = todos.map((todo, indice) => {
      if (indice === accion.indice) {
        return accion.modificacion;
      }
      return todo;
    });
    return todosMoficados;
  }

  deshacerAccion(todos: TODO[], accion: Accion) {
    if (accion.comando === AccionTipo.Eliminar) {
      return this.deshacerEliminar(todos, accion)
    }
    if (accion.comando === AccionTipo.Modificar) {
      return this.deshacerModificar(todos, accion)
    }
    return todos;
  }
}
