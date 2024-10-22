import {afterEach, describe, expect, jest, test} from '@jest/globals';
import {leerArchivo} from "./util";
import {TODO, TODOEstados} from "./types";
import {AgregarTODO} from "./agregar-todo-comando";
import {pedirInputUsuario} from "./consola";
import {unlinkSync} from "fs";

jest.mock('./consola', () => ({
  pedirInputUsuario: jest.fn(),
}));

const ruta: string = 'todo-test.json'
const unTitulo: string = 'Un titulo';
const preguntarMock = pedirInputUsuario as jest.MockedFunction<typeof pedirInputUsuario>

afterEach(() => {
  unlinkSync(ruta);
})

describe('agregar todo', () => {
  test('debería agregar un TODO a la lista de TODOs', async () => {
    preguntarMock.mockResolvedValue(unTitulo)

    await new AgregarTODO(ruta).ejecutar();

    const listaDeTODOs = leerArchivo<TODO>(ruta);
    expect(listaDeTODOs[0].titulo).toBe(unTitulo);
    expect(listaDeTODOs[0].estado).toBe(TODOEstados.SinEmpezar);
  })
})
