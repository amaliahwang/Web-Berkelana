# Berkelana API

Server REST API Berkelana merupakan sebuah layanan yang memungkinkan aplikasi web Berkelana untuk berkomunikasi dengan database dan sumber daya lainnya. Berkelana sendiri adalah aplikasi web yang menampilkan informasi tentang destinasi wisata di Yogyakarta.

## Tujuan utama Server REST API Berkelana:

-   Menyediakan informasi: Memberikan informasi terkini dan lengkap tentang berbagai destinasi wisata di Yogyakarta kepada pengguna aplikasi Berkelana.
-   Meningkatkan daya tarik: Menarik lebih banyak wisatawan luar Yogyakarta untuk mengunjungi destinasi wisata yang ada di Yogyakarta.
-   Membantu pengelola: Memberikan platform bagi pengelola destinasi wisata untuk mendaftarkan dan mempromosikan destinasi mereka secara online.
-   Manfaat bagi Pengelola Destinasi:

    1.  Meningkatkan jumlah pengunjung: Destinasi wisata yang terdaftar di aplikasi Berkelana akan mendapatkan eksposur yang lebih luas, sehingga berpotensi meningkatkan jumlah pengunjung.
    2.  Mempermudah promosi: Pengelola destinasi dapat dengan mudah memperbarui informasi dan foto destinasi mereka melalui platform Berkelana.
    3.  Meningkatkan daya saing: Kehadiran di aplikasi Berkelana dapat membantu meningkatkan daya saing destinasi wisata di tengah banyaknya pilihan wisata yang tersedia.

## Fitur

1. Autentikasi

    1. Registrasi
    2. Login
    3. Reset Password

2. Kategori Destinasi

    1. Tamu dapat melihat seluruh kategori
    2. Admin dapat melakukan aksi CRUD pada kategori destinasi
    3. Disertai dengan unggah thumbnail kategori

3. Destinasi

    1. Tamu dapat melihat seluruh destinasi
    2. Admin dapat melakukan aksi CRUD pada destinasi
    3. Disertai fitur unggah thumbnail destinasi
    4. Disertai fitur filter destinasi berdasarkan kategori, kisaran harga
    5. Disertai fitur pencarian berdasarkan nama destinasi
    6. Disertai fitur wishlist sehingga user bisa menambahkan destinasi ke daftar keingingan destinasi yang ingin dikunjungi
    7. Disertai fitur untuk menambahkan galeri pada destinasi agar menambahkan daya tarik user untuk mendatangi destinasi wisata tersebut.

4. Paket Destinasi

    1. Tamu dapat melihat paket destinasi yang ada
    2. Paket destinasi merupakan gabungan dari beberapa destinasi yang bisa dikunjungi hanya dengan membeli satu paket
    3. User bisa mendapatkan banyak benefit ketika membeli paket destinasi
    4. Admin dapat melakukan aksi crud pada paket destinasi

5. Metode Pembayaran

    1. Admin bisa melakukan aksi CRUD pada metode pembyaran
    2. Berguna agar user bisa lebih dinamis memilih metode pembayaran saat melakukan pembayaran

6. Promo

    1. Admin bisa melakukan aksi CRUD pada promo
    2. Berguna agar memberikan daya tarik user
    3. Ketika digunakan user akan mendapatkan potongan harga sepersekian persen\

7. Pembayaran
    1. User dapat melakukan pembayaran dari destinasi atau paket destinasi dengan mengirimkan bukti pembayaran
    2. Admin dapat mereview bukti pembayaran dan menyetujui pembayaran user
    3. User dapat melihat status pembayarannya

-   Dokumentasi API (https://api.amarafiif.my.id/api-docs)

## Instalasi

Petunjuk setup proyek. Pastikan anda berada di direktori expressjs sebelum menjalankan perintah dibawah ini. Jika sudah silahkan jalankan perintah dibawah ini secara berurutan:

```bash
npm install
npx prisma migrate dev
npm run dev
```
