Feature: login - The the user login

  Scenario Outline: SC01.Check the user can login into the application
    Given the user is in the Login page
    And the user set the username '<userId>'
    And the user set the password '<password>'
    When the user logs in the application
    Then the user is redirected to the Welcome page

    Examples:
      | userId | password |
      | test  | test  |
