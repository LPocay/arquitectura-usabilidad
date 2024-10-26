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

export function escribirArchivo<T>(ruta: string, TODO: TODO): void {
  const data: TODO[] = leerArchivo<T>(ruta);

  data.push(TODO);

  writeFileSync(ruta, JSON.stringify(data, null, 2), 'utf-8');
}
