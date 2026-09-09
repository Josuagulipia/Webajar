# 🦉 Petualangan Belajar — Media Pembelajaran Interaktif

Website pembelajaran interaktif untuk siswa SMA/SMK. Murni HTML + CSS + JavaScript
(tanpa server, tanpa database, tanpa instalasi apa pun) — bisa langsung dibuka di
laptop, HP, tablet, atau ditampilkan lewat proyektor/Interactive TV di kelas.

Materi contoh yang sudah diisi: **"Komunikasi Digital & Netiket"** (8 subbab, lengkap
dengan praktik, kuis, dan Boss Challenge). Guru bisa mengganti seluruh isi ini
dengan materi sendiri tanpa menyentuh kode sama sekali.

---

## 1. Struktur Folder

```
project/
├── index.html          ← halaman utama (jangan diedit kecuali paham HTML)
├── README.md            ← file ini
├── css/
│   └── style.css        ← semua tampilan/desain
└── js/
    ├── data.js           ← 📌 ISI MATERI ADA DI SINI (yang paling sering diedit)
    ├── storage.js        ← penyimpanan progres siswa & materi di browser
    ├── ui.js             ← efek suara, animasi, toast, dark mode
    ├── gamifikasi.js      ← aturan XP, Level, Badge, Misi Harian
    ├── activities.js      ← mesin jenis-jenis aktivitas praktik
    ├── quiz.js            ← mesin kuis
    ├── guru.js            ← Mode Guru (editor materi visual di dalam website)
    └── app.js              ← logika utama & tampilan semua halaman
```

## 2. Cara Menjalankan

**Paling mudah (langsung buka):**
Klik dua kali `index.html` untuk membukanya di browser. Sebagian besar fitur
langsung berjalan. Beberapa browser membatasi fitur tertentu saat dibuka
langsung dari file (`file://`) — kalau ada bagian yang terasa aneh, pakai
cara di bawah ini.

**Cara yang lebih stabil (dijalankan secara lokal):**
1. Buka folder ini di terminal/command prompt.
2. Jalankan salah satu:
   - Python: `python3 -m http.server 8000`
   - Node.js: `npx serve .`
   - VS Code: install ekstensi **Live Server**, klik kanan `index.html` → "Open with Live Server".
3. Buka `http://localhost:8000` (atau alamat yang muncul) di browser.

**Hosting gratis ke GitHub Pages** (supaya bisa diakses siswa dari HP di rumah):
1. Buat repository baru di GitHub, upload semua isi folder `project/` ini.
2. Buka menu **Settings → Pages** di repository tersebut.
3. Pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Tunggu beberapa menit, website akan aktif di alamat seperti
   `https://namaguru.github.io/nama-repo/`.

Tidak perlu server khusus, database, atau biaya hosting.

---

## 3. Cara Memasukkan / Mengganti Materi (2 cara)

### Cara A — Lewat Mode Guru di website (disarankan, tanpa kode sama sekali)
1. Buka website, klik tombol **"👩‍🏫 Mode Guru"** di pojok kiri bawah (desktop)
   atau di menu.
2. Menu **Subbab** → **➕ Tambah Subbab Baru**, atau klik **✏️ Edit** pada
   subbab yang sudah ada.
3. Isi Judul, Tujuan, Waktu, tambahkan blok konten (teks, contoh, gambar,
   video YouTube, dll), rangkuman, jenis praktik, dan soal kuis lewat formulir
   yang tersedia.
4. Klik **💾 Simpan Materi** di bagian bawah — perubahan langsung aktif untuk
   siswa di perangkat yang sama.
5. Menu **Import/Export** bisa dipakai untuk mencadangkan materi (download
   `materi.json`) atau memindahkannya ke komputer/browser lain.

> Catatan: materi hasil edit lewat Mode Guru disimpan di **localStorage
> browser** (per perangkat/browser). Untuk membagikan materi yang sama ke
> banyak komputer sekolah, gunakan tombol Export lalu Import di komputer lain,
> **atau** edit langsung file `js/data.js` (Cara B) supaya semua orang yang
> membuka website mendapat materi default yang sama.

### Cara B — Edit langsung file `js/data.js` (untuk materi default/bawaan)
Buka `js/data.js` dengan aplikasi Notepad/VS Code apa saja. Strukturnya berupa
data terbuka (bukan kode rumit), contoh:

```js
subbab: [
  {
    id: "pengantar",              // wajib unik, tanpa spasi
    judul: "Apa Itu Komunikasi Digital?",
    tujuan: "Memahami pengertian ... ",
    waktu: "15 menit",
    konten: [
      { type: "paragraf", text: "Tulis penjelasan di sini..." },
      { type: "contoh", title: "Contoh", items: ["Poin 1", "Poin 2"] },
      { type: "tahukah", text: "Fakta menarik..." }
    ],
    rangkuman: ["Poin ringkasan 1", "Poin ringkasan 2"],
    praktik: { type: "mcq", pertanyaan: "...", opsi: [...], jawabanBenar: 0, ... },
    quiz: [ { soal: "...", opsi: [...], jawaban: 0, pembahasan: "..." } ]
  },
  // salin-tempel blok ini untuk menambah subbab baru
]
```

Cukup ganti teks di antara tanda kutip `" "`. Simpan file, refresh browser.

---

## 4. Cara Menambahkan/Mengganti Gambar

- **Lewat Mode Guru:** buka Edit Subbab → Blok Konten → pilih jenis "Gambar",
  lalu isi URL gambar **atau** klik "Upload dari perangkat" untuk memilih
  foto langsung dari HP/laptop.
- **Lewat `data.js`:** tambahkan blok `{ type: "gambar", url: "https://...",
  keterangan: "Keterangan gambar" }` di dalam array `konten`.

## 5. Cara Menambahkan Video YouTube

Tambahkan blok `{ type: "video", url: "https://youtube.com/watch?v=XXXX" }`
di `konten` (lewat Mode Guru atau `data.js`). Video otomatis tampil sebagai
pemutar tertanam (embed).

## 6. Cara Menambahkan Soal Kuis

- **Lewat Mode Guru:** Edit Subbab → bagian "🧩 Soal Kuis" → **➕ Tambah Soal
  Kuis** → isi pertanyaan, 4 pilihan, nomor jawaban benar, dan pembahasan.
- **Lewat `data.js`:** tambahkan objek baru ke array `quiz` pada subbab
  terkait, format:
  ```js
  { soal: "Pertanyaannya?", opsi: ["A","B","C","D"], jawaban: 1, pembahasan: "Alasannya..." }
  ```
  (`jawaban: 1` berarti opsi ke-2, dihitung mulai dari 0)

## 7. Cara Menambahkan Aktivitas Praktik

Setiap subbab punya satu objek `praktik`. Jenis yang tersedia:

| type          | Cocok untuk                                   |
|---------------|------------------------------------------------|
| `mcq`         | Pilihan ganda sederhana                         |
| `true-false`  | Serangkaian pernyataan Benar/Salah              |
| `case-study`  | Studi kasus / simulasi pengambilan keputusan    |
| `categorize`  | Drag & drop mengelompokkan kartu ke 2 kategori  |
| `order`       | Menyusun urutan langkah yang benar              |
| `match`       | Mencocokkan istilah dengan penjelasannya        |

Lewat Mode Guru, jenis **mcq**, **true-false**, dan **case-study** punya
formulir visual penuh. Jenis **categorize / order / match** (lebih kompleks)
diedit lewat kotak JSON di Mode Guru — silakan salin pola dari subbab contoh
di `data.js` (mis. subbab `bahasa-formal-informal` untuk `categorize`,
`email-efektif` untuk `order`, `attachment-cc-bcc` untuk `match`) lalu ganti
teksnya.

---

## 8. Sistem Gamifikasi (sudah otomatis, tidak perlu diatur)

- **+10 XP** — membaca satu subbab (pertama kali)
- **+20 XP** — menyelesaikan praktik dengan benar
- **+10 XP** — setiap jawaban kuis yang benar
- **+30 XP** — setiap misi harian selesai
- **+100 XP** — menyelesaikan Boss Challenge
- Level: Penjelajah (Lv.1) → Pemaham (Lv.2) → Ahli (Lv.3) → Master (Lv.4)
- 7 Badge otomatis terbuka berdasarkan aktivitas siswa
- Semua tersimpan otomatis di browser siswa (localStorage) — tidak hilang
  saat menutup tab, tapi khusus untuk perangkat/browser itu saja (tidak ada
  server pusat untuk merekap nilai seluruh kelas).

Guru bisa mengubah jumlah XP per aktivitas lewat `js/gamifikasi.js`
(bagian `XP_RULES`) bila diperlukan — bagian ini opsional untuk diedit.

---

## 9. Fitur yang Sudah Tersedia

Beranda • Progress & XP • Level • Badge/Prestasi • Misi Harian • Materi per
subbab (dengan "Coba Dulu", contoh sehari-hari, "Tahukah Kamu?", rangkuman) •
6 jenis Praktik interaktif • Kuis otomatis dengan pembahasan • Boss Challenge
akhir • Pencarian materi • Bookmark • Dark Mode • Text-to-Speech (dengarkan
materi) • Catatan/cek pemahaman siswa • Download ringkasan materi (.txt) •
Kamus istilah (glossary) • Mini game tebak istilah (flashcard) • Refleksi
pembelajaran • Halaman penutup dengan rekap nilai • Mode Guru lengkap dengan
Import/Export materi (JSON) • Tampilan responsif (desktop, tablet, HP,
proyektor/TV kelas).

## 10. Batasan yang Perlu Diketahui

- Data (progres siswa & materi hasil edit guru) tersimpan di **localStorage
  browser**, per perangkat. Ini membuat website bisa berjalan 100% tanpa
  server/database, tapi berarti tidak ada rekap nilai terpusat semua siswa
  dalam satu tempat. Untuk kebutuhan itu, gunakan tombol Export di Mode Guru
  agar siswa/guru bisa mengumpulkan file hasil secara manual, atau kembangkan
  lebih lanjut dengan backend sederhana bila diperlukan.
- Upload gambar lewat Mode Guru disimpan sebagai data langsung di browser
  (base64) — praktis untuk beberapa gambar, tapi untuk banyak gambar
  beresolusi besar lebih baik gunakan URL gambar dari internet.

Selamat mengajar! 🎉
