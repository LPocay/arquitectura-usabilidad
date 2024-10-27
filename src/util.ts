import { existsSync, readFileSync, writeFileSync } from 'fs';
import { TODO } from './types'

export function leerArchivo<T>(ruta: string) {
  const existeArchivo = existsSync(ruta);
  if (!existeArchivo) {
    writeFileSync(ruta, '[]');
    return [];
  }

  const contenido = readFileSync(ruta);
  const contenidoString = contenido.toString();
  const contenidoJson = JSON.parse(contenidoString);

  return contenidoJson as TODO[];
}

export function reescribirTODOs<T>(ruta: string, TODO: TODO[]): void {
  writeFileSync(ruta, JSON.stringify(TODO, null, 2), 'utf-8');
}
