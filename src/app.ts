import {MapComandos} from "./types"
import {VerTODOs} from "./ver-todo-comando"
import {AgregarTODO} from "./agregar-todo-comando";
import {pedirInputUsuario} from "./consola";

export class App {
  private readonly ruta = 'todos.json'
  private readonly factory: MapComandos = {
    '1': new VerTODOs(this.ruta),
    '2': new AgregarTODO(this.ruta),
  }
  constructor() { }

  async ejecutar() {
    this.saludar();
    await this.interactuarConElUsuario();
  }

  private async interactuarConElUsuario() {
    let salir = false;

    while (!salir) {
      this.mostrarMenuPrincipal()
      const respuesta = await pedirInputUsuario('Que quieres hacer?: ');

      console.log("\n".repeat(2))
      if (respuesta === "6") {
        salir = true;
        return;

      }
      await this.factory[respuesta].ejecutar();
    }
  }

  private mostrarMenuPrincipal() {
    console.log("\n")
    console.log('Que quieres hacer hoy?')
    console.log('-------------------------')
    console.log('1) Ver mi lista de TODOs')
    console.log('2) Agregar TODO')
    console.log('3) Modificar TODO')
    console.log('4) Eliminar TODO')
    console.log('5) Deshacer')
    console.log('6) Salir')
  }

  private saludar() {
    console.log('Bienvenido a TODOapp')
  }
}
