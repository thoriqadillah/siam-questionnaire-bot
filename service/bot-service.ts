import puppeteer, { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { buildErrorResponse, buildInfo, buildNotFoundResponse } from "../helper/response-helper.ts";
import { Siam } from "../entity/siam.ts";
import { Option } from "../entity/botOption.ts";
import { Dosen } from "../entity/dosen.ts";

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

    try {
        const page = await browser.newPage();
        await page.goto(siam.link)

        buildInfo('> Login...')
        await login(page, siam)
        await page.waitForTimeout(2000);
        
        if (await !isRedirectedToQuestionnaire(page)) {
            buildNotFoundResponse('> Kuesioner tidak ditemukan')
            browser.close()
            return
        }

        buildInfo('> Mengisi kuesioner...')
        const dosen = await filterDosen(page, option)
        for (let i = 0; i < dosen.length; i++) {
            buildInfo(`> Mengisi kuesioner atas nama ${dosen[i].name}...`)
            await page.goto(dosen[i].link)
            await populateQuestionnaire(page, option)

            if (option.send) {
                await page.$eval("input[type=submit]", btn => btn.click());
            }
        }

        buildInfo('> Selesai...')
        await browser.close()

    } catch (err) {
        buildErrorResponse(err.message)
        browser.close()
    }
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

async function filterDosen(page:Page, option: Option): Promise<Dosen[]> {
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

    if (option.exclude == undefined) return dosens
    
    let excludedDosen = option.exclude.toLowerCase().split(',')
    for (let j = 0; j < excludedDosen.length; j++) {
        dosens = dosens.filter(el => !el.name.toLowerCase().includes(excludedDosen[j]))
    }

    return dosens
}

async function populateQuestionnaire(page: Page, option: Option) {
    const TOTAL_QUESTION_OPTION = 5
    const TOTAL_QUESTION = 28

    for (let i = 1; i <= TOTAL_QUESTION; i++) {
        const random = Math.floor(Math.random() * (TOTAL_QUESTION_OPTION - option.random + 1)) + option.random; 
        const element = await page.$(`table tbody tr.text td:last-child input[name="${i}"][value="${random}"]`)
        await element?.click()
    }

    await page.focus(`textarea#saran`)
    await page.type("textarea#saran", option.message);

    await page.waitForTimeout(1000);
}