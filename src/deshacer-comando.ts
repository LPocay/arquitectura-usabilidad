import { Comando } from "./comando";
import { pedirInputUsuario } from "./consola";
import { Accion } from "./types";
import { escribirTODO, leerArchivo, reescribirTODOs } from "./util";

export class DeshacerComando implements Comando {
  acciones: Accion[];
  ruta: string;

  constructor(ruta: string, acciones: Accion[]) {
    this.ruta = ruta;
    this.acciones = acciones;
  }

  async ejecutar() {
    if (this.acciones.length === 0) {
      console.log('No tienes cambios para deshacer');
      return;
    }

    if (this.acciones.length === 1) {
      const accion = this.acciones[0];
      this.deshacerAccion(accion);
      console.log('Tu cambio se ha hecho con exito');
      this.acciones = [];
      return;
    }

    await this.mostrarCambios();
  }

  async mostrarCambios() {
    console.log('Cambios disponibles');
    this.acciones.forEach((accion, indice) => {
      console.log(`${indice + 1}) ${accion.comando} - ${accion.modificacion.titulo} ${accion.modificacion.estado}`)
    });
    const indice = await pedirInputUsuario('Cambio: ')
    const indice_deshacer = parseInt(indice, 10) - 1;
    if (indice_deshacer < 0 || indice_deshacer > this.acciones.length - 1) {
      throw new Error("Indice invalido");
    }

    const accion = this.acciones[indice_deshacer];
    this.deshacerAccion(accion);
    this.acciones = this.acciones.filter((_, indice) => indice !== indice_deshacer)
  }

  deshacerEliminar(accion: Accion) {
    escribirTODO(this.ruta, accion.modificacion);
  }

  deshacerModificar(accion: Accion) {
    const todos = leerArchivo(this.ruta);
    if (accion.indice === undefined) return;
    todos[accion.indice] = accion.modificacion;
    reescribirTODOs(this.ruta, todos);
  }

  deshacerAccion(accion: Accion) {
    if (accion.comando === 'eliminar') {
      this.deshacerEliminar(accion)
    }
    if (accion.comando === 'modificar') {
      this.deshacerModificar(accion)
    }
  }
}
