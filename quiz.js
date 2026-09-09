/* ============================================================
   KUIS — kuis per subbab, dengan skor otomatis & pembahasan
   ============================================================ */

const Kuis = {
  render(container, subbab, onSelesai) {
    const soalList = subbab.quiz;
    let idx = 0, benar = 0;
    const box = document.createElement("div");
    box.className = "kuis-box fade-in";
    container.innerHTML = "";
    container.appendChild(box);

    const tampilkanSoal = () => {
      const s = soalList[idx];
      box.innerHTML = `
        <div class="kuis-progress">SOAL ${idx + 1}/${soalList.length}</div>
        <div class="kuis-progressbar"><div style="width:${(idx / soalList.length) * 100}%"></div></div>
        <p class="aktivitas-pertanyaan">${s.soal}</p>
        <div class="opsi-list"></div>
      `;
      const list = box.querySelector(".opsi-list");
      s.opsi.forEach((opsi, i) => {
        const btn = document.createElement("button");
        btn.className = "opsi-btn";
        btn.textContent = String.fromCharCode(65 + i) + ". " + opsi;
        btn.onclick = () => {
          UI.mainkanSuara("klik");
          const tepat = i === s.jawaban;
          if (tepat) benar++;
          [...list.children].forEach((b, j) => {
            b.disabled = true;
            if (j === s.jawaban) b.classList.add("opsi-benar");
            else if (j === i) b.classList.add("opsi-salah");
          });
          const fb = document.createElement("div");
          fb.className = "feedback " + (tepat ? "feedback-benar" : "feedback-salah");
          fb.innerHTML = `<strong>${tepat ? "✓ JAWABAN BENAR!" : "✗ JAWABAN KURANG TEPAT"}</strong><p>${s.pembahasan}</p>`;
          box.appendChild(fb);
          UI.mainkanSuara(tepat ? "benar" : "salah");
          if (tepat) UI.confettiRingan();
          const next = document.createElement("button");
          next.className = "btn btn-primary btn-lanjut-kuis";
          next.textContent = idx < soalList.length - 1 ? "Soal Berikutnya →" : "Lihat Hasil";
          next.onclick = () => { idx++; if (idx < soalList.length) tampilkanSoal(); else tampilkanHasil(); };
          box.appendChild(next);
        };
        list.appendChild(btn);
      });
    };

    const tampilkanHasil = () => {
      const persen = Math.round((benar / soalList.length) * 100);
      box.innerHTML = `
        <div class="kuis-hasil">
          <div class="kuis-hasil-emoji">${persen >= 80 ? "🏆" : persen >= 60 ? "🎉" : "💪"}</div>
          <h3>Nilai Kamu: ${persen}</h3>
          <p>${benar} dari ${soalList.length} jawaban benar</p>
        </div>
      `;
      onSelesai(benar, soalList.length);
    };

    tampilkanSoal();
  }
};
