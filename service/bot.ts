import { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export type Siam = {
    username: string
    password: string
    link: string
}
export type Option = {
    headless: boolean
    slowMo: number
    random: number
    exclude: string[]
}