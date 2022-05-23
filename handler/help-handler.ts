export default function buildHelpResponse() {
    console.log(
        'SIAM Bot by thoriqadillah\n\n' +
    
        'flags\n' +
        '  -h --help        Menampilkan help\n' +
        '  -u --username    Input username (wajib diisi)\n' +
        '  -p --password    Input password (wajib diisi)\n\n' +

        'optional\n' +
        '  -s --slowMo      Set slow motion bot. Default 100ms (0.9x)\n' +
        '  -r --random      Set randomisasi jawaban kuesioner. Default 3 (Normal, Baik, Sangat Baik) \n' +
        '  -e --exclude     Exclude dosen agar dapat Anda isi kuesioner secara manual\n' 

    )
}

    
