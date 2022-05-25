import * as Colors from "https://deno.land/std/fmt/colors.ts"

export function buildHelpResponse() {
    console.log(
        'SIAM Bot by thoriqadillah\n\n' +
    
        'flags\n' +
        '  -h --help        Menampilkan help\n' +
        '  -u --username    Input username (wajib diisi)\n' +
        '  -p --password    Input password (wajib diisi)\n\n' +
        '  -m --message     Pesan yang diberikan kepada dosen\n' +

        'optional\n' +
        '  -s --slowMo      Set slow motion bot. Default 100ms (0.9x)\n' +
        '  -r --random      Set randomisasi jawaban kuesioner. Default 3 (Normal, Baik, Sangat Baik) \n' +
        '  -e --exclude     Exclude dosen agar dapat kalian isi kuesioner secara manual\n' +
        '     --path        Set executable path chromium secara manual jika program gagal berjalan\n' 

    )
}

export function throwRequiredException() {
    console.log(Colors.red('username, password, dan message wajib diisi'))
}


    
