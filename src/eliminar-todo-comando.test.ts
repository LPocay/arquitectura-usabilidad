import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { EliminarTODOs } from './eliminar-todo-comando';
import { AgregarTODO } from './agregar-todo-comando';
import { pedirInputUsuario } from './consola';
import { leerArchivo } from './util';
import { unlinkSync } from 'fs';
import { beforeEach } from 'node:test';


jest.mock('./consola', () => ({
  pedirInputUsuario: jest.fn(),
}));
const preguntarMock = pedirInputUsuario as jest.MockedFunction<typeof pedirInputUsuario>
const ruta = 'todo_test.json';

describe('Eliminar TODOs', () => {

  beforeEach(() => {
    unlinkSync(ruta);
  })
  afterEach(() => {
    unlinkSync(ruta);
  })
  test('Eliminar TODO de lista de TODO', async () => {
    const comandoAgregar = new AgregarTODO(ruta);
    preguntarMock.mockResolvedValue("Test todo");
    await comandoAgregar.ejecutar()

    const comandoEliminar = new EliminarTODOs(ruta);

    preguntarMock.mockResolvedValue("1");
    await comandoEliminar.ejecutar();

    const todosModificados = leerArchivo(ruta);
    expect(todosModificados.length).toEqual(0);
  });

  test('Eliminar TODO de lista con indice invalido', async () => {
    const comandoAgregar = new AgregarTODO(ruta);
    preguntarMock.mockResolvedValue("Test todo");
    await comandoAgregar.ejecutar()

    const comandoEliminar = new EliminarTODOs(ruta);

    preguntarMock.mockResolvedValue("2");
    expect(comandoEliminar.ejecutar()).rejects.toThrowError("Indice invalido");

    preguntarMock.mockResolvedValue("-1");
    expect(comandoEliminar.ejecutar()).rejects.toThrowError("Indice invalido");
  });
});
