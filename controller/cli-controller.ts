import { parse } from "https://deno.land/std@0.140.0/flags/mod.ts";
import { buildHelpResponse, throwRequiredException } from "../helper/response-helper.ts";
import takeQuestionnaire , { getChromiumPath } from "../service/bot-service.ts";
import { Siam, Option } from "../service/bot.ts";

const LINK_SIAM = 'https://siam.ub.ac.id/'

export default async function cliController(args: string[]) {
    const input = parse(args, {
        default: {
            slowMo: 50,
            random: 3,
            exclude: '',
            path: getChromiumPath()
        }, 
        alias: {
            h: "help",
            u: "username",
            p: "password",
            s: "slowMo",
            r: "random",
            e: "exclude",
            m: "message"
        }
    })
    const {
        help, h,
        username, u,
        password, p,
        slowMo, s,
        random, r,
        exclude, e,
        message, m,
        path 
    } = input

    if (help || h) {
        buildHelpResponse()
        return
    }

    if (!username && !u) {
        throwRequiredException()
        return
    }

    if (!password && !p) {
        throwRequiredException()
        return
    }

    if (!message && !m) {
        throwRequiredException()
        return
    }

    const siam: Siam = {
        username: `${username}` || `${u}`,
        password: password || p,
        link: LINK_SIAM
    }  

    const option: Option = {
        headless: help || h ? true : false,
        slowMo: slowMo || s,
        random: random || r,
        exclude: exclude ?? e,
        message: message ?? m,
        path: path
    }
    
    await takeQuestionnaire(siam, option)
}