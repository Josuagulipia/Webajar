/* ============================================================
   APP — routing & render semua halaman
   ============================================================ */

const App = {
  materi: null,
  progress: null,
  settings: null,
  root: null,

  init() {
    this.materi = Store.getMateri();
    this.progress = Store.getProgress();
    this.settings = Store.getSettings();
    this.root = document.getElementById("view-root");

    UI.applyDarkMode(this.settings.darkMode);
    document.getElementById("btn-dark").setAttribute("aria-pressed", this.settings.darkMode);
    document.getElementById("btn-sound").setAttribute("aria-pressed", this.settings.soundOn);

    document.getElementById("btn-dark").onclick = () => {
      this.settings.darkMode = !this.settings.darkMode;
      Store.saveSettings(this.settings);
      UI.applyDarkMode(this.settings.darkMode);
      document.getElementById("btn-dark").setAttribute("aria-pressed", this.settings.darkMode);
    };
    document.getElementById("btn-sound").onclick = () => {
      this.settings.soundOn = !this.settings.soundOn;
      Store.saveSettings(this.settings);
      document.getElementById("btn-sound").setAttribute("aria-pressed", this.settings.soundOn);
      UI.toast(this.settings.soundOn ? "🔊 Suara dinyalakan" : "🔇 Suara dimatikan");
    };
    document.getElementById("btn-guru").onclick = () => location.hash = "#/guru";
    document.getElementById("btn-search").oninput = (e) => this.renderPencarian(e.target.value);

    window.addEventListener("hashchange", () => this.route());
    this.route();
    this.refreshHeaderStats();
  },

  navRoute(hash) { location.hash = hash; },

  route() {
    UI.stopSpeak();
    const hash = location.hash.replace("#/", "") || "beranda";
    const [page, arg] = hash.split("/");
    this.setActiveNav(page);
    window.scrollTo(0, 0);

    const routes = {
      beranda: () => this.renderBeranda(),
      materi: () => arg ? this.renderSubbab(arg) : this.renderMateriList(),
      misi: () => this.renderMisi(),
      praktik: () => this.renderMateriList(true),
      kuis: () => this.renderKuisHub(),
      prestasi: () => this.renderPrestasi(),
      progress: () => this.renderProgressPage(),
      boss: () => this.renderBossChallenge(),
      glossary: () => this.renderGlossary(),
      game: () => this.renderMiniGame(),
      refleksi: () => this.renderRefleksi(),
      selesai: () => this.renderPenutup(),
      guru: () => Guru.render(this.root)
    };
    (routes[page] || routes.beranda)();
  },

  setActiveNav(page) {
    document.querySelectorAll("[data-nav]").forEach(a => {
      a.classList.toggle("nav-active", a.dataset.nav === page);
    });
  },

  refreshHeaderStats() {
    const xpEl = document.getElementById("stat-xp");
    const lvlEl = document.getElementById("stat-level");
    if (!xpEl) return;
    const lvl = Gamifikasi.hitungLevel(this.progress.xp);
    xpEl.textContent = this.progress.xp;
    lvlEl.textContent = `Lv.${lvl.level} ${lvl.nama}`;
  },

  // ============================================================
  // BERANDA
  // ============================================================
  renderBeranda() {
    const m = this.materi, p = this.progress;
    const persen = Math.round((p.subbabDibaca.length / m.subbab.length) * 100) || 0;
    this.root.innerHTML = `
      <section class="hero fade-in">
        <div class="hero-mascot">🦉</div>
        <div class="hero-text">
          <p class="hero-eyebrow">Selamat Datang di Petualangan Belajar</p>
          <h1>${m.judul}</h1>
          <p class="hero-sub">${m.subjudul}</p>
          <div class="hero-cta">
            <button class="btn btn-primary" id="btn-mulai">🚀 Mulai Belajar</button>
            <button class="btn btn-ghost" id="btn-lihat-materi">📚 Lihat Materi</button>
            <button class="btn btn-ghost" id="btn-praktik">🎮 Praktik</button>
            <button class="btn btn-ghost" id="btn-tantangan">🎯 Tantangan</button>
          </div>
        </div>
      </section>

      <section class="beranda-progress card">
        <div class="beranda-progress-head">
          <span>Progress Belajarmu</span><span>${persen}%</span>
        </div>
        <div class="progressbar"><div style="width:${persen}%"></div></div>
        <div class="beranda-stat-row">
          <div><strong>${p.xp}</strong><span>XP</span></div>
          <div><strong>${Gamifikasi.hitungLevel(p.xp).level}</strong><span>Level</span></div>
          <div><strong>${p.badge.length}</strong><span>Badge</span></div>
          <div><strong>${p.streak}</strong><span>🔥 Streak</span></div>
        </div>
      </section>

      <section class="beranda-tujuan card">
        <h3>🎯 Tujuan Pembelajaran</h3>
        <ul>${m.tujuanPembelajaran.map(t => `<li>${t}</li>`).join("")}</ul>
      </section>

      <section>
        <h3 class="section-title">📚 Lanjutkan Belajar</h3>
        <div class="grid-cards">
          ${m.subbab.map((s, i) => this.subbabCardHTML(s, i)).join("")}
        </div>
      </section>
    `;
    document.getElementById("btn-mulai").onclick = () => {
      const belum = m.subbab.find(s => !p.subbabDibaca.includes(s.id));
      location.hash = "#/materi/" + (belum ? belum.id : m.subbab[0].id);
    };
    document.getElementById("btn-lihat-materi").onclick = () => location.hash = "#/materi";
    document.getElementById("btn-praktik").onclick = () => location.hash = "#/praktik";
    document.getElementById("btn-tantangan").onclick = () => location.hash = "#/boss";
  },

  subbabCardHTML(s, i) {
    const dibaca = this.progress.subbabDibaca.includes(s.id);
    const praktikOk = this.progress.praktikSelesai.includes(s.id);
    const bookmarked = this.progress.bookmark.includes(s.id);
    return `
      <a class="subbab-card ${dibaca ? "subbab-card--dibaca" : ""}" href="#/materi/${s.id}">
        <div class="subbab-card-no">${dibaca ? "✓" : i + 1}</div>
        <div class="subbab-card-body">
          <h4>${s.judul} ${bookmarked ? "🔖" : ""}</h4>
          <p>${s.tujuan}</p>
          <div class="subbab-card-tags">
            <span>⏱ ${s.waktu}</span>
            ${praktikOk ? '<span class="tag-ok">🎮 Praktik selesai</span>' : ""}
          </div>
        </div>
      </a>`;
  },

  // ============================================================
  // DAFTAR MATERI
  // ============================================================
  renderMateriList(fokusPraktik = false) {
    const m = this.materi;
    this.root.innerHTML = `
      <section class="page-head">
        <h2>${fokusPraktik ? "🎮 Praktik & Aktivitas" : "📚 Daftar Materi"}</h2>
        <p>${fokusPraktik ? "Pilih subbab untuk langsung berlatih." : "Klik salah satu subbab untuk mulai belajar."}</p>
      </section>
      <div class="grid-cards" id="daftar-materi-grid">
        ${m.subbab.map((s, i) => this.subbabCardHTML(s, i)).join("")}
      </div>
    `;
  },

  renderPencarian(q) {
    q = q.trim().toLowerCase();
    if (!q) { if (location.hash.startsWith("#/materi")) this.renderMateriList(); return; }
    const hasil = this.materi.subbab.filter(s => {
      const teks = (s.judul + " " + s.tujuan + " " + JSON.stringify(s.konten)).toLowerCase();
      return teks.includes(q);
    });
    location.hash = "#/materi";
    this.root.innerHTML = `
      <section class="page-head"><h2>🔍 Hasil pencarian: "${q}"</h2><p>${hasil.length} subbab ditemukan</p></section>
      <div class="grid-cards">${hasil.length ? hasil.map((s, i) => this.subbabCardHTML(s, i)).join("") : "<p class='empty-state'>Tidak ada materi yang cocok. Coba kata kunci lain.</p>"}</div>
    `;
  },

  // ============================================================
  // DETAIL SUBBAB
  // ============================================================
  renderSubbab(id) {
    const m = this.materi, p = this.progress;
    const idx = m.subbab.findIndex(s => s.id === id);
    const s = m.subbab[idx];
    if (!s) { location.hash = "#/materi"; return; }

    const pertamaKali = !p.subbabDibaca.includes(s.id);
    if (pertamaKali) {
      p.subbabDibaca.push(s.id);
      Gamifikasi.tambahXP(p, XP_RULES.bacaMateri, `Membaca: ${s.judul}`);
      Gamifikasi.cekMisiSelesai(p);
    }

    const bookmarked = p.bookmark.includes(s.id);
    const notes = Store.getNotes();

    this.root.innerHTML = `
      <section class="subbab-header fade-in">
        <a class="back-link" href="#/materi">← Kembali ke Daftar Materi</a>
        <div class="subbab-header-row">
          <h1>${s.judul}</h1>
          <div class="subbab-header-aksi">
            <button class="icon-btn" id="btn-bookmark" title="Bookmark">${bookmarked ? "🔖" : "📑"}</button>
            <button class="icon-btn" id="btn-tts" title="Dengarkan materi">🔊</button>
          </div>
        </div>
        <p class="subbab-tujuan">🎯 ${s.tujuan} <span class="subbab-waktu">⏱ ${s.waktu}</span></p>
      </section>

      ${s.cobaDulu ? `
      <section class="card coba-dulu-box" id="coba-dulu">
        <h3>🤔 Sebelum Belajar...</h3>
        <p>${s.cobaDulu.pertanyaan}</p>
        <div class="opsi-list" id="coba-dulu-opsi">
          ${s.cobaDulu.opsi.map((o, i) => `<button class="opsi-btn" data-i="${i}">${o}</button>`).join("")}
        </div>
      </section>` : ""}

      <section class="konten-list" id="konten-list"></section>

      <section class="card">
        <h3>📝 Rangkuman Cepat</h3>
        <ul class="rangkuman-list">${s.rangkuman.map(r => `<li>${r}</li>`).join("")}</ul>
        <div class="rangkuman-paham">
          <span>Sudah paham?</span>
          <button class="btn btn-ghost btn-sm" id="btn-paham">😊 Sudah</button>
          <button class="btn btn-ghost btn-sm" id="btn-bingung">🤔 Masih bingung</button>
        </div>
        <div id="paham-area"></div>
        <button class="btn btn-outline btn-sm" id="btn-download-rangkuman">📥 Download Ringkasan</button>
      </section>

      <section class="card praktik-section" id="praktik-section">
        <div class="praktik-section-head">
          <h3>🎮 Praktik Singkat</h3>
          <button class="btn btn-ghost btn-sm" id="btn-ulangi-praktik">🔄 Ulangi</button>
        </div>
        <div id="praktik-container"></div>
      </section>

      <section class="card">
        <h3>🧠 Cek Pemahamanmu</h3>
        <p>Kalau kamu menjelaskan materi ini ke temanmu, apa yang akan kamu katakan?</p>
        <textarea id="cek-pemahaman" class="textarea" rows="3" placeholder="Tulis di sini...">${notes[s.id + "_cek"] || ""}</textarea>
      </section>

      ${s.quiz && s.quiz.length ? `
      <section class="card">
        <h3>🧩 Kuis Subbab Ini</h3>
        <p>Uji pemahamanmu dengan ${s.quiz.length} soal singkat.</p>
        <div id="kuis-container"></div>
      </section>` : ""}

      <section class="subbab-nav">
        ${idx > 0 ? `<a class="btn btn-ghost" href="#/materi/${m.subbab[idx - 1].id}">← ${m.subbab[idx - 1].judul}</a>` : "<span></span>"}
        ${idx < m.subbab.length - 1 ? `<a class="btn btn-primary" href="#/materi/${m.subbab[idx + 1].id}">${m.subbab[idx + 1].judul} →</a>` : `<a class="btn btn-primary" href="#/boss">👑 Boss Challenge →</a>`}
      </section>
    `;

    this.renderKonten(document.getElementById("konten-list"), s.konten);

    if (s.cobaDulu) {
      document.querySelectorAll("#coba-dulu-opsi .opsi-btn").forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll("#coba-dulu-opsi .opsi-btn").forEach(b => b.disabled = true);
          btn.classList.add("opsi-dipilih");
          const box = document.getElementById("coba-dulu");
          const p2 = document.createElement("p");
          p2.className = "coba-dulu-lanjut";
          p2.textContent = "Menarik! Sekarang yuk cek jawabanmu lewat materi di bawah ini. 👇";
          box.appendChild(p2);
        };
      });
    }

    document.getElementById("btn-bookmark").onclick = () => {
      const i = p.bookmark.indexOf(s.id);
      if (i === -1) { p.bookmark.push(s.id); UI.toast("🔖 Ditambahkan ke bookmark"); }
      else { p.bookmark.splice(i, 1); UI.toast("Bookmark dihapus"); }
      Store.saveProgress(p);
      document.getElementById("btn-bookmark").textContent = i === -1 ? "🔖" : "📑";
    };

    document.getElementById("btn-tts").onclick = () => {
      const teks = s.konten.filter(k => k.type === "paragraf").map(k => k.text).join(". ");
      UI.speak(`${s.judul}. ${teks}`);
    };

    document.getElementById("btn-paham").onclick = () => {
      document.getElementById("paham-area").innerHTML = `<p class="teks-mini">Mantap! Lanjutkan ke praktik di bawah 👇</p>`;
    };
    document.getElementById("btn-bingung").onclick = () => {
      document.getElementById("paham-area").innerHTML = `<button class="btn btn-outline btn-sm" id="btn-pelajari-lagi">Pelajari Lagi</button>`;
      document.getElementById("btn-pelajari-lagi").onclick = () => document.getElementById("konten-list").scrollIntoView({ behavior: "smooth" });
    };

    document.getElementById("btn-download-rangkuman").onclick = () => {
      const teks = `${s.judul}\n\nRangkuman:\n` + s.rangkuman.map(r => "- " + r).join("\n");
      const blob = new Blob([teks], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `Rangkuman - ${s.judul}.txt`;
      a.click();
    };

    document.getElementById("cek-pemahaman").addEventListener("change", (e) => {
      const n = Store.getNotes(); n[s.id + "_cek"] = e.target.value; Store.saveNotes(n);
    });

    const mulaiPraktik = () => {
      Aktivitas.render(document.getElementById("praktik-container"), s, (benar) => {
        if (benar && !p.praktikSelesai.includes(s.id)) {
          p.praktikSelesai.push(s.id);
          Gamifikasi.tambahXP(p, XP_RULES.praktikBenar, `Praktik selesai: ${s.judul}`);
          Gamifikasi.cekMisiSelesai(p);
        }
      });
    };
    mulaiPraktik();
    document.getElementById("btn-ulangi-praktik").onclick = mulaiPraktik;

    if (s.quiz && s.quiz.length) {
      const mulaiKuis = () => {
        Kuis.render(document.getElementById("kuis-container"), s, (benar, total) => {
          p.quizSkor[s.id] = { benar, total };
          Gamifikasi.tambahXP(p, benar * XP_RULES.jawabanBenarKuis, `Kuis "${s.judul}": ${benar}/${total} benar`);
          Gamifikasi.cekMisiSelesai(p);
        });
      };
      mulaiKuis();
    }
  },

  renderKonten(container, blocks) {
    blocks.forEach(b => {
      const div = document.createElement("div");
      div.className = "konten-block fade-in";
      if (b.type === "paragraf") {
        div.innerHTML = `<p>${b.text.replace(/\n/g, "<br>")}</p>`;
      } else if (b.type === "contoh") {
        div.className += " konten-contoh";
        div.innerHTML = `<h4>💡 ${b.title}</h4><ul>${b.items.map(it => `<li>${it}</li>`).join("")}</ul>`;
      } else if (b.type === "sehari-hari") {
        div.className += " konten-sehari";
        div.innerHTML = `<h4>📱 Contoh dalam Kehidupan Sehari-hari</h4><p>${b.text}</p>`;
      } else if (b.type === "tahukah") {
        div.className += " konten-tahukah";
        div.innerHTML = `<h4>💡 Tahukah Kamu?</h4><p>${b.text}</p>`;
      } else if (b.type === "dua-kolom") {
        div.className += " konten-dua-kolom";
        div.innerHTML = `
          <div class="dua-kolom-item dua-kolom-kiri"><h5>${b.judulKiri}</h5><ul>${b.kiri.map(x => `<li>${x}</li>`).join("")}</ul></div>
          <div class="dua-kolom-item dua-kolom-kanan"><h5>${b.judulKanan}</h5><ul>${b.kanan.map(x => `<li>${x}</li>`).join("")}</ul></div>
        `;
      } else if (b.type === "gambar") {
        div.className += " konten-gambar";
        div.innerHTML = `<img src="${b.url}" alt="${b.alt || ""}" loading="lazy">${b.keterangan ? `<p class="gambar-caption">${b.keterangan}</p>` : ""}`;
      } else if (b.type === "video") {
        div.className += " konten-video";
        const embedId = this.extractYoutubeId(b.url);
        div.innerHTML = embedId
          ? `<div class="video-wrap"><iframe src="https://www.youtube.com/embed/${embedId}" title="Video materi" allowfullscreen></iframe></div>`
          : `<p>Video: <a href="${b.url}" target="_blank" rel="noopener">${b.url}</a></p>`;
      } else if (b.type === "link") {
        div.className += " konten-link";
        div.innerHTML = `<a href="${b.url}" target="_blank" rel="noopener">🔗 ${b.label || b.url}</a>`;
      }
      container.appendChild(div);
    });
  },

  extractYoutubeId(url) {
    const m = url && url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{6,})/);
    return m ? m[1] : null;
  },

  // ============================================================
  // MISI HARIAN
  // ============================================================
  renderMisi() {
    const p = this.progress;
    const misi = Gamifikasi.misiHarianList(this.materi, p);
    const semuaSelesai = misi.every(m => m.selesai);
    this.root.innerHTML = `
      <section class="page-head"><h2>🎯 Misi Hari Ini</h2><p>Selesaikan misi untuk mendapatkan XP tambahan!</p></section>
      <div class="misi-list">
        ${misi.map((m, i) => `
          <div class="misi-item ${m.selesai ? "misi-item--selesai" : ""}">
            <div class="misi-icon">${m.icon}</div>
            <div class="misi-body">
              <strong>Misi ${i + 1}</strong>
              <p>${m.label}</p>
            </div>
            <div class="misi-xp">${m.selesai ? "✓" : `+${m.xp} XP`}</div>
          </div>
        `).join("")}
      </div>
      ${semuaSelesai ? `<div class="card misi-selesai-box fade-in"><h3>🎉 MISI SELESAI!</h3><p>Semua misi hari ini sudah kamu selesaikan. Hebat!</p></div>` : ""}
    `;
  },

  // ============================================================
  // KUIS HUB
  // ============================================================
  renderKuisHub() {
    const m = this.materi, p = this.progress;
    this.root.innerHTML = `
      <section class="page-head"><h2>🧩 Kuis Interaktif</h2><p>Pilih subbab untuk mengerjakan kuisnya.</p></section>
      <div class="grid-cards">
        ${m.subbab.filter(s => s.quiz && s.quiz.length).map(s => {
          const skor = p.quizSkor[s.id];
          return `<a class="subbab-card" href="#/materi/${s.id}">
            <div class="subbab-card-no">🧩</div>
            <div class="subbab-card-body">
              <h4>${s.judul}</h4>
              <p>${s.quiz.length} soal</p>
              ${skor ? `<span class="tag-ok">Skor: ${skor.benar}/${skor.total}</span>` : ""}
            </div>
          </a>`;
        }).join("")}
      </div>
    `;
  },

  // ============================================================
  // PRESTASI
  // ============================================================
  renderPrestasi() {
    const p = this.progress;
    this.root.innerHTML = `
      <section class="page-head"><h2>🏆 Prestasi & Badge</h2><p>Kumpulkan semua badge dengan aktif belajar!</p></section>
      <div class="badge-grid">
        ${BADGES.map(b => {
          const punya = p.badge.includes(b.id);
          return `<div class="badge-item ${punya ? "badge-item--punya" : "badge-item--kunci"}">
            <div class="badge-icon">${punya ? b.icon : "🔒"}</div>
            <strong>${b.label}</strong>
            <p>${b.desc}</p>
          </div>`;
        }).join("")}
      </div>
      <section class="card" style="margin-top:20px">
        <h3>📊 Rekap Nilai Kuis</h3>
        ${Object.keys(p.quizSkor).length ? `
        <table class="rekap-table">
          <thead><tr><th>Subbab</th><th>Skor</th></tr></thead>
          <tbody>
          ${Object.entries(p.quizSkor).map(([id, sk]) => {
            const s = this.materi.subbab.find(x => x.id === id);
            return `<tr><td>${s ? s.judul : id}</td><td>${sk.benar}/${sk.total}</td></tr>`;
          }).join("")}
          </tbody>
        </table>` : `<p class="empty-state">Belum ada kuis yang dikerjakan.</p>`}
      </section>
      <div class="page-cta"><a class="btn btn-primary" href="#/selesai">📄 Lihat Ringkasan Akhir</a></div>
    `;
  },

  // ============================================================
  // PROGRESS
  // ============================================================
  renderProgressPage() {
    const m = this.materi, p = this.progress;
    const persen = Math.round((p.subbabDibaca.length / m.subbab.length) * 100) || 0;
    const lvl = Gamifikasi.hitungLevel(p.xp);
    const next = Gamifikasi.progresKeLevelBerikutnya(p.xp);
    this.root.innerHTML = `
      <section class="page-head"><h2>📊 Progress Belajar</h2></section>
      <section class="card">
        <div class="beranda-progress-head"><span>Materi Selesai</span><span>${persen}%</span></div>
        <div class="progressbar"><div style="width:${persen}%"></div></div>
        <ul class="progress-subbab-list">
          ${m.subbab.map(s => `<li>${p.subbabDibaca.includes(s.id) ? "✓" : "🔒"} ${s.judul}</li>`).join("")}
        </ul>
      </section>
      <section class="card">
        <div class="beranda-progress-head"><span>Level ${lvl.level} — ${lvl.nama}</span><span>${next.next ? next.persen + "%" : "MAX"}</span></div>
        <div class="progressbar progressbar--accent"><div style="width:${next.persen}%"></div></div>
        <p class="teks-mini">${next.next ? `${next.next.minXP - p.xp} XP lagi menuju Level ${next.next.level} (${next.next.nama})` : "Kamu sudah mencapai level tertinggi!"}</p>
      </section>
      <div class="beranda-stat-row card">
        <div><strong>${p.xp}</strong><span>XP</span></div>
        <div><strong>${lvl.level}</strong><span>Level</span></div>
        <div><strong>${p.badge.length}</strong><span>Badge</span></div>
        <div><strong>${p.misiSelesai.length}</strong><span>Misi Selesai</span></div>
      </div>
      <section class="card">
        <h3>🕒 Riwayat Aktivitas</h3>
        ${p.riwayatAktivitas.length ? `<ul class="riwayat-list">${p.riwayatAktivitas.slice(0, 12).map(r => `<li><span>${r.ket}</span><strong>+${r.xp} XP</strong></li>`).join("")}</ul>` : `<p class="empty-state">Belum ada aktivitas.</p>`}
      </section>
    `;
  },

  // ============================================================
  // BOSS CHALLENGE
  // ============================================================
  renderBossChallenge() {
    const bc = this.materi.bossChallenge;
    const p = this.progress;
    if (p.bossChallengeSelesai) {
      this.root.innerHTML = `
        <section class="page-head"><h2>${bc.judul}</h2></section>
        <div class="card boss-selesai-box">
          <div class="modal-emoji">🏆</div>
          <p>${bc.pesanSelesai}</p>
          <a class="btn btn-primary" href="#/selesai">Lihat Ringkasan Akhir</a>
        </div>`;
      return;
    }
    const belumSemuaSubbab = this.materi.subbab.some(s => !p.subbabDibaca.includes(s.id));
    this.root.innerHTML = `
      <section class="page-head boss-head"><h2>${bc.judul}</h2><p>Tantangan akhir yang menggabungkan semua materi yang sudah kamu pelajari.</p></section>
      ${belumSemuaSubbab ? `<div class="card"><p>⚠️ Sebaiknya selesaikan dulu semua subbab materi sebelum mencoba Boss Challenge, supaya kamu lebih siap!</p><a class="btn btn-ghost" href="#/materi">Ke Daftar Materi</a></div>` : ""}
      <div class="card boss-cerita"><p>📖 ${bc.cerita}</p></div>
      <div class="card" id="boss-container"></div>
    `;
    let tahap = 0, benar = 0;
    const cont = document.getElementById("boss-container");
    const tampil = () => {
      const t = bc.tahapan[tahap];
      cont.innerHTML = `
        <div class="kuis-progress">TAHAP ${tahap + 1}/${bc.tahapan.length}</div>
        <div class="kuis-progressbar"><div style="width:${(tahap / bc.tahapan.length) * 100}%"></div></div>
        <p class="aktivitas-pertanyaan">${t.pertanyaan}</p>
        <div class="opsi-list"></div>
      `;
      const list = cont.querySelector(".opsi-list");
      t.opsi.forEach((o, i) => {
        const btn = document.createElement("button");
        btn.className = "opsi-btn";
        btn.textContent = o;
        btn.onclick = () => {
          UI.mainkanSuara("klik");
          const tepat = i === t.jawabanBenar;
          if (tepat) benar++;
          [...list.children].forEach((b, j) => { b.disabled = true; if (j === t.jawabanBenar) b.classList.add("opsi-benar"); else if (j === i) b.classList.add("opsi-salah"); });
          Aktivitas.feedback(cont, tepat, t.penjelasan, t.penjelasan);
          const next = document.createElement("button");
          next.className = "btn btn-primary btn-lanjut-kuis";
          next.textContent = tahap < bc.tahapan.length - 1 ? "Lanjut →" : "Selesaikan Boss Challenge";
          next.onclick = () => { tahap++; if (tahap < bc.tahapan.length) tampil(); else selesai(); };
          cont.appendChild(next);
        };
        list.appendChild(btn);
      });
    };
    const selesai = () => {
      p.bossChallengeSelesai = true;
      Gamifikasi.tambahXP(p, XP_RULES.bossChallenge, "Menyelesaikan Boss Challenge");
      cont.innerHTML = `<div class="modal-center"><div class="modal-emoji">🏆</div><h3>Selesai!</h3><p>Kamu menjawab benar ${benar}/${bc.tahapan.length} tahap.</p><p>${bc.pesanSelesai}</p><a class="btn btn-primary" href="#/selesai">Lihat Ringkasan Akhir</a></div>`;
      UI.confettiRingan();
    };
    tampil();
  },

  // ============================================================
  // GLOSSARY
  // ============================================================
  renderGlossary() {
    const g = this.materi.glossary || [];
    this.root.innerHTML = `
      <section class="page-head"><h2>📚 Kamus Istilah</h2><p>Istilah penting dalam materi ini.</p></section>
      <div class="glossary-list">
        ${g.map(x => `<div class="glossary-item"><strong>${x.term}</strong><p>${x.def}</p></div>`).join("")}
      </div>
      <div class="page-cta"><a class="btn btn-ghost" href="#/game">🎮 Main Tebak Istilah →</a></div>
    `;
  },

  // ============================================================
  // MINI GAME — Tebak Istilah (flashcard flip)
  // ============================================================
  renderMiniGame() {
    const g = this.materi.glossary || [];
    let idx = 0, terbalik = false;
    this.root.innerHTML = `
      <section class="page-head"><h2>🎮 Mini Game: Tebak Istilah</h2><p>Baca istilahnya, coba tebak dulu, lalu ketuk kartu untuk lihat jawabannya.</p></section>
      <div class="flashcard-wrap">
        <div class="flashcard" id="flashcard"><div class="flashcard-inner" id="flashcard-inner"></div></div>
        <div class="flashcard-nav">
          <button class="btn btn-ghost" id="fc-prev">← Sebelumnya</button>
          <span id="fc-counter"></span>
          <button class="btn btn-ghost" id="fc-next">Berikutnya →</button>
        </div>
      </div>
    `;
    const inner = document.getElementById("flashcard-inner");
    const counter = document.getElementById("fc-counter");
    const render = () => {
      terbalik = false;
      const item = g[idx];
      inner.className = "flashcard-inner";
      inner.innerHTML = `<div class="flashcard-face flashcard-front">${item.term}</div><div class="flashcard-face flashcard-back">${item.def}</div>`;
      counter.textContent = `${idx + 1} / ${g.length}`;
    };
    document.getElementById("flashcard").onclick = () => {
      terbalik = !terbalik;
      inner.classList.toggle("flashcard-inner--flip", terbalik);
      UI.mainkanSuara("klik");
    };
    document.getElementById("fc-prev").onclick = () => { idx = (idx - 1 + g.length) % g.length; render(); };
    document.getElementById("fc-next").onclick = () => { idx = (idx + 1) % g.length; render(); };
    render();
  },

  // ============================================================
  // REFLEKSI
  // ============================================================
  renderRefleksi() {
    const notes = Store.getNotes();
    const pertanyaan = [
      "Apa hal baru yang kamu pelajari?",
      "Bagian mana yang paling kamu pahami?",
      "Bagian mana yang masih membingungkan?",
      "Apa contoh penerapan materi ini dalam kehidupan sehari-hari?"
    ];
    this.root.innerHTML = `
      <section class="page-head"><h2>🪞 Refleksi Pembelajaran</h2><p>Tuliskan refleksimu setelah belajar materi ini.</p></section>
      <div class="card">
        ${pertanyaan.map((q, i) => `
          <div class="refleksi-item">
            <label>${i + 1}. ${q}</label>
            <textarea class="textarea" rows="2" data-i="${i}">${notes["refleksi_" + i] || ""}</textarea>
          </div>
        `).join("")}
        <button class="btn btn-primary" id="btn-simpan-refleksi">💾 Simpan Refleksi</button>
      </div>
    `;
    document.getElementById("btn-simpan-refleksi").onclick = () => {
      const n = Store.getNotes();
      document.querySelectorAll(".refleksi-item textarea").forEach(t => { n["refleksi_" + t.dataset.i] = t.value; });
      Store.saveNotes(n);
      UI.toast("✅ Refleksi tersimpan");
    };
  },

  // ============================================================
  // PENUTUP
  // ============================================================
  renderPenutup() {
    const p = this.progress, m = this.materi;
    const totalBenar = Object.values(p.quizSkor).reduce((a, s) => a + s.benar, 0);
    const totalSoal = Object.values(p.quizSkor).reduce((a, s) => a + s.total, 0);
    this.root.innerHTML = `
      <section class="penutup-box card fade-in">
        <div class="modal-emoji">🎉</div>
        <h2>PEMBELAJARAN SELESAI!</h2>
        <p class="teks-mini">Hebat! Kamu telah menyelesaikan pembelajaran ${m.judul}.</p>
        <div class="beranda-stat-row">
          <div><strong>${p.xp}</strong><span>XP</span></div>
          <div><strong>${Gamifikasi.hitungLevel(p.xp).level}</strong><span>Level</span></div>
          <div><strong>${p.badge.length}</strong><span>Badge</span></div>
          <div><strong>${p.subbabDibaca.length}/${m.subbab.length}</strong><span>Subbab</span></div>
          <div><strong>${totalBenar}/${totalSoal || 0}</strong><span>Jawaban Benar</span></div>
        </div>
        <div class="hero-cta" style="justify-content:center">
          <a class="btn btn-ghost" href="#/materi">🔄 Belajar Lagi</a>
          <a class="btn btn-ghost" href="#/prestasi">🏆 Lihat Prestasi</a>
          <a class="btn btn-ghost" href="#/materi">📚 Review Materi</a>
          <a class="btn btn-primary" href="#/boss">🎯 Tantangan Lagi</a>
        </div>
      </section>
    `;
    UI.confettiRingan();
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
