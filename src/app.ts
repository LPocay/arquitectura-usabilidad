import { MapComandos, Accion } from "./types"
import { VerTODOs } from "./ver-todo-comando"
import { AgregarTODO } from "./agregar-todo-comando";
import { EliminarTODOs } from "./eliminar-todo-comando";
import { ModificarTODOs } from "./modificar-todo-comando";
import { DeshacerComando } from "./deshacer-comando";
import { pedirInputUsuario } from "./consola";

const historialAcciones: Accion[] = [];

export class App {
  private readonly ruta = 'todos.json'
  private readonly factory: MapComandos = {
    '1': new VerTODOs(this.ruta),
    '2': new AgregarTODO(this.ruta),
    '3': new ModificarTODOs(this.ruta, historialAcciones),
    '4': new EliminarTODOs(this.ruta, historialAcciones),
    '5': new DeshacerComando(this.ruta, historialAcciones),
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
