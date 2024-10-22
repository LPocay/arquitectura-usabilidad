import {Comando} from "./comando";
import {escribirArchivo} from "./util";
import {preguntar} from "./consola";
import {TODO, TODOEstados} from "./types"

export class AgregarTODO implements Comando {
    private readonly ruta;

    constructor(ruta: string) {
        this.ruta = ruta;
    }

    async ejecutar(): Promise<void> {
        console.log('Vamos a crear un nuevo TODO')
        const titulo = await preguntar('Título: ')
        const TODO: TODO = {
            titulo: titulo,
            estado: TODOEstados.SinEmpezar
        }
        escribirArchivo(this.ruta, TODO);
    }
}