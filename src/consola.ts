import {createInterface} from "readline";

export function preguntar(pregunta: string): Promise<string> {
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