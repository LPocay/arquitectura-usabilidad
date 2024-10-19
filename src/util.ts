import { existsSync, readFileSync, writeFileSync } from 'fs';

export function leerArchivo<T>(ruta: string) {
  const existeArchivo = existsSync(ruta);
  if (!existeArchivo) {
    writeFileSync(ruta, '[]');
    return [];
  }

  const contenido = readFileSync(ruta);
  const contenidoString = contenido.toString();
  const contenidoJson = JSON.parse(contenidoString);

  return contenidoJson as T[];
}
