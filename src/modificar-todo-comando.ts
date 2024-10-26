import { Comando } from './comando';
import { pedirInputUsuario } from './consola';
import { TODO, TODOEstados } from './types';
import { eliminarTODO, leerArchivo } from './util';

export class MoficarTODOs implements Comando {
  ruta: string;
  constructor(ruta: string) {
    this.ruta = ruta;
  }
  async ejecutar(): Promise<void> {
    const todos = leerArchivo(this.ruta);
    const totalTODOs = todos.length;
    console.log('Modificar TODO')
    console.log('-------------------------')
    todos.forEach((todo, indice) => {
      console.log(`${indice + 1}) ${todo.titulo} - ${todo.estado}`)
    })
    const indice = await pedirInputUsuario('TODO: ')
    const indice_modificar = parseInt(indice, 10) - 1;
    if (indice_modificar < 0 || indice_modificar > totalTODOs) {
      throw new Error("Indice invalido");
    }

    const nuevoTitulo = await this.pedirTitulo();
    const nuevoEstado = await this.pedirEstado();

    const todosModificado = todos.map((todo, indice) => {
      if (indice === indice_modificar) {
        const todoMod: TODO = {
          titulo: nuevoTitulo,
          estado: nuevoEstado,
        }
        return todoMod;
      }
      return todo;
    });
    eliminarTODO(this.ruta, todosModificado);
  }

  async pedirTitulo() {
    const titulo = await pedirInputUsuario('Nuevo titulo: ')
    return titulo;
  }

  async pedirEstado(): Promise<TODOEstados> {
    console.log('Posibles estados')
    console.log('-------------------------')
    Object.keys(TODOEstados).forEach((estado, indice) => {
      console.log(`${indice + 1}) ${estado}`);
    })
    const estado = await pedirInputUsuario('Nuevo estado: ')
    const indice = parseInt(estado) - 1;
    if (indice < 0 || indice > Object.keys(TODOEstados).length - 1) {
      throw new Error("Indice invalido");
    }
    return Object.values(TODOEstados)[indice];
  }
}
