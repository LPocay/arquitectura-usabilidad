import { Given, When, Then } from '@cucumber/cucumber';
import { TODO, TODOEstados } from '../../src/types';
import assert from 'assert';
import { EliminarTODOs } from '../../src/eliminar-todo-comando';
import { HistorialAcciones } from '../../src/historial-acciones';

Given('El usuario con un TODO guardado', async function() {
  const todos: TODO[] = [
    {
      titulo: "TODO test",
      estado: TODOEstados.SinEmpezar,
    }
  ];
  this.todos = todos;
  this.comandoEliminar = new EliminarTODOs(new HistorialAcciones());
});

When('elige el TODO valido a eliminar', function() {
  this.indice_eliminar = 0;
});

Then('el TODO es eliminado', function() {
  const todosModificados = this.comandoEliminar.ejecutar(this.todos, this.indice_eliminar);
  assert.strictEqual(todosModificados.length, 0)
});

When('elige el TODO invalido a eliminar', function() {
  this.indice_eliminar = 1;
});
Then('obtiene un mensaje de error', function() {
  try {
    this.comandoEliminar.ejecutar(this.todos, this.indice_eliminar);
  } catch (e: any) {
    assert.strictEqual(e.message, "Indice invalido")
  }
});
