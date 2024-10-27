import { Accion, AccionTipo, TODO } from './types';

export class HistorialAcciones {
  acciones: Accion[] = [];

  agregar(comando: AccionTipo, modificacion: TODO, indice?: number) {
    this.acciones.push({ comando, modificacion, indice })
  }

  sacarAccion(indice: number) {
    this.acciones = this.acciones.filter((_, i) => i !== indice)
  }

  mostrar() {
    this.acciones.forEach((accion, indice) => {
      console.log(`${indice + 1}) ${accion.comando} - ${accion.modificacion.titulo} ${accion.modificacion.estado}`)
    });
  }
}
