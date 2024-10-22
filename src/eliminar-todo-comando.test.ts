import { describe, expect, test } from '@jest/globals';
import { EliminarTODOs } from './eliminar-todo-comando';
import { TODO, TODOEstados } from './types';


describe('Eliminar TODOs', () => {

  test('Eliminar TODO de archivo que contiene un TODO', () => {
    const todos: TODO[] = [
      {
        titulo: "Primer TODO",
        estado: TODOEstados.SinEmpezar,
      }
    ];
    const comandoEliminar = new EliminarTODOs();
    const indice_eliminar = 0;

    const todosModificado = comandoEliminar.ejecutar(todos, indice_eliminar);
    expect(todosModificado.length).toEqual(0);
  });

});
