/* ============================================================
   GURU — Mode Guru: tempat memasukkan & mengedit materi
   Semua perubahan disimpan otomatis ke localStorage lewat
   tombol "Simpan Materi". Tidak menyentuh file data.js.
   ============================================================ */

const Guru = {
  kerja: null,      // salinan materi yang sedang diedit
  menuAktif: "dashboard",
  subbabAktif: null,

  render(root) {
    if (!this.kerja) this.kerja = JSON.parse(JSON.stringify(App.materi));
    root.innerHTML = `
      <div class="guru-shell">
        <aside class="guru-sidebar">
          <h3>👩‍🏫 Mode Guru</h3>
          <nav class="guru-menu">
            <button data-m="dashboard">📊 Dashboard</button>
            <button data-m="pengaturan">⚙️ Pengaturan Materi</button>
            <button data-m="subbab">📚 Subbab</button>
            <button data-m="import-export">📥 Import / Export</button>
          </nav>
          <a class="btn btn-ghost btn-sm" href="#/beranda" style="margin-top:16px;display:block;text-align:center">← Keluar Mode Guru</a>
        </aside>
        <div class="guru-content" id="guru-content"></div>
      </div>
    `;
    root.querySelectorAll(".guru-menu button").forEach(b => {
      b.classList.toggle("guru-menu-aktif", b.dataset.m === this.menuAktif);
      b.onclick = () => { this.menuAktif = b.dataset.m; this.render(root); };
    });
    this.renderKonten(document.getElementById("guru-content"));
  },

  renderKonten(el) {
    if (this.menuAktif === "dashboard") return this.renderDashboard(el);
    if (this.menuAktif === "pengaturan") return this.renderPengaturan(el);
    if (this.menuAktif === "subbab") return this.subbabAktif ? this.renderEditSubbab(el) : this.renderDaftarSubbab(el);
    if (this.menuAktif === "import-export") return this.renderImportExport(el);
  },

  simpanBar(el) {
    const bar = document.createElement("div");
    bar.className = "guru-savebar";
    bar.innerHTML = `
      <button class="btn btn-primary" id="g-simpan">💾 Simpan Materi</button>
      <button class="btn btn-ghost" id="g-preview">👁 Preview</button>
      <button class="btn btn-outline" id="g-reset">↩️ Reset ke Bawaan</button>
      <span class="guru-savebar-info">Perubahan baru aktif untuk siswa setelah kamu klik "Simpan Materi".</span>
    `;
    el.appendChild(bar);
    document.getElementById("g-simpan").onclick = () => {
      Store.saveMateri(this.kerja);
      App.materi = JSON.parse(JSON.stringify(this.kerja));
      UI.toast("✅ Materi tersimpan! Siswa sekarang melihat versi terbaru.");
    };
    document.getElementById("g-preview").onclick = () => {
      Store.saveMateri(this.kerja);
      App.materi = JSON.parse(JSON.stringify(this.kerja));
      window.open("#/materi/" + (this.kerja.subbab[0]?.id || ""), "_blank");
    };
    document.getElementById("g-reset").onclick = () => {
      if (!confirm("Yakin ingin mengembalikan materi ke versi bawaan (contoh dummy)? Semua editan akan hilang.")) return;
      Store.resetMateri();
      this.kerja = JSON.parse(JSON.stringify(DEFAULT_MATERI));
      App.materi = Store.getMateri();
      UI.toast("Materi dikembalikan ke versi bawaan.");
      this.render(document.getElementById("view-root"));
    };
  },

  // ---------------- DASHBOARD ----------------
  renderDashboard(el) {
    const m = this.kerja;
    el.innerHTML = `
      <h2>📊 Dashboard Guru</h2>
      <p class="teks-mini">Ringkasan materi yang sedang aktif untuk siswa.</p>
      <div class="beranda-stat-row card">
        <div><strong>${m.subbab.length}</strong><span>Subbab</span></div>
        <div><strong>${m.subbab.reduce((a, s) => a + (s.quiz?.length || 0), 0)}</strong><span>Soal Kuis</span></div>
        <div><strong>${m.subbab.length}</strong><span>Aktivitas Praktik</span></div>
        <div><strong>${(m.glossary || []).length}</strong><span>Istilah Glosarium</span></div>
      </div>
      <div class="card">
        <h3>Judul Materi Saat Ini</h3>
        <p><strong>${m.judul}</strong> — ${m.subjudul}</p>
      </div>
    `;
  },

  // ---------------- PENGATURAN UMUM ----------------
  renderPengaturan(el) {
    const m = this.kerja;
    el.innerHTML = `
      <h2>⚙️ Pengaturan Materi</h2>
      <div class="card guru-form">
        <label>Judul Materi</label>
        <input class="input" id="g-judul" value="${this.esc(m.judul)}">
        <label>Subjudul</label>
        <input class="input" id="g-subjudul" value="${this.esc(m.subjudul)}">
        <label>Tujuan Pembelajaran (satu baris = satu tujuan)</label>
        <textarea class="textarea" id="g-tujuan" rows="6">${m.tujuanPembelajaran.join("\n")}</textarea>
        <label>Kamus Istilah (format: Istilah :: Penjelasan — satu baris satu istilah)</label>
        <textarea class="textarea" id="g-glossary" rows="6">${(m.glossary || []).map(g => `${g.term} :: ${g.def}`).join("\n")}</textarea>
        <button class="btn btn-primary btn-sm" id="g-simpan-pengaturan">Terapkan ke Draft</button>
      </div>
    `;
    document.getElementById("g-simpan-pengaturan").onclick = () => {
      m.judul = document.getElementById("g-judul").value.trim();
      m.subjudul = document.getElementById("g-subjudul").value.trim();
      m.tujuanPembelajaran = document.getElementById("g-tujuan").value.split("\n").map(t => t.trim()).filter(Boolean);
      m.glossary = document.getElementById("g-glossary").value.split("\n").filter(Boolean).map(line => {
        const [term, ...rest] = line.split("::");
        return { term: (term || "").trim(), def: rest.join("::").trim() };
      });
      UI.toast("Draft diperbarui. Klik 'Simpan Materi' di bawah untuk mengaktifkan.");
      this.render(document.getElementById("view-root"));
    };
    this.simpanBar(el);
  },

  // ---------------- DAFTAR SUBBAB ----------------
  renderDaftarSubbab(el) {
    const m = this.kerja;
    el.innerHTML = `
      <h2>📚 Subbab Materi</h2>
      <button class="btn btn-primary btn-sm" id="g-tambah-subbab">➕ Tambah Subbab Baru</button>
      <div class="guru-subbab-list">
        ${m.subbab.map((s, i) => `
          <div class="guru-subbab-row">
            <span>${i + 1}. <strong>${this.esc(s.judul)}</strong></span>
            <div>
              <button class="btn btn-ghost btn-sm" data-up="${i}">↑</button>
              <button class="btn btn-ghost btn-sm" data-down="${i}">↓</button>
              <button class="btn btn-outline btn-sm" data-edit="${s.id}">✏️ Edit</button>
              <button class="btn btn-outline btn-sm" data-del="${s.id}">🗑️ Hapus</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    document.getElementById("g-tambah-subbab").onclick = () => {
      const id = "subbab-" + Date.now();
      m.subbab.push({
        id, judul: "Subbab Baru", tujuan: "Tuliskan tujuan subbab ini.", waktu: "15 menit",
        konten: [{ type: "paragraf", text: "Tulis penjelasan materi di sini." }],
        rangkuman: ["Poin rangkuman 1"],
        praktik: { type: "mcq", judul: "Yuk Coba", pertanyaan: "Tulis pertanyaan di sini?", opsi: ["Opsi A", "Opsi B"], jawabanBenar: 0, feedbackBenar: "Benar!", feedbackSalah: "Coba lagi." },
        quiz: []
      });
      this.subbabAktif = id;
      this.menuAktif = "subbab";
      this.render(document.getElementById("view-root"));
    };
    el.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => { this.subbabAktif = b.dataset.edit; this.render(document.getElementById("view-root")); });
    el.querySelectorAll("[data-del]").forEach(b => b.onclick = () => {
      if (!confirm("Hapus subbab ini dari draft?")) return;
      m.subbab = m.subbab.filter(s => s.id !== b.dataset.del);
      this.render(document.getElementById("view-root"));
    });
    el.querySelectorAll("[data-up]").forEach(b => b.onclick = () => { const i = +b.dataset.up; if (i > 0) [m.subbab[i - 1], m.subbab[i]] = [m.subbab[i], m.subbab[i - 1]]; this.render(document.getElementById("view-root")); });
    el.querySelectorAll("[data-down]").forEach(b => b.onclick = () => { const i = +b.dataset.down; if (i < m.subbab.length - 1) [m.subbab[i + 1], m.subbab[i]] = [m.subbab[i], m.subbab[i + 1]]; this.render(document.getElementById("view-root")); });
    this.simpanBar(el);
  },

  // ---------------- EDIT SATU SUBBAB ----------------
  renderEditSubbab(el) {
    const s = this.kerja.subbab.find(x => x.id === this.subbabAktif);
    if (!s) { this.subbabAktif = null; return this.renderDaftarSubbab(el); }

    el.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="g-kembali">← Kembali ke Daftar Subbab</button>
      <h2>✏️ Edit Subbab</h2>
      <div class="card guru-form">
        <label>Judul Subbab</label>
        <input class="input" id="g-s-judul" value="${this.esc(s.judul)}">
        <label>Tujuan Subbab</label>
        <input class="input" id="g-s-tujuan" value="${this.esc(s.tujuan)}">
        <label>Estimasi Waktu</label>
        <input class="input" id="g-s-waktu" value="${this.esc(s.waktu || "")}">
      </div>

      <div class="card">
        <h3>📄 Blok Konten</h3>
        <div id="g-konten-list"></div>
        <div class="guru-tambah-blok">
          <select id="g-jenis-blok" class="input">
            <option value="paragraf">Teks / Paragraf</option>
            <option value="contoh">Contoh (daftar poin)</option>
            <option value="sehari-hari">Contoh Kehidupan Sehari-hari</option>
            <option value="tahukah">Tahukah Kamu?</option>
            <option value="gambar">Gambar (upload/URL)</option>
            <option value="video">Video YouTube (URL)</option>
            <option value="link">Link Website</option>
          </select>
          <button class="btn btn-outline btn-sm" id="g-tambah-blok">➕ Tambah Blok</button>
        </div>
      </div>

      <div class="card">
        <h3>📝 Rangkuman (satu baris = satu poin)</h3>
        <textarea class="textarea" id="g-s-rangkuman" rows="4">${(s.rangkuman || []).join("\n")}</textarea>
      </div>

      <div class="card">
        <h3>🎮 Praktik Singkat</h3>
        <label>Jenis Aktivitas</label>
        <select class="input" id="g-praktik-jenis">
          <option value="mcq" ${s.praktik.type === "mcq" ? "selected" : ""}>Pilihan Ganda</option>
          <option value="true-false" ${s.praktik.type === "true-false" ? "selected" : ""}>Benar / Salah</option>
          <option value="case-study" ${s.praktik.type === "case-study" ? "selected" : ""}>Studi Kasus</option>
          <option value="lanjutan" ${["categorize","order","match"].includes(s.praktik.type) ? "selected" : ""}>Lanjutan (Drag/Urutkan/Cocokkan) — edit JSON</option>
        </select>
        <div id="g-praktik-editor"></div>
      </div>

      <div class="card">
        <h3>🧩 Soal Kuis</h3>
        <div id="g-quiz-list"></div>
        <button class="btn btn-outline btn-sm" id="g-tambah-soal">➕ Tambah Soal Kuis</button>
      </div>
    `;

    document.getElementById("g-kembali").onclick = () => { this.subbabAktif = null; this.render(document.getElementById("view-root")); };
    document.getElementById("g-s-judul").onchange = e => s.judul = e.target.value;
    document.getElementById("g-s-tujuan").onchange = e => s.tujuan = e.target.value;
    document.getElementById("g-s-waktu").onchange = e => s.waktu = e.target.value;
    document.getElementById("g-s-rangkuman").onchange = e => s.rangkuman = e.target.value.split("\n").map(t => t.trim()).filter(Boolean);

    this.renderKontenBlok(document.getElementById("g-konten-list"), s);
    document.getElementById("g-tambah-blok").onclick = () => {
      const jenis = document.getElementById("g-jenis-blok").value;
      const base = { paragraf: { type: "paragraf", text: "Teks baru..." },
        contoh: { type: "contoh", title: "Contoh", items: ["Poin 1"] },
        "sehari-hari": { type: "sehari-hari", text: "Contoh sehari-hari..." },
        tahukah: { type: "tahukah", text: "Fakta menarik..." },
        gambar: { type: "gambar", url: "", alt: "", keterangan: "" },
        video: { type: "video", url: "" },
        link: { type: "link", url: "", label: "" } }[jenis];
      s.konten.push(base);
      this.render(document.getElementById("view-root"));
    };

    this.renderPraktikEditor(document.getElementById("g-praktik-editor"), s);
    document.getElementById("g-praktik-jenis").onchange = e => {
      const jenis = e.target.value;
      if (jenis === "lanjutan") { if (!["categorize","order","match"].includes(s.praktik.type)) s.praktik = { type: "categorize", judul: "Aktivitas Lanjutan", instruksi: "...", kategori: ["A","B"], item: [] }; }
      else s.praktik = jenis === "mcq" ? { type: "mcq", judul: "Yuk Coba", pertanyaan: "", opsi: ["Opsi A", "Opsi B"], jawabanBenar: 0, feedbackBenar: "", feedbackSalah: "" }
        : jenis === "true-false" ? { type: "true-false", judul: "Benar atau Salah", soal: [{ pernyataan: "", jawaban: true, penjelasan: "" }] }
        : { type: "case-study", judul: "Studi Kasus", skenario: "", pertanyaan: "", opsi: ["Opsi A", "Opsi B"], jawabanBenar: 0, feedbackBenar: "", feedbackSalah: "" };
      this.render(document.getElementById("view-root"));
    };

    this.renderQuizList(document.getElementById("g-quiz-list"), s);
    document.getElementById("g-tambah-soal").onclick = () => {
      s.quiz = s.quiz || [];
      s.quiz.push({ soal: "Pertanyaan baru?", opsi: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"], jawaban: 0, pembahasan: "" });
      this.render(document.getElementById("view-root"));
    };

    this.simpanBar(el);
  },

  renderKontenBlok(el, s) {
    el.innerHTML = "";
    s.konten.forEach((b, i) => {
      const row = document.createElement("div");
      row.className = "guru-blok";
      if (b.type === "paragraf") {
        row.innerHTML = `<label>Teks/Paragraf</label><textarea class="textarea" rows="3">${this.esc(b.text)}</textarea>`;
        row.querySelector("textarea").onchange = e => b.text = e.target.value;
      } else if (b.type === "contoh") {
        row.innerHTML = `<label>Judul Contoh</label><input class="input" value="${this.esc(b.title)}"><label>Poin (satu baris satu poin)</label><textarea class="textarea" rows="3">${b.items.join("\n")}</textarea>`;
        row.querySelector("input").onchange = e => b.title = e.target.value;
        row.querySelector("textarea").onchange = e => b.items = e.target.value.split("\n").filter(Boolean);
      } else if (b.type === "sehari-hari" || b.type === "tahukah") {
        row.innerHTML = `<label>${b.type === "tahukah" ? "Tahukah Kamu?" : "Contoh Sehari-hari"}</label><textarea class="textarea" rows="2">${this.esc(b.text)}</textarea>`;
        row.querySelector("textarea").onchange = e => b.text = e.target.value;
      } else if (b.type === "gambar") {
        row.innerHTML = `<label>URL Gambar</label><input class="input" placeholder="https://..." value="${this.esc(b.url || "")}">
          <label>atau Upload dari perangkat</label><input type="file" accept="image/*" class="input">
          <label>Keterangan gambar (opsional)</label><input class="input" value="${this.esc(b.keterangan || "")}">`;
        row.querySelectorAll("input")[0].onchange = e => b.url = e.target.value;
        row.querySelectorAll("input")[1].onchange = e => {
          const f = e.target.files[0]; if (!f) return;
          const reader = new FileReader();
          reader.onload = ev => { b.url = ev.target.result; UI.toast("Gambar ditambahkan (tersimpan di draft)."); };
          reader.readAsDataURL(f);
        };
        row.querySelectorAll("input")[2].onchange = e => b.keterangan = e.target.value;
      } else if (b.type === "video") {
        row.innerHTML = `<label>URL Video YouTube</label><input class="input" placeholder="https://youtube.com/watch?v=..." value="${this.esc(b.url || "")}">`;
        row.querySelector("input").onchange = e => b.url = e.target.value;
      } else if (b.type === "link") {
        row.innerHTML = `<label>Label Link</label><input class="input" value="${this.esc(b.label || "")}"><label>URL</label><input class="input" value="${this.esc(b.url || "")}">`;
        row.querySelectorAll("input")[0].onchange = e => b.label = e.target.value;
        row.querySelectorAll("input")[1].onchange = e => b.url = e.target.value;
      }
      const hapus = document.createElement("button");
      hapus.className = "btn btn-outline btn-sm guru-blok-hapus";
      hapus.textContent = "🗑️ Hapus blok ini";
      hapus.onclick = () => { s.konten.splice(i, 1); this.render(document.getElementById("view-root")); };
      row.appendChild(hapus);
      el.appendChild(row);
    });
  },

  renderPraktikEditor(el, s) {
    const p = s.praktik;
    if (p.type === "mcq" || p.type === "case-study") {
      el.innerHTML = `
        <label>Judul Aktivitas</label><input class="input" id="pj" value="${this.esc(p.judul || "")}">
        ${p.type === "case-study" ? `<label>Skenario</label><textarea class="textarea" rows="2" id="pk">${this.esc(p.skenario || "")}</textarea>` : ""}
        <label>Pertanyaan</label><textarea class="textarea" rows="2" id="pp">${this.esc(p.pertanyaan || "")}</textarea>
        <label>Pilihan Jawaban (satu baris satu pilihan)</label>
        <textarea class="textarea" rows="4" id="po">${(p.opsi || []).join("\n")}</textarea>
        <label>Nomor pilihan yang benar (mulai dari 1)</label>
        <input class="input" type="number" min="1" id="pb" value="${(p.jawabanBenar || 0) + 1}">
        <label>Feedback jika benar</label><input class="input" id="pfb" value="${this.esc(p.feedbackBenar || "")}">
        <label>Feedback jika salah</label><input class="input" id="pfs" value="${this.esc(p.feedbackSalah || "")}">
      `;
      document.getElementById("pj").onchange = e => p.judul = e.target.value;
      const pk = document.getElementById("pk"); if (pk) pk.onchange = e => p.skenario = e.target.value;
      document.getElementById("pp").onchange = e => p.pertanyaan = e.target.value;
      document.getElementById("po").onchange = e => p.opsi = e.target.value.split("\n").filter(Boolean);
      document.getElementById("pb").onchange = e => p.jawabanBenar = Math.max(0, (+e.target.value || 1) - 1);
      document.getElementById("pfb").onchange = e => p.feedbackBenar = e.target.value;
      document.getElementById("pfs").onchange = e => p.feedbackSalah = e.target.value;
    } else if (p.type === "true-false") {
      el.innerHTML = `<label>Judul Aktivitas</label><input class="input" id="pj" value="${this.esc(p.judul || "")}">
        <p class="teks-mini">Pernyataan (format per baris: <code>pernyataan | benar/salah | penjelasan</code>)</p>
        <textarea class="textarea" rows="5" id="ptf">${(p.soal || []).map(x => `${x.pernyataan} | ${x.jawaban ? "benar" : "salah"} | ${x.penjelasan}`).join("\n")}</textarea>`;
      document.getElementById("pj").onchange = e => p.judul = e.target.value;
      document.getElementById("ptf").onchange = e => {
        p.soal = e.target.value.split("\n").filter(Boolean).map(line => {
          const [pernyataan, jawaban, ...pj] = line.split("|");
          return { pernyataan: (pernyataan || "").trim(), jawaban: (jawaban || "").trim().toLowerCase().startsWith("b") && !(jawaban||"").trim().toLowerCase().startsWith("bs"), penjelasan: pj.join("|").trim() };
        });
      };
    } else {
      el.innerHTML = `<p class="teks-mini">Jenis aktivitas ini (Drag & Drop / Urutkan / Mencocokkan) diedit dalam format JSON supaya tetap fleksibel. Salin pola dari subbab contoh bila perlu.</p>
        <textarea class="textarea" rows="10" id="pjson">${this.esc(JSON.stringify(p, null, 2))}</textarea>
        <button class="btn btn-outline btn-sm" id="p-terapkan-json">Terapkan JSON</button>`;
      document.getElementById("p-terapkan-json").onclick = () => {
        try { s.praktik = JSON.parse(document.getElementById("pjson").value); UI.toast("Konfigurasi praktik diperbarui."); }
        catch (e) { UI.toast("Format JSON tidak valid, cek kembali tanda kurung/koma."); }
      };
    }
  },

  renderQuizList(el, s) {
    el.innerHTML = "";
    (s.quiz || []).forEach((q, i) => {
      const box = document.createElement("div");
      box.className = "guru-blok";
      box.innerHTML = `
        <label>Soal ${i + 1}</label>
        <input class="input" value="${this.esc(q.soal)}">
        <label>Pilihan (satu baris satu pilihan)</label>
        <textarea class="textarea" rows="4">${q.opsi.join("\n")}</textarea>
        <label>Nomor jawaban benar (mulai dari 1)</label>
        <input class="input" type="number" min="1" value="${q.jawaban + 1}">
        <label>Pembahasan</label>
        <input class="input" value="${this.esc(q.pembahasan || "")}">
        <button class="btn btn-outline btn-sm guru-blok-hapus">🗑️ Hapus soal ini</button>
      `;
      const inputs = box.querySelectorAll("input, textarea");
      inputs[0].onchange = e => q.soal = e.target.value;
      inputs[1].onchange = e => q.opsi = e.target.value.split("\n").filter(Boolean);
      inputs[2].onchange = e => q.jawaban = Math.max(0, (+e.target.value || 1) - 1);
      inputs[3].onchange = e => q.pembahasan = e.target.value;
      box.querySelector(".guru-blok-hapus").onclick = () => { s.quiz.splice(i, 1); this.render(document.getElementById("view-root")); };
      el.appendChild(box);
    });
  },

  // ---------------- IMPORT / EXPORT ----------------
  renderImportExport(el) {
    el.innerHTML = `
      <h2>📥 Import / Export Materi</h2>
      <div class="card">
        <h3>Export (Cadangkan Materi)</h3>
        <p class="teks-mini">Unduh materi saat ini sebagai file JSON untuk dicadangkan atau dipindahkan ke komputer lain.</p>
        <button class="btn btn-primary btn-sm" id="g-export">⬇️ Download materi.json</button>
      </div>
      <div class="card">
        <h3>Import Materi</h3>
        <p class="teks-mini">Unggah file materi.json untuk menggantikan draft yang sedang diedit.</p>
        <input type="file" accept="application/json" id="g-import" class="input">
      </div>
    `;
    document.getElementById("g-export").onclick = () => {
      const blob = new Blob([JSON.stringify(this.kerja, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "materi.json";
      a.click();
    };
    document.getElementById("g-import").onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try { this.kerja = JSON.parse(ev.target.result); UI.toast("Materi berhasil diimpor ke draft. Jangan lupa klik Simpan."); this.menuAktif = "dashboard"; this.render(document.getElementById("view-root")); }
        catch (err) { UI.toast("File tidak valid."); }
      };
      reader.readAsText(f);
    };
    this.simpanBar(el);
  },

  esc(str) { return (str || "").toString().replace(/"/g, "&quot;"); },
  val(v) { return ""; }
};
