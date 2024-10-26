import { Comando } from "./comando";
import { Accion } from "./types";
import { escribirTODO, leerArchivo, reescribirTODOs } from "./util";

export class DeshacerComando implements Comando {
  acciones: Accion[];
  ruta: string;

  constructor(ruta: string, acciones: Accion[]) {
    this.ruta = ruta;
    this.acciones = acciones;
  }

  ejecutar() {
    if (this.acciones.length === 0) {
      console.log('No tienes cambios para deshacer');
      return;
    }

    if (this.acciones.length === 1) {
      const accion = this.acciones[0];
      if (accion.comando === 'eliminar') {
        escribirTODO(this.ruta, accion.modificacion);
      }
      if (accion.comando === 'modificar') {
        const todos = leerArchivo(this.ruta);
        if (!accion.indice) return;
        todos[accion.indice] = accion.modificacion;
        reescribirTODOs(this.ruta, todos);
      }
      console.log('Tu cambio se ha hecho con exito');
      this.acciones = [];
    }
  }
}
