import { Comando } from './comando';
import { TODO } from '../types';

export class VerTODOs implements Comando {
  ejecutar() {
    return [];
  }

  mostrar(todos: TODO[]) {
    console.log('Ver todos mis TODOs')
    console.log('-------------------------')
    todos.forEach((todo) => {
      console.log(`Titulo: ${todo.titulo}.  Estado: ${todo.estado}`);
    })
  }
}
