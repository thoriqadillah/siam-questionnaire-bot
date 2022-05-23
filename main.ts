import cliController from "./controller/cli-controller.ts";

try {
    await cliController(Deno.args)
} catch (err) {
    console.error(err)
}