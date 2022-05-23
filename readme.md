# Kuesioner Bot CLI App (BETA)
Apakah kalian mager ketika ngisi kuesioner dosen yang tiap akhir semester itu? Sama gan. Meskipun cuma butuhin beberapa menit, tapi bosenin cuy. Makanya kubuat program ini selama beberapa jam biar ngisi kuesionernya otomatis. Basically I walk so you can run.
Kuesioner bot ini dibuat menggunakan [Deno](https://deno.land/)

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

optional
  -s --slowMo      Set slow motion bot. Default 100ms (0.9x)
  -r --random      Set randomisasi jawaban kuesioner. Default 3 (Normal, Baik, Sangat Baik)
  -e --exclude     Exclude dosen agar dapat Anda isi kuesioner secara manual
```
Contoh penggunaan:
```
BETA_siam-kuesioner-bot-linux_x86-64 --username 195150400111034 --password aaaaaaaa --slowMo 0 --random 4 
```
Pada ekslusi dosen, cukup beri nama panggilannya saja dipisahkan dengan koma tanpa spasi. Contoh dosen yang ada di kuesioner kalian adalah 

1. Fulan Si Fulan S.Kom
2. Sopo Jarwo S.Kom M.Kom
3. Joyodipo Jowokid S.Kom M.T

Maka kalian cukup run command pada terminal dengan
```
linux_x64 --username 195150400111034 --password aaaaaaaa --slowMo 0 --random 4 --exclude fulan,jarwo
```
#### **WARNING : Per tanggal 23 Mei, project ini belum jadi**
Saat ini bot hanya bisa melakukan login SIAM saja karena kuesioner dosen belum ada saat ini. Kalian akan mengetahui jika project ini sudah jadi ketika kalian tidak melihat tulisan warning ini
