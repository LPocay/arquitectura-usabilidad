import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { MoficarTODOs } from './modificar-todo-comando';
import { AgregarTODO } from './agregar-todo-comando';
import { pedirInputUsuario } from './consola';
import { leerArchivo } from './util';
import { unlinkSync } from 'fs';
import { beforeEach } from 'node:test';
import { TODOEstados } from './types';


jest.mock('./consola', () => ({
  pedirInputUsuario: jest.fn(),
}));

const preguntarMock = pedirInputUsuario as jest.MockedFunction<typeof pedirInputUsuario>
const ruta = 'todo_test.json';

describe('Modificar TODOs', () => {

  beforeEach(() => {
    unlinkSync(ruta);
  })
  afterEach(() => {
    try {
      unlinkSync(ruta);
    } catch { }
  })

  test('Modificar TODO de lista de TODO', async () => {
    const tituloModificado = 'Titulo modificado';
    const estadoModificado = TODOEstados.Completo;
    const comandoAgregar = new AgregarTODO(ruta);
    preguntarMock.mockResolvedValue("Test todo");
    await comandoAgregar.ejecutar()

    const comandoModificar = new MoficarTODOs(ruta);

    preguntarMock.mockResolvedValue("1");
    jest.spyOn(comandoModificar, 'pedirTitulo').mockImplementation(async () => tituloModificado)
    jest.spyOn(comandoModificar, 'pedirEstado').mockImplementation(async () => estadoModificado)
    await comandoModificar.ejecutar();

    const todosModificados = leerArchivo(ruta);
    expect(todosModificados.length).toBe(1);
    expect(todosModificados[0].titulo).toEqual(tituloModificado);
    expect(todosModificados[0].estado).toEqual(estadoModificado);
  });
  test('Elegir un estado invalido', async () => {
    const comandoModificar = new MoficarTODOs(ruta);

    preguntarMock.mockResolvedValue("5");
    expect(comandoModificar.pedirEstado()).rejects.toThrowError('Indice invalido')
  });
});
