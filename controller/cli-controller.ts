import { parse } from "https://deno.land/std@0.140.0/flags/mod.ts";
import { Option } from "../entity/botOption.ts";
import { Siam } from "../entity/siam.ts";
import { buildErrorResponse, buildHelpResponse, buildRequiredResponse } from "../helper/response-helper.ts";
import takeQuestionnaire, { getChromiumPath } from "../service/bot-service.ts";

const LINK_SIAM = 'https://siam.ub.ac.id/'

export default async function run(args: string[]) {
    try {
        const input = parse(args, {
            default: {
                slowMo: 50,
                random: 3,
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
            buildRequiredResponse('> Username wajib diisi')
            return
        }
    
        if (!password && !p) {
            buildRequiredResponse('> Password wajib diisi')
            return
        }
    
        if (!message && !m) {
            buildRequiredResponse('> Message wajib diisi')
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
        
    } catch (error) {
        buildErrorResponse(error.message)
    }
}