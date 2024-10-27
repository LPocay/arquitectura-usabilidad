Feature: Agregar TODOs

  Scenario: Como usuario quiero agregar un TODO por primera vez
    Given El usuario sin ningun TODO
    When escribe el TODO con titulo "Test TODO"
    Then el TODO es guardado

  Scenario: Como usuario quiero agregar un TODO con TODOS ya existentes
    Given El usuario con TODOs existentes
    When escribe el TODO con titulo "Test TODO"
    Then el TODO es guardado preservando los existentes
