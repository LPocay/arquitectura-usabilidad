Feature: Eliminar TODOs

  Scenario: Como usuario quiero eliminar un TODO existente
    Given El usuario con un TODO guardado
    When elige el TODO valido a eliminar
    Then el TODO es eliminado

  Scenario: Como usuario quiero eliminar un TODO no existente
    Given El usuario con un TODO guardado
    When elige el TODO invalido a eliminar
    Then obtiene un mensaje de error
