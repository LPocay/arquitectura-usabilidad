## Contexto
Debemos persistir en algún lado los TODOs del usuario para que pueda verlos luego de crearlos.

## Resolución
Decidimos persistirlos en un archivo json.

## Razones
Decidimos usar un archivo por la facilidad de implementación.

Elegimos json porque es un formato simple de leer usando node.

Una de las desventajas de esta implementación es su fragilidad.

## Alternativas
Evaluamos guardar en memoria, pero los datos se perderían con cada reinicio de la aplicación

También pensamos en usar una base de datos, pero hubiese requerido más tiempo de implementación, además de otro tipo de infraestructura.



[Volver al README](../../README.md)
