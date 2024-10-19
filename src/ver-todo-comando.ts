import { Comando } from './comando';
import { TODO } from './types';
import { leerArchivo } from './util';

export class VerTODOs implements Comando {
  ejecutar() {
    const contenido = leerArchivo<TODO>('todos.json');
    contenido.forEach((todo) => {
      console.log(`Titulo: ${todo.titulo}.  Estado: ${todo.estado}`);
    })
  }
}
