import * as Colors from "https://deno.land/std/fmt/colors.ts"

type Response = string

export function buildHelpResponse() {
    console.log(
        'SIAM Bot by thoriqadillah\n\n' +
    
        'flags\n' +
        '  -h --help        Menampilkan help\n' +
        '  -u --username    Input username (wajib diisi)\n' +
        '  -p --password    Input password (wajib diisi)\n' +
        '  -m --message     Pesan yang diberikan kepada dosen (wajib diisi)\n\n' +

        'optional\n' +
        '  -s --slowMo      Set slow motion bot. Default 100ms (0.9x)\n' +
        '  -r --random      Set randomisasi jawaban kuesioner. Default 3 (Normal, Baik, Sangat Baik) \n' +
        '  -e --exclude     Exclude dosen agar dapat kalian isi kuesioner secara manual\n' +
        '     --path        Set executable path chromium secara manual jika program gagal berjalan\n' 
    )
}

export function buildRequiredResponse(res: Response) {
    console.log(Colors.red(res))
}

export function buildErrorResponse(res: Response) {
    console.log(Colors.red(res))
}

export function buildNotFoundResponse(res: Response) {
    console.log(Colors.yellow(res))
}

export function buildInfo(res: Response) {
    console.log(res)
}