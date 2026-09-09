/* ============================================================
   AKTIVITAS / PRAKTIK — mesin untuk semua jenis latihan
   Jenis yang didukung: mcq, true-false, categorize, order, match, case-study
   ============================================================ */

const Aktivitas = {
  render(container, subbab, onSelesai) {
    const p = subbab.praktik;
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "aktivitas-box fade-in";
    container.appendChild(wrap);

    const fns = {
      "mcq": this.renderMCQ,
      "true-false": this.renderTrueFalse,
      "categorize": this.renderCategorize,
      "order": this.renderOrder,
      "match": this.renderMatch,
      "case-study": this.renderCaseStudy
    };
    const fn = fns[p.type] || this.renderMCQ;
    fn.call(this, wrap, p, onSelesai);
  },

  feedback(container, benar, teksBenar, teksSalah) {
    const div = document.createElement("div");
    div.className = "feedback " + (benar ? "feedback-benar" : "feedback-salah");
    div.innerHTML = benar
      ? `<strong>BENAR! 🎉</strong><p>${teksBenar || ""}</p>`
      : `<strong>Belum tepat.</strong><p>${teksSalah || "Coba perhatikan kembali penjelasan materi di atas."}</p>`;
    container.appendChild(div);
    UI.mainkanSuara(benar ? "benar" : "salah");
    if (benar) UI.confettiRingan();
    return div;
  },

  // ---------------- MCQ / Studi kasus tunggal ----------------
  renderMCQ(wrap, p, onSelesai) {
    wrap.innerHTML = `
      <h4>${p.judul || "Yuk Coba"}</h4>
      <p class="aktivitas-pertanyaan">${p.pertanyaan}</p>
      <div class="opsi-list"></div>
    `;
    const list = wrap.querySelector(".opsi-list");
    let terjawab = false;
    p.opsi.forEach((opsi, i) => {
      const btn = document.createElement("button");
      btn.className = "opsi-btn";
      btn.textContent = opsi;
      btn.onclick = () => {
        if (terjawab) return;
        terjawab = true;
        UI.mainkanSuara("klik");
        const benar = i === p.jawabanBenar;
        [...list.children].forEach((b, j) => {
          b.disabled = true;
          if (j === p.jawabanBenar) b.classList.add("opsi-benar");
          else if (j === i) b.classList.add("opsi-salah");
        });
        Aktivitas.feedback(wrap, benar, p.feedbackBenar, p.feedbackSalah);
        onSelesai(benar);
      };
      list.appendChild(btn);
    });
  },

  // ---------------- Benar / Salah (beberapa pernyataan) ----------------
  renderTrueFalse(wrap, p, onSelesai) {
    wrap.innerHTML = `<h4>${p.judul || "Benar atau Salah"}</h4>`;
    let benarSemua = true, dijawab = 0;
    p.soal.forEach((s, idx) => {
      const box = document.createElement("div");
      box.className = "tf-box";
      box.innerHTML = `<p class="aktivitas-pertanyaan">${idx + 1}. ${s.pernyataan}</p>
        <div class="opsi-list opsi-list--inline">
          <button class="opsi-btn" data-v="true">✅ Benar</button>
          <button class="opsi-btn" data-v="false">❌ Salah</button>
        </div>`;
      wrap.appendChild(box);
      const btns = box.querySelectorAll(".opsi-btn");
      btns.forEach(btn => {
        btn.onclick = () => {
          if (box.dataset.done) return;
          box.dataset.done = "1";
          UI.mainkanSuara("klik");
          const pilih = btn.dataset.v === "true";
          const benar = pilih === s.jawaban;
          if (!benar) benarSemua = false;
          btns.forEach(b => b.disabled = true);
          btn.classList.add(benar ? "opsi-benar" : "opsi-salah");
          Aktivitas.feedback(box, benar, s.penjelasan, s.penjelasan);
          dijawab++;
          if (dijawab === p.soal.length) onSelesai(benarSemua);
        };
      });
    });
  },

  // ---------------- Kategorikan (drag/tap ke kotak) ----------------
  renderCategorize(wrap, p, onSelesai) {
    wrap.innerHTML = `
      <h4>${p.judul}</h4>
      <p class="aktivitas-instruksi">${p.instruksi || "Ketuk sebuah kartu, lalu ketuk kategori tujuannya."}</p>
      <div class="kategori-item-list"></div>
      <div class="kategori-box-list"></div>
      <button class="btn btn-primary btn-cek" disabled>Cek Jawaban</button>
    `;
    const itemList = wrap.querySelector(".kategori-item-list");
    const boxList = wrap.querySelector(".kategori-box-list");
    const btnCek = wrap.querySelector(".btn-cek");
    const state = p.item.map((it, i) => ({ ...it, i, taruh: null }));
    let dipilih = null;

    function renderItems() {
      itemList.innerHTML = "";
      state.filter(it => it.taruh === null).forEach(it => {
        const card = document.createElement("div");
        card.className = "kategori-card" + (dipilih === it.i ? " kategori-card--dipilih" : "");
        card.textContent = it.teks;
        card.onclick = () => { dipilih = dipilih === it.i ? null : it.i; UI.mainkanSuara("klik"); renderItems(); };
        itemList.appendChild(card);
      });
      if (state.every(it => it.taruh !== null)) btnCek.disabled = false;
    }
    p.kategori.forEach((namaKategori, ki) => {
      const box = document.createElement("div");
      box.className = "kategori-box";
      box.innerHTML = `<div class="kategori-box-judul">${namaKategori}</div><div class="kategori-box-isi"></div>`;
      box.onclick = () => {
        if (dipilih === null) return;
        const it = state.find(s => s.i === dipilih);
        it.taruh = ki;
        dipilih = null;
        renderAll();
      };
      boxList.appendChild(box);
    });
    function renderAll() {
      renderItems();
      wrap.querySelectorAll(".kategori-box").forEach((box, ki) => {
        const isi = box.querySelector(".kategori-box-isi");
        isi.innerHTML = "";
        state.filter(it => it.taruh === ki).forEach(it => {
          const chip = document.createElement("span");
          chip.className = "kategori-chip";
          chip.textContent = it.teks;
          chip.title = "Ketuk untuk mengembalikan";
          chip.onclick = (e) => { e.stopPropagation(); it.taruh = null; renderAll(); };
          isi.appendChild(chip);
        });
      });
    }
    renderAll();
    btnCek.onclick = () => {
      const benar = state.every(it => it.taruh === it.kategoriBenar);
      btnCek.disabled = true;
      wrap.querySelectorAll(".kategori-chip").forEach((chip, idx) => {
        // beri warna berdasarkan ketepatan (re-derive via label match)
      });
      state.forEach(it => {
        if (it.taruh !== it.kategoriBenar) {
          // tandai salah dengan memindahkan ke kategori yang benar sebagai info
        }
      });
      Aktivitas.feedback(wrap, benar,
        "Semua kartu sudah ada di kategori yang tepat!",
        "Ada kartu yang belum pas kategorinya. Coba baca lagi contoh formal & informal di atas, lalu susun ulang.");
      onSelesai(benar);
    };
  },

  // ---------------- Urutkan (klik sesuai urutan) ----------------
  renderOrder(wrap, p, onSelesai) {
    wrap.innerHTML = `
      <h4>${p.judul}</h4>
      <p class="aktivitas-instruksi">${p.instruksi}</p>
      <div class="order-pilihan"></div>
      <p class="aktivitas-instruksi">Urutan yang kamu susun:</p>
      <div class="order-tersusun"></div>
      <div class="order-aksi">
        <button class="btn btn-ghost btn-reset">🔄 Ulangi</button>
        <button class="btn btn-primary btn-cek" disabled>Cek Urutan</button>
      </div>
    `;
    const pilihanEl = wrap.querySelector(".order-pilihan");
    const tersusunEl = wrap.querySelector(".order-tersusun");
    const btnCek = wrap.querySelector(".btn-cek");
    let sisa = [...p.itemAcak];
    let hasil = [];

    function renderUlang() {
      pilihanEl.innerHTML = "";
      sisa.forEach(teks => {
        const b = document.createElement("button");
        b.className = "opsi-btn opsi-btn--kecil";
        b.textContent = teks;
        b.onclick = () => {
          hasil.push(teks);
          sisa = sisa.filter(t => t !== teks);
          UI.mainkanSuara("klik");
          renderUlang();
        };
        pilihanEl.appendChild(b);
      });
      tersusunEl.innerHTML = "";
      hasil.forEach((teks, i) => {
        const chip = document.createElement("div");
        chip.className = "order-chip";
        chip.textContent = `${i + 1}. ${teks}`;
        tersusunEl.appendChild(chip);
      });
      btnCek.disabled = sisa.length > 0;
    }
    wrap.querySelector(".btn-reset").onclick = () => { sisa = [...p.itemAcak]; hasil = []; renderUlang(); };
    renderUlang();

    btnCek.onclick = () => {
      const benar = JSON.stringify(hasil) === JSON.stringify(p.urutanBenar);
      btnCek.disabled = true;
      Aktivitas.feedback(wrap, benar, p.feedbackBenar, p.feedbackSalah);
      onSelesai(benar);
    };
  },

  // ---------------- Mencocokkan (klik pasangan) ----------------
  renderMatch(wrap, p, onSelesai) {
    wrap.innerHTML = `
      <h4>${p.judul}</h4>
      <p class="aktivitas-instruksi">Ketuk satu istilah, lalu ketuk penjelasan yang cocok.</p>
      <div class="match-grid">
        <div class="match-kolom match-kiri"></div>
        <div class="match-kolom match-kanan"></div>
      </div>
    `;
    const kiriEl = wrap.querySelector(".match-kiri");
    const kananEl = wrap.querySelector(".match-kanan");
    const kananAcak = p.pasangan.map((x, i) => ({ ...x, i })).sort(() => Math.random() - 0.5);
    let pilihKiri = null;
    let cocokCount = 0;

    p.pasangan.forEach((pair, i) => {
      const el = document.createElement("button");
      el.className = "match-card";
      el.textContent = pair.kiri;
      el.onclick = () => {
        if (el.classList.contains("match-cocok")) return;
        kiriEl.querySelectorAll(".match-card").forEach(c => c.classList.remove("match-dipilih"));
        el.classList.add("match-dipilih");
        pilihKiri = i;
        UI.mainkanSuara("klik");
      };
      kiriEl.appendChild(el);
    });
    kananAcak.forEach(pair => {
      const el = document.createElement("button");
      el.className = "match-card";
      el.textContent = pair.kanan;
      el.onclick = () => {
        if (el.classList.contains("match-cocok") || pilihKiri === null) return;
        const cocok = pilihKiri === pair.i;
        if (cocok) {
          el.classList.add("match-cocok");
          kiriEl.children[pilihKiri].classList.add("match-cocok");
          cocokCount++;
          UI.mainkanSuara("benar");
          if (cocokCount === p.pasangan.length) {
            Aktivitas.feedback(wrap, true, "Semua pasangan berhasil kamu cocokkan dengan tepat!");
            onSelesai(true);
          }
        } else {
          el.classList.add("match-goyang");
          UI.mainkanSuara("salah");
          setTimeout(() => el.classList.remove("match-goyang"), 400);
        }
        pilihKiri = null;
        kiriEl.querySelectorAll(".match-card").forEach(c => c.classList.remove("match-dipilih"));
      };
      kananEl.appendChild(el);
    });
  },

  // ---------------- Studi kasus (mirip mcq, penyajian skenario) ----------------
  renderCaseStudy(wrap, p, onSelesai) {
    wrap.innerHTML = `
      <h4>${p.judul}</h4>
      <div class="skenario-box">📌 <strong>Situasi:</strong> ${p.skenario}</div>
      <p class="aktivitas-pertanyaan">${p.pertanyaan}</p>
      <div class="opsi-list"></div>
    `;
    const list = wrap.querySelector(".opsi-list");
    let terjawab = false;
    p.opsi.forEach((opsi, i) => {
      const btn = document.createElement("button");
      btn.className = "opsi-btn";
      btn.textContent = opsi;
      btn.onclick = () => {
        if (terjawab) return;
        terjawab = true;
        UI.mainkanSuara("klik");
        const benar = i === p.jawabanBenar;
        [...list.children].forEach((b, j) => {
          b.disabled = true;
          if (j === p.jawabanBenar) b.classList.add("opsi-benar");
          else if (j === i) b.classList.add("opsi-salah");
        });
        Aktivitas.feedback(wrap, benar, p.feedbackBenar, p.feedbackSalah);
        onSelesai(benar);
      };
      list.appendChild(btn);
    });
  }
};
