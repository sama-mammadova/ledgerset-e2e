const {setWorldConstructor} = require("@cucumber/cucumber");
const playwright = require('playwright');
require('dotenv').config();

class CustomWorld {

    async openUrl(url) {
        const browser = await playwright.chromium.launch({
            headless: false,
        });
        const context = await browser.newContext();
        this.page = await context.newPage();
        await this.page.goto(url);
    }
}

setWorldConstructor(CustomWorld);
module.exports = {CustomWorld}