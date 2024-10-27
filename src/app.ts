import { MapComandos, TODO } from "./types"
import { VerTODOs } from "./comandos/ver-todo-comando"
import { AgregarTODO } from "./comandos/agregar-todo-comando";
import { EliminarTODOs } from "./comandos/eliminar-todo-comando";
import { ModificarTODOs } from "./comandos/modificar-todo-comando";
import { DeshacerComando } from "./comandos/deshacer-comando";
import { HistorialAcciones } from "./historial-acciones";
import { pedirInputUsuario } from "./consola";
import { leerArchivo, reescribirTODOs } from "./util";

const historialAcciones = new HistorialAcciones();

export class App {
  private readonly ruta = 'todos.json'
  private readonly factory: MapComandos = {
    '1': new VerTODOs(),
    '2': new AgregarTODO(),
    '3': new ModificarTODOs(historialAcciones),
    '4': new EliminarTODOs(historialAcciones),
    '5': new DeshacerComando(historialAcciones),
  }
  private todos: TODO[];

  constructor() {
    this.todos = leerArchivo(this.ruta);
  }

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
      const args = await this.factory[respuesta].mostrar(this.todos);
      if (args || args === 0) {
        const todosModificados = this.factory[respuesta].ejecutar(this.todos, args);
        reescribirTODOs(this.ruta, todosModificados);
        this.todos = todosModificados;
      }
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
