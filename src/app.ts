import {MapComandos} from "./types"
import {VerTODOs} from "./ver-todo-comando"
import {AgregarTODO} from "./agregar-todo-comando";
import {preguntar} from "./consola";

export class App {
  private readonly ruta = 'todos.json'
  private readonly factory: MapComandos = {
    '1': new VerTODOs(this.ruta),
    '2': new AgregarTODO(this.ruta),
  }
  constructor() { }

  async saludar() {
    console.log('Bienvenido a TODOapp')
    console.log('Que quieres hacer hoy?')

    console.log('1) Ver mi lista de TODOs')
    console.log('2) Agregar TODO')
    console.log('3) Modificar TODO')
    console.log('4) Eliminar TODO')
    console.log('5) Deshacer')

    const respuesta = await preguntar('Que quieres hacer?: ');
    this.factory[respuesta].ejecutar();
  }
}
