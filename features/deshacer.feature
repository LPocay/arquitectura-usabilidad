Feature: Deshacer

  Scenario: Como usuario quiero recuperar un TODO que elimine
    Given un usuario con TODOS guardados
    When elimina el primer TODO de la lista
    And deshace la accion
    Then deberia recuper el TODO eliminado

  Scenario: Como usuario quiero recuperar un TODO que modifique
    Given un usuario con TODOS guardados
    When modifico el primer TODO de la lista
    And deshace la accion
    Then deberia recuper el TODO modificado
