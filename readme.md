# Kuesioner Bot CLI App (BETA)
Apakah kalian mager ketika ngisi kuesioner dosen yang tiap akhir semester itu? Sama gan. Meskipun cuma butuhin beberapa menit, tapi bosenin cuy. Makanya kubuat program ini selama beberapa jam biar ngisi kuesionernya otomatis. Basically I walk so you can run.
Kuesioner bot ini dibuat menggunakan [Deno](https://deno.land/)

## Prerequisites
Hal yang perlu kalian install untuk dapat menjalankan program ini

* Chromium

**Note** : windows secara default sudah menyediakan chromium jika kalian mempunyai broswer seperti brave, edge, chrome, opera, dll. Sedangkan untuk linux harus menginstall manual

## Cara Pakai
Masuk ke dalam folder yang kalian inginkan, kemudian clone repo dengan run command di bawah ini pada terminal kalian
```
git clone https://github.com/thoriqadillah/siam-questionnaire-bot.git
cd siam-questionnaire-bot/bin
```
Lalu run dengan nama file sesuai OS yang kalian pakai kemudian berikan input dengan pilihan flags di bawah ini. Atau bisa lihat pada `nama_file --help`
```
SIAM Bot by thoriqadillah
    
flags
  -h --help        Menampilkan help
  -u --username    Input username (wajib diisi)
  -p --password    Input password (wajib diisi)
  -m --message     Pesan yang diberikan kepada dosen (wajib diisi)

optional
  -s --slowMo      Set slow motion bot. Default 50ms (0.95x)
  -r --random      Set randomisasi jawaban kuesioner. Default 3 (Normal, Baik, Sangat Baik)
  -e --exclude     Exclude dosen agar dapat kalian isi kuesioner secara manual
     --path        Set executable path chromium secara manual jika program gagal berjalan
```
Contoh penggunaan:
```
linux-gnu-x86_64-beta --username 195150400111034 --password secret --message terima kasih
```
Pada ekslusi dosen, cukup beri nama panggilannya saja dipisahkan dengan koma tanpa spasi. Contoh dosen yang ada di kuesioner kalian adalah 

1. Fulan Si Fulan S.Kom
2. Sopo Jarwo S.Kom M.Kom
3. Joyodipo Jowokid S.Kom M.T

Maka kalian cukup run command pada terminal dengan
```
linux-gnu-x86_64-beta --username 195150400111034 --password secret --message terima kasih --exclude fulan,jarwo
```
### **WARNING : PER TANGGAL 25 MEI PROGRAM INI BELUM JADI**
Karena saya pribadi masih kurang yakin apakah ini sudah waktunya mengisi kuesioner dosen meskipun sekarang ketika masuk SIAM langsung redirect ke kuesioner dosen, maka sementara program dapat mengisi kuesioner tetapi tidak sampai dikirim ke server.
