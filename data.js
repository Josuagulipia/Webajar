/* ============================================================
   DATA MATERI — INI FILE YANG GURU EDIT
   ============================================================
   Semua isi pelajaran ada di sini dalam bentuk objek JavaScript.
   Guru TIDAK PERLU menyentuh file app.js / activities.js / quiz.js.

   Cara mengedit:
   - Ganti teks di antara tanda kutip " ... "
   - Untuk menambah subbab baru, salin (copy-paste) satu blok
     { id: ..., judul: ..., ... } lalu ubah isinya.
   - id HARUS unik (tidak boleh sama dengan subbab lain).
   - Semua ini juga bisa diedit lewat Mode Guru di website
     (tombol "Mode Guru" di navigasi), tanpa menyentuh kode sama
     sekali. Perubahan lewat Mode Guru otomatis tersimpan di
     browser (localStorage) dan menimpa data di file ini.
   ============================================================ */

const DEFAULT_MATERI = {
  judul: "Komunikasi Digital & Netiket",
  subjudul: "Belajar sopan santun, email, dan kerja sama di dunia digital",
  mapel: "Informatika / TIK",
  gambarHero: "💬",
  tujuanPembelajaran: [
    "Menjelaskan pengertian komunikasi digital dan netiket.",
    "Membedakan bahasa formal dan informal dalam komunikasi digital.",
    "Menerapkan etika saat mengirim dan membalas pesan.",
    "Menulis email formal dengan struktur yang benar.",
    "Menggunakan fitur CC, BCC, dan attachment pada email.",
    "Melakukan kolaborasi menggunakan dokumen daring.",
    "Menggunakan fitur komentar dan saran pada dokumen.",
    "Menerapkan etika saat mengikuti rapat daring atau video conference."
  ],

  glossary: [
    { term: "Netiket", def: "Singkatan dari Network Etiquette — sopan santun saat berkomunikasi di internet." },
    { term: "Attachment", def: "File yang dilampirkan pada sebuah email, misalnya dokumen, foto, atau PDF." },
    { term: "CC (Carbon Copy)", def: "Mengirim salinan email ke orang lain, dan semua penerima bisa saling melihat siapa saja yang dikirimi." },
    { term: "BCC (Blind Carbon Copy)", def: "Mengirim salinan email secara tersembunyi — penerima lain tidak tahu ada BCC." },
    { term: "Suggestion Mode", def: "Mode di Google Docs untuk mengusulkan perubahan tanpa langsung mengubah dokumen asli." },
    { term: "Viewer / Commenter / Editor", def: "Tingkat izin akses dokumen daring: hanya lihat, lihat+komentar, atau lihat+ubah." },
    { term: "Video conference", def: "Pertemuan lewat internet dengan suara dan/atau video, misalnya Google Meet atau Zoom." },
    { term: "Share screen", def: "Fitur untuk menampilkan layar perangkat kita kepada peserta rapat lain." }
  ],

  subbab: [
    /* ---------------- SUBBAB 1 ---------------- */
    {
      id: "pengantar",
      judul: "Apa Itu Komunikasi Digital?",
      tujuan: "Memahami pengertian dan manfaat komunikasi digital dalam kehidupan sehari-hari.",
      waktu: "15 menit",
      cobaDulu: {
        pertanyaan: "Menurutmu, apa yang akan terjadi jika sekolah tiba-tiba tidak boleh memakai WhatsApp, email, atau Google Meet sama sekali selama seminggu?",
        opsi: ["Belajar jadi lebih sulit dan lambat", "Tidak ada bedanya sama sekali", "Belajar jadi lebih mudah"]
      },
      konten: [
        { type: "paragraf", text: "Komunikasi digital adalah kegiatan menyampaikan informasi, pesan, ide, atau pendapat menggunakan perangkat dan media digital. Sekarang kita bisa berkomunikasi tanpa harus bertemu langsung — lewat WhatsApp, email, media sosial, Google Meet, Zoom, dan berbagai platform lain." },
        { type: "contoh", title: "Contoh komunikasi digital", items: [
          "Mengirim pesan kepada guru melalui WhatsApp",
          "Mengirim tugas melalui email",
          "Berdiskusi di grup kelas",
          "Presentasi lewat Google Meet",
          "Mengerjakan tugas kelompok di Google Docs",
          "Memberi komentar pada dokumen teman"
        ]},
        { type: "sehari-hari", text: "Waktu kamu mengirim tugas foto catatan ke grup WhatsApp kelas karena temanmu izin sakit — itu juga komunikasi digital!" },
        { type: "tahukah", text: "Kata 'digital' berasal dari 'digit' yang berarti angka. Semua yang kamu kirim lewat internet — teks, foto, suara — sebenarnya diubah dulu menjadi kumpulan angka 0 dan 1 sebelum dikirim." }
      ],
      rangkuman: [
        "Komunikasi digital = menyampaikan pesan lewat perangkat & media digital.",
        "Manfaatnya: cepat, bisa jarak jauh, bisa kirim dokumen/gambar, mendukung belajar & kerja sama.",
        "Tetap harus dilakukan dengan sopan, jelas, dan bertanggung jawab."
      ],
      praktik: {
        type: "mcq",
        judul: "Yuk Coba: Mana yang Termasuk Komunikasi Digital?",
        pertanyaan: "Kegiatan berikut yang PALING TEPAT disebut komunikasi digital adalah...",
        opsi: [
          "Mengirim tugas lewat email kepada guru",
          "Mengobrol langsung tatap muka di kelas",
          "Menulis surat dengan pena dan kertas",
          "Menempel pengumuman di papan mading sekolah"
        ],
        jawabanBenar: 0,
        feedbackBenar: "Betul! Mengirim email menggunakan perangkat & internet, jadi itu komunikasi digital.",
        feedbackSalah: "Coba perhatikan lagi — komunikasi digital selalu memakai perangkat dan media digital (internet, aplikasi, dsb), bukan cara manual/tatap muka langsung."
      },
      quiz: [
        { soal: "Komunikasi digital adalah...", opsi: ["Berbicara tanpa suara", "Menyampaikan pesan lewat perangkat & media digital", "Menulis surat dengan tangan", "Berbicara hanya dengan bahasa Inggris"], jawaban: 1, pembahasan: "Komunikasi digital menggunakan perangkat dan media digital seperti HP, laptop, dan internet." },
        { soal: "Berikut ini yang BUKAN contoh komunikasi digital adalah...", opsi: ["Mengirim tugas lewat email", "Video call dengan teman", "Mengobrol lewat grup WhatsApp", "Menempel surat di papan mading sekolah"], jawaban: 3, pembahasan: "Papan mading adalah media fisik/manual, bukan media digital." }
      ]
    },

    /* ---------------- SUBBAB 2 ---------------- */
    {
      id: "netiket",
      judul: "Netiket: Etika Berkomunikasi Digital",
      tujuan: "Memahami dan menerapkan sopan santun (netiket) saat berkomunikasi di dunia digital.",
      waktu: "20 menit",
      cobaDulu: {
        pertanyaan: "Kalau kamu mau minta tugas susulan ke guru lewat WhatsApp, menurutmu pesan seperti apa yang bakal cepat dan enak dibalas?",
        opsi: ["Pesan singkat tanpa salam: 'Kirim tugas!'", "Pesan sopan dengan salam dan penjelasan jelas", "Tidak perlu kirim pesan, langsung telepon berkali-kali"]
      },
      konten: [
        { type: "paragraf", text: "Netiket adalah singkatan dari Network Etiquette, yaitu aturan atau tata krama dalam berkomunikasi menggunakan internet. Sederhananya: netiket adalah sopan santun ketika kita berkomunikasi di dunia digital. Walaupun tidak bertemu langsung, kita tetap harus menghargai lawan bicara." },
        { type: "dua-kolom", judulKiri: "✅ Netiket yang baik", kiri: [
            "Menggunakan kata-kata yang sopan",
            "Mengucapkan salam ketika menghubungi guru",
            "Menjelaskan tujuan pesan dengan jelas",
            "Tidak mengirim pesan berkali-kali tanpa alasan",
            "Menghargai pendapat orang lain",
            "Tidak menyebarkan info pribadi orang lain"
          ], judulKanan: "❌ Contoh kurang sopan", kanan: [
            "\"Pak, kirim tugas!\" — terlalu singkat & tanpa salam"
          ]
        },
        { type: "sehari-hari", text: "Bandingkan: \"Pak, kirim tugas!\" dengan \"Selamat pagi, Pak. Saya ingin menanyakan apakah tugas Informatika dikumpulkan hari ini? Terima kasih, Pak.\" — mana yang lebih nyaman dibaca guru?" },
        { type: "tahukah", text: "Netiket sudah ada sejak awal 1990-an, jauh sebelum media sosial populer! Saat itu orang-orang berdiskusi lewat forum internet dan email, dan tetap butuh aturan sopan santun." }
      ],
      rangkuman: [
        "Netiket = sopan santun berkomunikasi di internet.",
        "Isi pesan penting, tapi cara menyampaikannya juga sama pentingnya.",
        "Gunakan salam, bahasa sopan, dan tujuan yang jelas."
      ],
      praktik: {
        type: "true-false",
        judul: "Benar atau Salah: Netiket",
        soal: [
          { pernyataan: "Mengirim pesan ke guru tanpa salam pembuka tetap sopan asal singkat.", jawaban: false, penjelasan: "Salam pembuka membuat pesan terasa lebih sopan dan menghargai penerima, meskipun pesannya singkat." },
          { pernyataan: "Netiket tetap penting walau kita tidak bertemu langsung dengan lawan bicara.", jawaban: true, penjelasan: "Benar! Sopan santun tetap berlaku di dunia digital, bukan cuma tatap muka." },
          { pernyataan: "Menyebarkan nomor HP teman tanpa izin di grup kelas termasuk netiket yang baik.", jawaban: false, penjelasan: "Itu melanggar privasi orang lain — bukan netiket yang baik." }
        ]
      },
      quiz: [
        { soal: "Netiket adalah singkatan dari...", opsi: ["New Etiquette", "Network Etiquette", "Net Ticket", "New Technology"], jawaban: 1, pembahasan: "Netiket berasal dari kata Network Etiquette." },
        { soal: "Pesan \"Pak, kirim tugas!\" kurang baik karena...", opsi: ["Terlalu panjang", "Tidak sopan dan kurang jelas", "Menggunakan bahasa Inggris", "Dikirim malam hari"], jawaban: 1, pembahasan: "Pesan itu terkesan memerintah, tanpa salam, dan tujuannya kurang jelas." }
      ]
    },

    /* ---------------- SUBBAB 3 ---------------- */
    {
      id: "bahasa-formal-informal",
      judul: "Bahasa Formal dan Informal",
      tujuan: "Mampu membedakan dan menggunakan bahasa formal maupun informal sesuai lawan bicara.",
      waktu: "15 menit",
      konten: [
        { type: "paragraf", text: "Dalam komunikasi digital, kita perlu menyesuaikan bahasa dengan siapa yang kita ajak bicara. Bahasa formal dipakai dalam situasi resmi (guru, sekolah, organisasi). Bahasa informal dipakai dalam situasi santai (teman dekat)." },
        { type: "contoh", title: "Contoh bahasa formal", items: ["\"Selamat pagi, Bu. Saya ingin menyampaikan bahwa hari ini saya tidak dapat mengikuti pembelajaran karena ada keperluan keluarga. Terima kasih atas pengertiannya.\""] },
        { type: "contoh", title: "Contoh bahasa informal", items: ["\"Nanti jadi kerja kelompok jam 2?\""] },
        { type: "sehari-hari", text: "Ingat aturan sederhana ini: teman → boleh lebih santai. Guru/orang yang lebih tua → gunakan bahasa yang sopan dan formal." }
      ],
      rangkuman: [
        "Bahasa formal: untuk guru, sekolah, situasi resmi.",
        "Bahasa informal: untuk teman dekat, situasi santai.",
        "Salah memilih bahasa bisa terkesan tidak sopan atau terlalu kaku."
      ],
      praktik: {
        type: "categorize",
        judul: "Kelompokkan: Formal atau Informal?",
        instruksi: "Ketuk kalimat, lalu ketuk kotak tujuannya (Formal / Informal).",
        kategori: ["Formal", "Informal"],
        item: [
          { teks: "Selamat siang, Bu. Mohon izin bertanya soal tugas.", kategoriBenar: 0 },
          { teks: "Woy, udah ngerjain tugas belum?", kategoriBenar: 1 },
          { teks: "Yth. Bapak/Ibu Guru, saya ingin menyampaikan...", kategoriBenar: 0 },
          { teks: "Btw nanti balik jam berapa?", kategoriBenar: 1 },
          { teks: "Terima kasih atas perhatian dan pengertiannya.", kategoriBenar: 0 },
          { teks: "Santai aja, gampang kok soalnya", kategoriBenar: 1 }
        ]
      },
      quiz: [
        { soal: "Bahasa formal sebaiknya digunakan saat...", opsi: ["Chat dengan sahabat", "Mengirim email ke guru", "Bercanda di grup teman", "Membalas story teman"], jawaban: 1, pembahasan: "Guru adalah pihak resmi/lebih tua, sehingga perlu bahasa formal." },
        { soal: "\"Nanti jadi kerja kelompok jam 2?\" adalah contoh bahasa...", opsi: ["Formal", "Informal", "Baku", "Ilmiah"], jawaban: 1, pembahasan: "Kalimat itu santai dan cocok untuk teman dekat, jadi termasuk bahasa informal." }
      ]
    },

    /* ---------------- SUBBAB 4 ---------------- */
    {
      id: "etika-membalas",
      judul: "Etika Membalas Pesan & Menghindari Kesalahpahaman",
      tujuan: "Menerapkan etika saat membalas pesan dan menghindari kesalahpahaman dalam teks.",
      waktu: "20 menit",
      konten: [
        { type: "paragraf", text: "Saat menerima pesan, perhatikan cara membalasnya: jangan terlalu lama membalas, gunakan bahasa sopan, dan berikan jawaban yang jelas (jangan hanya \"Iya\")." },
        { type: "dua-kolom", judulKiri: "❌ Kurang baik", kiri: ["\"Apa?\"", "\"Iya.\" (tanpa penjelasan)"], judulKanan: "✅ Lebih baik", kanan: ["\"Baik, Pak. Bisa dijelaskan kembali bagian yang dimaksud?\"", "\"Baik, Bu. Pesannya sudah saya baca, akan saya cek dulu ya.\""] },
        { type: "paragraf", text: "Kelemahan komunikasi tertulis: tidak ada nada suara, ekspresi wajah, atau bahasa tubuh. Kalimat \"Kamu pintar juga.\" bisa jadi pujian, tapi bisa juga terasa seperti sindiran, tergantung situasinya." },
        { type: "tahukah", text: "Prinsip sederhana yang bisa kamu pakai: baca kembali pesanmu sebelum menekan tombol \"Kirim\"." }
      ],
      rangkuman: [
        "Balas pesan dalam waktu wajar, dengan bahasa sopan dan jawaban jelas.",
        "Hindari kalimat ambigu (bermakna ganda) dan jangan menulis saat sedang marah.",
        "Selalu baca ulang pesan sebelum dikirim."
      ],
      praktik: {
        type: "case-study",
        judul: "Studi Kasus: Balasan Terbaik",
        skenario: "Gurumu bertanya lewat WhatsApp: \"Apakah kalian sudah paham materi hari ini?\" Kamu sebenarnya masih agak bingung di satu bagian.",
        pertanyaan: "Balasan mana yang paling tepat kamu kirim?",
        opsi: [
          "\"Iya paham Pak.\" (padahal masih bingung)",
          "(tidak membalas sama sekali)",
          "\"Sebagian besar sudah paham, Pak. Namun saya masih agak bingung di bagian CC dan BCC, boleh dijelaskan ulang?\""
        ],
        jawabanBenar: 2,
        feedbackBenar: "Tepat! Balasan itu jujur, sopan, dan jelas menyebutkan bagian mana yang belum dipahami.",
        feedbackSalah: "Belum tepat. Balasan yang baik itu jujur dan jelas — kalau masih bingung, sebaiknya disampaikan dengan sopan, bukan diam atau berpura-pura paham."
      },
      quiz: [
        { soal: "Kelemahan komunikasi tertulis dibanding bicara langsung adalah...", opsi: ["Lebih cepat", "Tidak ada nada suara & ekspresi wajah", "Lebih murah", "Tidak bisa dibaca ulang"], jawaban: 1, pembahasan: "Pesan teks tidak membawa nada suara/ekspresi, sehingga rawan disalahpahami." },
        { soal: "Sebelum mengirim pesan, sebaiknya kita...", opsi: ["Langsung kirim tanpa dibaca", "Membacanya kembali", "Menunggu 1 minggu", "Mengirim berkali-kali"], jawaban: 1, pembahasan: "Membaca ulang membantu memastikan pesan sudah jelas dan tidak menimbulkan salah paham." }
      ]
    },

    /* ---------------- SUBBAB 5 ---------------- */
    {
      id: "email-efektif",
      judul: "Menulis Email Formal yang Efektif",
      tujuan: "Mampu menulis email formal dengan struktur yang benar.",
      waktu: "25 menit",
      konten: [
        { type: "paragraf", text: "Email (electronic mail) adalah surat elektronik untuk mengirim & menerima pesan lewat internet. Email formal sebaiknya memiliki struktur yang jelas: Subjek → Salam Pembuka → Isi → Salam Penutup → Identitas/Pengirim." },
        { type: "contoh", title: "Contoh subjek yang baik", items: ["Izin Tidak Masuk Sekolah – Jhosua", "(hindari subjek tidak jelas seperti \"Penting!!!\" atau \"Halo\")"] },
        { type: "paragraf", text: "Contoh email formal lengkap:\n\nYth. Bapak/Ibu Guru,\nSelamat pagi, Bapak/Ibu.\nSaya Jhosua dari kelas XI. Saya ingin menyampaikan bahwa saya tidak dapat mengikuti pembelajaran hari ini karena ada keperluan keluarga. Saya mohon izin atas ketidakhadiran saya dan akan mengikuti materi atau tugas yang diberikan setelah saya kembali ke sekolah. Demikian yang dapat saya sampaikan. Terima kasih atas perhatian dan pengertiannya.\n\nHormat saya,\nJhosua\nKelas XI" },
        { type: "sehari-hari", text: "Misalnya kamu izin tidak ikut kelas karena sakit — kirim email dengan subjek jelas, salam sopan, alasan singkat, dan penutup terima kasih. Jauh lebih rapi daripada chat singkat tanpa penjelasan." },
        { type: "tahukah", text: "Nama file lampiran yang jelas juga bagian dari kesan profesional! Contoh baik: Tugas_Informatika_Jhosua_XI.pdf. Contoh kurang baik: tugasbaruFIXbanget123.pdf." }
      ],
      rangkuman: [
        "Struktur email formal: Subjek → Salam Pembuka → Isi → Salam Penutup → Identitas.",
        "Subjek harus jelas dan mewakili isi email.",
        "Isi email: langsung ke tujuan, sopan, tidak bertele-tele."
      ],
      praktik: {
        type: "order",
        judul: "Susun Urutan Struktur Email Formal",
        instruksi: "Ketuk bagian-bagian di bawah sesuai urutan yang benar, dari awal ke akhir.",
        itemAcak: ["Isi Email", "Salam Penutup", "Subjek", "Salam Pembuka", "Identitas/Tanda Tangan"],
        urutanBenar: ["Subjek", "Salam Pembuka", "Isi Email", "Salam Penutup", "Identitas/Tanda Tangan"],
        feedbackBenar: "Tepat! Itulah alur email formal yang baik dan mudah dipahami penerima.",
        feedbackSalah: "Belum pas urutannya. Ingat: email dimulai dari Subjek, lalu Salam Pembuka, baru masuk ke Isi, kemudian Salam Penutup, dan diakhiri Identitas."
      },
      quiz: [
        { soal: "Urutan struktur email formal yang benar adalah...", opsi: ["Isi → Subjek → Salam → Identitas", "Subjek → Salam Pembuka → Isi → Salam Penutup → Identitas", "Salam → Isi → Subjek", "Identitas → Isi → Subjek"], jawaban: 1, pembahasan: "Struktur baku email formal dimulai dari Subjek dan diakhiri Identitas pengirim." },
        { soal: "Contoh nama file lampiran yang baik adalah...", opsi: ["tugasbaruFIXbanget123.pdf", "Tugas_Informatika_Jhosua_XI.pdf", "asdf123.pdf", "file.pdf"], jawaban: 1, pembahasan: "Nama file sebaiknya jelas menunjukkan isi, mata pelajaran, dan pemiliknya." }
      ]
    },

    /* ---------------- SUBBAB 6 ---------------- */
    {
      id: "attachment-cc-bcc",
      judul: "Attachment, CC, dan BCC",
      tujuan: "Mampu menggunakan fitur attachment, CC, dan BCC pada email dengan tepat.",
      waktu: "20 menit",
      konten: [
        { type: "paragraf", text: "Attachment adalah fitur untuk melampirkan file pada email (Word, PDF, PowerPoint, foto, dsb). Caranya: Tulis pesan → klik ikon lampiran 📎 → pilih file → tunggu selesai diunggah → kirim." },
        { type: "paragraf", text: "CC (Carbon Copy) digunakan untuk mengirim salinan email ke orang lain, dan semua penerima bisa saling melihat siapa saja yang dikirimi. BCC (Blind Carbon Copy) mirip CC, tapi penerima lain TIDAK tahu ada BCC di dalamnya." },
        { type: "sehari-hari", text: "Bayangkan kamu memberi surat: To = penerima utama surat. CC = orang lain yang ikut diberi salinan dan semua orang tahu. BCC = orang yang diberi salinan tapi penerima lain tidak tahu." },
        { type: "tahukah", text: "Contoh nyata: siswa mengirim email ke guru dan memasukkan wali kelas di kolom CC, supaya wali kelas juga tahu isi email tersebut." }
      ],
      rangkuman: [
        "Attachment = melampirkan file pada email.",
        "CC = salinan yang terlihat oleh semua penerima.",
        "BCC = salinan yang tersembunyi dari penerima lain."
      ],
      praktik: {
        type: "match",
        judul: "Cocokkan Istilah dengan Penjelasannya",
        pasangan: [
          { kiri: "Attachment", kanan: "File yang dilampirkan pada email" },
          { kiri: "CC", kanan: "Salinan email yang terlihat oleh semua penerima" },
          { kiri: "BCC", kanan: "Salinan email yang tersembunyi dari penerima lain" },
          { kiri: "To", kanan: "Penerima utama email" }
        ]
      },
      quiz: [
        { soal: "Jika kamu ingin mengirim salinan email tanpa diketahui penerima lain, gunakan...", opsi: ["To", "CC", "BCC", "Subjek"], jawaban: 2, pembahasan: "BCC (Blind Carbon Copy) menyembunyikan penerima salinan dari penerima lain." },
        { soal: "Fitur untuk melampirkan file PDF pada email disebut...", opsi: ["CC", "BCC", "Attachment", "Signature"], jawaban: 2, pembahasan: "Attachment adalah fitur untuk melampirkan file pada email." }
      ]
    },

    /* ---------------- SUBBAB 7 ---------------- */
    {
      id: "kolaborasi-dokumen",
      judul: "Kolaborasi Dokumen Daring",
      tujuan: "Mampu berkolaborasi menggunakan dokumen daring, termasuk fitur comment dan suggestion.",
      waktu: "20 menit",
      konten: [
        { type: "paragraf", text: "Kolaborasi daring adalah kegiatan bekerja sama lewat internet menggunakan perangkat digital, misalnya beberapa siswa mengerjakan satu tugas kelompok bersama-sama di Google Docs pada saat yang sama." },
        { type: "contoh", title: "Aplikasi kolaborasi daring", items: [
          "Google Docs — untuk membuat dokumen/tulisan (contoh: makalah kelompok)",
          "Google Sheets — untuk mengolah data dalam tabel (contoh: data hasil pengamatan)",
          "Google Slides — untuk membuat presentasi (contoh: presentasi tugas kelompok)"
        ]},
        { type: "paragraf", text: "Comment digunakan untuk memberi masukan pada dokumen tanpa langsung mengubah isinya. Suggestion Mode digunakan untuk mengusulkan perubahan — perubahan itu bisa diterima atau ditolak oleh pemilik dokumen." },
        { type: "sehari-hari", text: "Saat mengerjakan tugas kelompok yang sedang dikerjakan bersama, anggota kelompok biasanya diberi akses Editor. Tapi kalau dokumen hanya ingin diperiksa guru, cukup diberi akses Viewer atau Commenter." }
      ],
      rangkuman: [
        "Kolaborasi daring memungkinkan banyak orang mengerjakan 1 dokumen bersama.",
        "Comment = memberi masukan tanpa mengubah isi.",
        "Suggestion Mode = mengusulkan perubahan (bisa diterima/ditolak).",
        "Izin akses: Viewer (lihat saja), Commenter (lihat+komentar), Editor (lihat+ubah)."
      ],
      praktik: {
        type: "case-study",
        judul: "Studi Kasus: Pilih Izin Akses yang Tepat",
        skenario: "Kelompokmu sedang bersama-sama mengetik laporan tugas di Google Docs, dan semua anggota perlu ikut menulis dan mengedit isinya.",
        pertanyaan: "Izin akses apa yang paling tepat diberikan kepada semua anggota kelompok?",
        opsi: ["Viewer", "Commenter", "Editor"],
        jawabanBenar: 2,
        feedbackBenar: "Benar! Karena semua anggota perlu ikut menulis & mengubah isi dokumen, akses Editor paling tepat.",
        feedbackSalah: "Belum tepat. Karena semua anggota perlu ikut MENULIS dan MENGUBAH dokumen (bukan cuma melihat atau berkomentar), izin yang paling tepat adalah Editor."
      },
      quiz: [
        { soal: "Fitur untuk mengusulkan perubahan pada dokumen (bisa diterima/ditolak) disebut...", opsi: ["Comment", "Suggestion Mode", "Viewer", "Attachment"], jawaban: 1, pembahasan: "Suggestion Mode memungkinkan usulan perubahan yang bisa diterima atau ditolak pemilik dokumen." },
        { soal: "Jika guru hanya perlu memeriksa dokumen tanpa mengubahnya, izin akses yang tepat adalah...", opsi: ["Editor", "Viewer atau Commenter", "Owner", "Admin"], jawaban: 1, pembahasan: "Viewer/Commenter cukup untuk melihat atau memberi komentar tanpa mengubah isi dokumen." }
      ]
    },

    /* ---------------- SUBBAB 8 ---------------- */
    {
      id: "rapat-daring",
      judul: "Rapat Daring & Video Conference",
      tujuan: "Menerapkan etika saat mengikuti rapat daring atau video conference.",
      waktu: "15 menit",
      konten: [
        { type: "paragraf", text: "Video conference adalah kegiatan pertemuan lewat internet dengan suara dan/atau video, misalnya Google Meet atau Zoom. Bisa dipakai untuk pembelajaran, rapat organisasi, diskusi kelompok, presentasi, dan pertemuan jarak jauh." },
        { type: "contoh", title: "Fitur dasar video conference", items: [
          "Mute/Unmute — mematikan/menyalakan mikrofon",
          "Camera — menyalakan/mematikan kamera",
          "Share Screen — menampilkan layar ke peserta lain"
        ]},
        { type: "dua-kolom", judulKiri: "✅ Sebelum & saat rapat", kiri: [
            "Masuk tepat waktu",
            "Periksa koneksi, mikrofon & kamera",
            "Matikan mikrofon saat tidak bicara",
            "Dengarkan orang yang sedang berbicara",
            "Gunakan bahasa yang sopan"
          ], judulKanan: "❌ Sebaiknya dihindari", kanan: [
            "Memotong pembicaraan orang lain",
            "Kamera menyala tapi berpakaian tidak sopan",
            "Latar belakang yang mengganggu"
          ]
        }
      ],
      rangkuman: [
        "Video conference = pertemuan daring dengan suara/video.",
        "Fitur dasar: Mute/Unmute, Camera, Share Screen.",
        "Etika penting: tepat waktu, matikan mic saat tidak bicara, sopan, dan fokus."
      ],
      praktik: {
        type: "mcq",
        judul: "Yuk Coba: Etika Rapat Daring",
        pertanyaan: "Saat kamu tidak sedang berbicara dalam rapat daring, sebaiknya mikrofonmu dalam kondisi...",
        opsi: ["Unmute (menyala) terus", "Mute (dimatikan)", "Dimatikan HP-nya", "Volume dimaksimalkan"],
        jawabanBenar: 1,
        feedbackBenar: "Betul! Mematikan mikrofon (mute) saat tidak berbicara membantu mengurangi suara bising bagi peserta lain.",
        feedbackSalah: "Belum tepat. Saat tidak berbicara, sebaiknya mikrofon di-mute supaya tidak mengganggu peserta lain dengan suara latar."
      },
      quiz: [
        { soal: "Fitur untuk menampilkan layar HP/laptop ke peserta rapat lain disebut...", opsi: ["Mute", "Share Screen", "Camera Off", "Chat"], jawaban: 1, pembahasan: "Share Screen digunakan untuk menampilkan layar perangkat kita ke peserta lain." },
        { soal: "Sikap yang tepat saat orang lain sedang berbicara dalam rapat daring adalah...", opsi: ["Memotong pembicaraan", "Mendengarkan dengan baik", "Mematikan kamera dan pergi", "Berbicara bersamaan"], jawaban: 1, pembahasan: "Mendengarkan tanpa memotong pembicaraan adalah etika dasar dalam rapat, termasuk rapat daring." }
      ]
    }
  ],

  bossChallenge: {
    judul: "👑 Boss Challenge: Krisis Email Kelompok",
    cerita: "Kelompokmu sedang menyiapkan tugas presentasi bersama. H-1 sebelum dikumpulkan, satu anggota kelompok (Rani) belum mengisi bagiannya di Google Docs, dan kalian butuh mengingatkan gurunya lewat email bahwa presentasi akan sedikit terlambat 1 hari.",
    tahapan: [
      {
        pertanyaan: "Langkah pertama, kamu ingin memastikan semua anggota bisa ikut menulis & menyunting dokumen presentasi bersama. Izin akses apa yang kamu berikan kepada seluruh anggota kelompok?",
        opsi: ["Viewer", "Commenter", "Editor"],
        jawabanBenar: 2,
        penjelasan: "Karena semua anggota perlu menulis dan menyunting bersama, izin yang tepat adalah Editor."
      },
      {
        pertanyaan: "Kamu ingin mengingatkan Rani untuk mengisi bagiannya, tapi tidak mau langsung mengubah tulisannya. Fitur apa yang paling tepat kamu gunakan di Google Docs?",
        opsi: ["Menghapus tulisan Rani langsung", "Memberi Comment pada bagian yang kosong", "Mengunci dokumen"],
        jawabanBenar: 1,
        penjelasan: "Comment cocok untuk memberi masukan/pengingat tanpa langsung mengubah isi dokumen."
      },
      {
        pertanyaan: "Sekarang kamu perlu menulis email ke guru untuk minta tambahan waktu 1 hari. Subjek email yang PALING TEPAT adalah...",
        opsi: ["\"Penting!!!\"", "\"Halo\"", "\"Permohonan Perpanjangan Waktu Tugas Kelompok – Kelas XI\""],
        jawabanBenar: 2,
        penjelasan: "Subjek yang jelas membantu guru langsung memahami maksud email tanpa harus membukanya dulu."
      },
      {
        pertanyaan: "Kamu ingin wali kelas juga tahu isi email tersebut, dan semua penerima boleh saling melihat siapa saja yang dikirimi. Fitur apa yang kamu gunakan?",
        opsi: ["CC", "BCC", "Attachment"],
        jawabanBenar: 0,
        penjelasan: "CC dipakai kalau semua penerima boleh saling tahu siapa saja yang menerima salinan email."
      },
      {
        pertanyaan: "Terakhir, kalian akan menjelaskan situasi ini langsung ke guru lewat Google Meet. Saat giliran teman kelompokmu berbicara menjelaskan, sikap yang tepat darimu adalah...",
        opsi: ["Ikut bicara bersamaan supaya cepat selesai", "Mute mikrofon dan mendengarkan", "Mematikan kamera dan meninggalkan rapat"],
        jawabanBenar: 1,
        penjelasan: "Mematikan mikrofon saat tidak berbicara dan mendengarkan adalah etika dasar rapat daring."
      }
    ],
    pesanSelesai: "🏆 Selamat! Kamu berhasil menyelesaikan Boss Challenge dan membuktikan bisa menerapkan seluruh materi Komunikasi Digital & Netiket dalam situasi nyata!"
  }
};

/* Jangan ubah baris di bawah ini */
if (typeof window !== "undefined") window.DEFAULT_MATERI = DEFAULT_MATERI;
