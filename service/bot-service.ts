import puppeteer, { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { Option, Siam } from "./bot.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { emptyQuestionnaireException } from "../helper/response-helper.ts";

type Dosen = {
    link: string
    name: string
}

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

export default async function takeQuestionnaire(siam: Siam, option: Option) {
    const browser = await puppeteer.launch({
        executablePath: option.path,
        headless: option.headless,
        slowMo: option.slowMo,
    });
    const page = await browser.newPage();
    await page.goto(siam.link)

    console.log('Login...')
    await login(page, siam)
    await page.waitForTimeout(2000);
    
    if (await !isRedirectedToQuestionnaire(page)) {
        console.log('Tidak ditemukan kuesioner mata kuliah')
        browser.close()
        return
    }

    console.log('Mengisi kuesioner...')
    let excludedDosen: string[] = []
    if (option.exclude != undefined) {
        excludedDosen = option.exclude.toLowerCase().split(',')
    }

    const dosen = await filterDosen(page, excludedDosen)
    if (dosen.length == 0) {
        emptyQuestionnaireException()
        await browser.close()
        return
    }

    for (let i = 0; i < dosen.length; i++) {
        await page.goto(dosen[i].link)
        await populateQuestionnaire(page, option)
    }

    console.log('Selesai....')
    await browser.close()
}

async function login(page: Page, siam: Siam) {
    await page.type("input[name=username]", siam.username)
    await page.type("input[name=password]", siam.password)
    await page.click('input[name="login"]')
}

async function isRedirectedToQuestionnaire(page: Page) {
    const title = await page.$eval('span.section', el => el.textContent)

    return title.toString() == 'Kuisioner Mata Kuliah' ? true : false
}

async function filterDosen(page:Page, exclude: string[]): Promise<Dosen[]> {
    const anchors = await page.$$('table tbody tr.text td:last-child a')
    const tds = await page.$$('table tbody tr.text td:nth-child(7)')

    const links = await Promise.all(
        anchors.map(async element => {
            return await page.evaluate(anchor => anchor.href, element)
        })
    ) as string[]

    const names = await Promise.all(
        tds.map(async element => {
            return await page.evaluate(td => td.textContent, element)
        })
    ) as string[]
        
    let dosens: Dosen[] = []
    for (let i = 0; i < names.length; i++) {
        dosens.push({
            link: links[i],
            name: names[i]
        })
    }

    if (exclude.length == 0) return dosens
    
    for (let j = 0; j < exclude.length; j++) {
        dosens = dosens.filter(el => !el.name.toLowerCase().includes(exclude[j]))
    }

    return dosens
}


async function populateQuestionnaire(page: Page, option: Option) {
    const TOTAL_QUESTION_OPTION = 5
    const TOTAL_QUESTION = 28

    const random = Math.floor(Math.random() * (TOTAL_QUESTION_OPTION - option.random + 1)) + option.random; 

    for (let i = 1; i <= TOTAL_QUESTION; i++) {
        const element = await page.$(`table tbody tr.text td:last-child input[name="${i}"][value="${random}"]`)
        await element?.click()
    }

    await page.focus(`textarea#saran`)
    await page.type("textarea#saran", option.message);

    await page.waitForTimeout(1000);
}

