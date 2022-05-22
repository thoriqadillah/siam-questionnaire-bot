import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { Bot, Siam } from "./bot.ts";
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

const bot: Bot = {
    instance: await (await puppeteer.launch({
        executablePath: getChromiumPath(),
        headless: false,
        slowMo: 0
    })).newPage()
}

export default async function login(siam: Siam) {
    await bot.instance.goto(siam.link)

    await bot.instance.type("input[name=username]", siam.username)
    await bot.instance.type("input[name=password]", siam.password)

    await bot.instance.click('input[name="login"]')
}



async function excludeDosen(input: string[]): Promise<void> {
    
}

async function isiKuesioner() {
    
}