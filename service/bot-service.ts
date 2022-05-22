import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { Bot, Siam } from "./bot.ts";

const bot: Bot = {
    instance: await (await puppeteer.launch()).newPage()
}

async function login(siam: Siam) {
    await bot.instance.goto(siam.link)

    await bot.instance.select('input[name="username"]', siam.username)
    await bot.instance.select('input[name="password"]', siam.password)

    await bot.instance.click('input[name="login"]')
}

async function excludeDosen(input: string[]) {
    
}

async function isiKuesioner() {
    
}