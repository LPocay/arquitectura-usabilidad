Feature: Modificar TODOs

  Scenario: Como usuario quiero modificar un TODO existente
    Given El usuario con un TODO guardado que quiere modificar
    When elige el TODO valido a modificar
    Then escribe el nuevo titulo "Nuevo titulo" y nuevo estado "2"
    Then el TODO es modificado

  Scenario: Como usuario quiero modificar un TODO inexistente
    Given El usuario con un TODO guardado que quiere modificar
    When elige el TODO invalido a modificar
    Then obtiene un mensaje de error al intentar modificar
