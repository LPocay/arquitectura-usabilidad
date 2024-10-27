# Arquitectura Usabilidad

## Objetivo del proyecto
Este proyecto está diseñado para implementar y demostrar patrones de usabilidad en arquitecturas de software, enfocado en el uso del patrón "Undo".

### Implementación
A modo de ejemplo, implementamos una aplicación de TODOs que se ejecuta en la consola y, en última instancia, edita archivos JSON mediante una línea de comandos en NodeJS.

![Vista de runtime](./documentacion/diagramas/vista-runtime.png)

Las funcionalidades principales son:
- Ver todos los TODOs
- Agregar un TODO
- Modificar un TODO
- Eliminar un TODO
- Deshacer un cambio

Sobre el último punto, es importante destacar que el sistema permite al usuario retornar a un estado anterior a cuando se ejecutó una operación. Además, le permite deshacer los cambios en varios niveles. 
Esto significa que si el usuario ha realizado más de un cambio, puede elegir cuál de todos ellos quiere deshacer.

### Documentación

Registramos las principales decisiones de arquitectura tomadas por el equipo.

- [Elección de la tecnología](./documentacion/adr/eleccion-tecnologia.md)
- [Elección de la capa de presentación](./documentacion/adr/eleccion-capa-presentacion.md)
- [Elección del tipo de persistencia](./documentacion/adr/eleccion-persistencia.md)


## Tecnologías Usadas

- NodeJS
- CucumberJS

## Pre-requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [NodeJS](https://nodejs.org/en) versión 20.18.0

## Instalación

Clona el repositorio e instala la dependencias:

```bash
git clone https://github.com/LPocay/arquitectura-usabilidad.git
cd arquitectura-usabilidad
npm ci
```

Correr los test:
```bash
npm run test
```

Correr la App:
```bash
npm run dev
```


## Autores

- [Sergio Daniel Risposi](https://github.com/srisposi)
- [Belén Fernandez Navarro](https://github.com/menosbel)
- [Luigi Pocay](https://github.com/LPocay)
