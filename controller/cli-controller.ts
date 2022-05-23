import { parse } from "https://deno.land/std@0.140.0/flags/mod.ts";
import buildHelpResponse from "../handler/help-handler.ts";
import throwRequiredException from "../handler/required-handler.ts";
import populateQuestionnaire from "../service/bot-service.ts";
import { Siam, Option } from "../service/bot.ts";

const LINK_SIAM = 'https://siam.ub.ac.id/'

export default async function cliController(args: string[]) {
    const input = parse(args, {
        default: {
            slowMo: 100,
            random: 3,
            exclude: ''
        }, 
        alias: {
            h: "help",
            u: "username",
            p: "password",
            s: "slowMo",
            r: "random",
            e: "exclude"
        }
    })
    const {
        help, h,
        username, u,
        password, p,
        slowMo, s,
        random, r,
        exclude, e 
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

    const siam: Siam = {
        username: `${username}` || `${u}`,
        password: password || p,
        link: LINK_SIAM
    }  

    const option: Option = {
        headless: help || h ? true : false,
        slowMo: slowMo || s,
        random: random || r,
        exclude: exclude ?? e
    }
    console.log(input)
    
    await populateQuestionnaire(siam, option)
}