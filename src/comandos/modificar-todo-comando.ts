import { Comando } from './comando';
import { pedirInputUsuario } from '../consola';
import { HistorialAcciones } from '../historial-acciones';
import { AccionTipo, TODO, TODOEstados } from '../types';

type ModificarArg = {
  indice_a_modificar: number;
  nuevoTitulo: string;
  nuevoEstado: TODOEstados;
}

export class ModificarTODOs implements Comando {
  historialAcciones: HistorialAcciones;
  constructor(acciones: HistorialAcciones) {
    this.historialAcciones = acciones;
  }
  ejecutar(todos: TODO[], { indice_a_modificar, nuevoTitulo, nuevoEstado }: ModificarArg) {
    const totalTODOs = todos.length;
    if (indice_a_modificar < 0 || indice_a_modificar > totalTODOs) {
      throw new Error("Indice invalido");
    }

    const todoOriginal = todos[indice_a_modificar];
    const todosModificado = todos.map((todo, indice) => {
      if (indice === indice_a_modificar) {
        const todoMod: TODO = {
          titulo: nuevoTitulo,
          estado: nuevoEstado,
        }
        return todoMod;
      }
      return todo;
    });
    this.historialAcciones.agregar(AccionTipo.Modificar, todoOriginal, indice_a_modificar)
    return todosModificado;
  }

  async mostrar(todos: TODO[]) {
    console.log('Modificar TODO')
    console.log('-------------------------')
    todos.forEach((todo, indice) => {
      console.log(`${indice + 1}) ${todo.titulo} - ${todo.estado}`)
    })
    const indice = await pedirInputUsuario('TODO: ')
    const indice_a_modificar = parseInt(indice, 10) - 1;

    const nuevoTitulo = await this.pedirTitulo();
    const nuevoEstado = await this.pedirEstado();
    return { indice_a_modificar, nuevoTitulo, nuevoEstado } as ModificarArg;
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
