import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { TODO, TODOEstados } from '../../src/types';
import { ModificarTODOs } from '../../src/comandos/modificar-todo-comando';
import { HistorialAcciones } from '../../src/historial-acciones';

Given('El usuario con un TODO guardado que quiere modificar', function() {
  const todos: TODO[] = [
    {
      titulo: "TODO test",
      estado: TODOEstados.Completo,
    }
  ];
  this.todos = todos;
  this.comandoModificar = new ModificarTODOs(new HistorialAcciones());
});

When('elige el TODO valido a modificar', function() {
  this.indice_modificar = 0;
});

Then('escribe el nuevo titulo {string} y nuevo estado {string}', function(titulo, estado) {
  this.titulo = titulo;
  this.estado = Object.values(TODOEstados)[parseInt(estado, 10) - 1]
});

Then('el TODO es modificado', function() {
  const args = {
    indice_a_modificar: this.indice_modificar,
    nuevoTitulo: this.titulo,
    nuevoEstado: this.estado
  }
  const todosModificados = this.comandoModificar.ejecutar(this.todos, args);
  assert.strictEqual(todosModificados.length, 1);
  assert.strictEqual(todosModificados[0].titulo, "Nuevo titulo");
  assert.strictEqual(todosModificados[0].estado, TODOEstados.EnProceso);
});

When('elige el TODO invalido a modificar', function() {
  this.indice_modificar = 1;
});

Then('obtiene un mensaje de error al intentar modificar', function() {
  try {
    const args = {
      indice_a_modificar: this.indice_modificar,
      nuevoTitulo: this.titulo,
      nuevoEstado: this.estado
    }
    this.comandoModificar.ejecutar(this.todos, args);
  } catch (e: any) {
    assert.strictEqual(e.message, "Indice invalido")
  }
});
