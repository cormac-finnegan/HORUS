Feature: register a new visitor via the National Park Ranger

  Scenario Outline: As a National Park Ranger I want to register a new visitor
    Given the user is logged in as a National Park Ranger
    And the user set the username '<userId>'
    And the user set the password '<password>'
    When the user logs in the application
    Then the user is redirected to the Welcome page

    Examples:
      | userId | password |
      | test  | test  |
