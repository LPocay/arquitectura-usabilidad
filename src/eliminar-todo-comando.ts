import { Comando } from './comando';
import { pedirInputUsuario } from './consola';
import { eliminarTODO, leerArchivo } from './util';

export class EliminarTODOs implements Comando {
  ruta: string;
  constructor(ruta: string) {
    this.ruta = ruta;
  }
  async ejecutar(): Promise<void> {
    const todos = leerArchivo(this.ruta);
    const totalTODOs = todos.length;
    console.log('Eliminar TODO')
    console.log('-------------------------')
    todos.forEach((todo, indice) => {
      console.log(`${indice + 1}) ${todo.titulo} - ${todo.estado}`)
    })
    const indice = await pedirInputUsuario('TODO: ')
    const indice_eliminar = parseInt(indice, 10) - 1;
    if (indice_eliminar < 0 || indice_eliminar > totalTODOs - 1) {
      throw new Error("Indice invalido");
    }
    const todosModificados = todos.filter((_, i) => i !== indice_eliminar);
    eliminarTODO(this.ruta, todosModificados);
  }
}
