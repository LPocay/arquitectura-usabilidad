import { createInterface } from "readline"
import { MapComandos } from "./types"
import { VerTODOs } from "./ver-todo-comando"

export class App {
  factory: MapComandos = {
    '1': new VerTODOs()
  }
  constructor() { }

  async saludar() {
    console.log('Bienvenido a TODOapp')
    console.log('Que quieres hacer hoy?')

    console.log('1) Ver mi lista de TODOs')
    console.log('2) Agregar TODO')
    console.log('3) Modificar TODO')
    console.log('4) Eliminar TODO')

    const respuesta = await this.preguntar('Que quieres hacer?: ');
    this.factory[respuesta].ejecutar();
  }

  preguntar(pregunta: string): Promise<string> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve) => {
      rl.question(pregunta, (respuesta) => {
        rl.close();
        resolve(respuesta);
      })
    })
  }

}
