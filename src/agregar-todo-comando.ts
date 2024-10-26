import {Comando} from "./comando";
import {escribirArchivo} from "./util";
import {pedirInputUsuario} from "./consola";
import {TODO, TODOEstados} from "./types"

export class AgregarTODO implements Comando {
    private readonly ruta;

    constructor(ruta: string) {
        this.ruta = ruta;
    }

    async ejecutar(): Promise<void> {
        console.log('Agregar un nuevo TODO')
        console.log('-------------------------')
        const titulo = await pedirInputUsuario('Título: ')
        const TODO: TODO = {
            titulo: titulo,
            estado: TODOEstados.SinEmpezar
        }
        escribirArchivo(this.ruta, TODO);
    }
}