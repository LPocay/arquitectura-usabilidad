import { Given, When, Then } from '@cucumber/cucumber';
import { TODOEstados } from '../../src/types';
import assert from 'assert';
import { AgregarTODO } from '../../src/agregar-todo-comando';

Given('El usuario sin ningun TODO', function() {
  this.todos = [];
  this.agregarComando = new AgregarTODO();
});

When('escribe el TODO con titulo {string}', function(titulo: string) {
  this.titulo = titulo;
});

Then('el TODO es guardado', function() {
  const todosModificados = this.agregarComando.ejecutar(this.todos, this.titulo);
  assert.strictEqual(todosModificados.length, 1);
  assert.strictEqual(todosModificados[0].titulo, "Test TODO")
  assert.strictEqual(todosModificados[0].estado, TODOEstados.SinEmpezar);
});

Given('El usuario con TODOs existentes', function() {
  this.todos = [
    {
      titulo: 'TODO existente',
      estado: TODOEstados.EnProceso
    }
  ];
  this.agregarComando = new AgregarTODO();
});

Then('el TODO es guardado preservando los existentes', function() {
  const todosModificados = this.agregarComando.ejecutar(this.todos, this.titulo);
  assert.strictEqual(todosModificados.length, 2);
  assert.strictEqual(todosModificados[0].titulo, "TODO existente")
  assert.strictEqual(todosModificados[0].estado, TODOEstados.EnProceso);
  assert.strictEqual(todosModificados[1].titulo, "Test TODO")
  assert.strictEqual(todosModificados[1].estado, TODOEstados.SinEmpezar);
});
