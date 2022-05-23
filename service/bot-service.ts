import puppeteer, { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { Option, Siam } from "./bot.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";


export function getChromiumPath(): string {
    const platform = os.platform()
    
    if (platform == 'linux') {
        return '/usr/bin/chromium-browser'
    }

    if (platform == 'darwin') {
        return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }

    return '' //default for windows
}

export default async function populateQuestionnaire(siam: Siam, option: Option) {
    const browser = await puppeteer.launch({
        executablePath: getChromiumPath(),
        headless: option.headless,
        slowMo: option.slowMo,
    });
    const page = await browser.newPage();

    await page.goto(siam.link)

    await login(page, siam)
    
}

async function login(page: Page, siam: Siam) {
    await page.type("input[name=username]", siam.username)
    await page.type("input[name=password]", siam.password)
    await page.click('input[name="login"]')
}