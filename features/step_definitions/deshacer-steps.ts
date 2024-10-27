import { Given, When, Then } from '@cucumber/cucumber';
import { TODOEstados } from '../../src/types';
import assert from 'assert';
import { DeshacerComando } from '../../src/deshacer-comando';
import { HistorialAcciones } from '../../src/historial-acciones';
import { EliminarTODOs } from '../../src/eliminar-todo-comando';
import { ModificarTODOs } from '../../src/modificar-todo-comando';

Given('un usuario con TODOS guardados', function() {
  this.todos = [
    {
      titulo: 'TODO 1',
      estado: TODOEstados.EnProceso
    }
  ];
  this.historialAcciones = new HistorialAcciones();
  this.deshacerComando = new DeshacerComando(this.historialAcciones);
  this.eliminarComando = new EliminarTODOs(this.historialAcciones);
  this.modificarComando = new ModificarTODOs(this.historialAcciones);
});

When('elimina el primer TODO de la lista', function() {
  this.todos = this.eliminarComando.ejecutar(this.todos, 0);
});

When('deshace la accion', function() {
  this.todos = this.deshacerComando.ejecutar(this.todos, { accion: this.historialAcciones.acciones[0], indice_deshacer: 0 });
});

Then('deberia recuper el TODO eliminado', function() {
  assert.strictEqual(this.todos.length, 1);
  assert.strictEqual(this.todos[0].titulo, 'TODO 1');
  assert.strictEqual(this.todos[0].estado, TODOEstados.EnProceso);
});

When('modifico el primer TODO de la lista', function() {
  const args = {
    indice_a_modificar: 0,
    nuevoTitulo: 'TODO 2',
    nuevoEstado: TODOEstados.Completo,
  }
  this.todos = this.modificarComando.ejecutar(this.todos, args);
});

Then('deberia recuper el TODO modificado', function() {
  assert.strictEqual(this.todos.length, 1);
  assert.strictEqual(this.todos[0].titulo, 'TODO 1');
  assert.strictEqual(this.todos[0].estado, TODOEstados.EnProceso);
});
