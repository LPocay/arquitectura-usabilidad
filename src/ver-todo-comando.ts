import { Comando } from './comando';
import { TODO } from './types';
import { leerArchivo } from './util';

export class VerTODOs implements Comando {
  private readonly ruta;

  constructor(ruta: string) {
    this.ruta = ruta;
  }

  ejecutar() {
    const contenido = leerArchivo<TODO>(this.ruta);
    contenido.forEach((todo) => {
      console.log(`Titulo: ${todo.titulo}.  Estado: ${todo.estado}`);
    })
  }
}
