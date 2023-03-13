const { Given, When, Then } = require("@cucumber/cucumber");

Given('the User logged in to the system', async function() {
    await this.openUrl('https://i.ua/')
    await this.page.click('text=Вхід')
    let username = process.env.IUA_USERNAME
    let password = process.env.IUA_PASSWORD
    await this.page.type('form[name="lFloat"] input[name="login"]', username)
    await this.page.type('form[name="lFloat"] input[name="pass"]', password)
    await this.page.click('form[name="lFloat"] > input[value="Увійти"]')
})

When('the User navigated to the Postal Service Page', async function() {
    await this.page.waitForSelector('a[title="Пошта"]')
    await this.page.click('a[title="Пошта"]')
})

Then('the menu options are available: "Вхідні, Відправлені, Чернетки, Видалені, Спам"', async function() {
    await this.page.locator('[href^="/list/INBOX"]').isVisible()
    await this.page.locator('[href^="/list/sent-mail"]').isVisible()
    await this.page.locator('[href^="/list/drafts"]').isVisible()
    await this.page.locator('[href^="/list/Trash"]').isVisible()
    await this.page.locator('[href^="/list/Spam"]').isVisible()
})

When('the User click on the "Створити листа" link', async function() {
    await this.page.waitForSelector('[href^="/compose"]')
    await this.page.locator('[href^="/compose"]').first().click()
})

Then('the "Створити листа" page is displayed properly', async function() {
    await this.page.locator('.text_editor_browser').isVisible()
})

When('the User fills all required information for the letter', async function() {
    await this.page.locator('textarea#to').type('test@email.com')
    await this.page.locator('input[name="subject"]').type('test subject')
    await this.page.locator('textarea#text').type('test message')
})

When('the User clicks "Надіслати"', async function() {
    await this.page.locator('input[name="send"]').first().click()
})

Then('the email is successfully sent', {timeout: 5000}, async function() {
    await this.page.waitForSelector('.block_confirmation');
    await this.page.getByText('Лист успішно відправлено адресатам').isVisible()
})
