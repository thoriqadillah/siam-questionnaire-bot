import { parse } from "https://deno.land/std@0.140.0/flags/mod.ts";
import buildHelpResponse from "../handler/help-handler.ts";
import throwRequiredException from "../handler/required-handler.ts";
import populateQuestionnaire from "../service/bot-service.ts";
import { Siam, Option } from "../service/bot.ts";

const LINK_SIAM = 'https://siam.ub.ac.id/'

export default async function cliController(args: string[]) {
    const input = parse(args, {
        default: {
            s: 100,
            r: 3
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
    const { help, username, password, slowMo, random, exclude } = input

    if (help) {
        buildHelpResponse()
        return
    }

    if (!username) {
        throwRequiredException()
        return
    }

    if (!password) {
        throwRequiredException()
        return
    }

    const siam: Siam = {
        username: `${username}`,
        password: password,
        link: LINK_SIAM
    }  

    let excludedDosen = exclude.split(',')
    const option: Option = {
        headless: help ? true : false,
        slowMo: slowMo,
        random: random,
        exclude: excludedDosen
    }
    
    // await populateQuestionnaire(siam, option)
}