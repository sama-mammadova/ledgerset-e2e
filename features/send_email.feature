Feature: Send email

  Scenario: feature1
    Given the User logged in to the system
    When the User navigated to the Postal Service Page
    Then the menu options are available: "Вхідні, Відправлені, Чернетки, Видалені, Спам"
    When the User click on the "Створити листа" link
    Then the "Створити листа" page is displayed properly
    When the User fills all required information for the letter
    When the User clicks "Надіслати"
    Then the email is successfully sent