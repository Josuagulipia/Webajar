/* ============================================================
   UI — efek visual & audio kecil yang dipakai di banyak tempat
   ============================================================ */

const UI = {
  audioCtx: null,

  ensureAudio() {
    if (!this.audioCtx) {
      try { this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    return this.audioCtx;
  },

  mainkanSuara(jenis) {
    const settings = Store.getSettings();
    if (!settings.soundOn) return;
    const ctx = this.ensureAudio();
    if (!ctx) return;
    const nada = {
      benar: [660, 880],
      salah: [220, 160],
      klik: [440],
      level: [523, 659, 784],
      badge: [784, 988, 1175],
      misi: [659, 784, 988]
    }[jenis] || [440];
    let t = ctx.currentTime;
    nada.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.18);
      t += 0.11;
    });
  },

  speak(text) {
    const settings = Store.getSettings();
    if (!settings.ttsOn) return;
    if (!("speechSynthesis" in window)) { this.toast("Perangkat ini tidak mendukung Text-to-Speech."); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/[#*\n]+/g, " "));
    utter.lang = "id-ID";
    utter.rate = 0.98;
    window.speechSynthesis.speak(utter);
  },
  stopSpeak() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); },

  toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.getElementById("toast-area").appendChild(el);
    requestAnimationFrame(() => el.classList.add("toast--show"));
    setTimeout(() => { el.classList.remove("toast--show"); setTimeout(() => el.remove(), 300); }, 2600);
  },

  tampilkanToastXP(jumlah, ket) {
    const el = document.createElement("div");
    el.className = "toast toast-xp";
    el.innerHTML = `<span>⭐ +${jumlah} XP</span><small>${ket}</small>`;
    document.getElementById("toast-area").appendChild(el);
    requestAnimationFrame(() => el.classList.add("toast--show"));
    setTimeout(() => { el.classList.remove("toast--show"); setTimeout(() => el.remove(), 300); }, 2600);
    App.refreshHeaderStats();
  },

  tampilkanNaikLevel(lvl) {
    this.mainkanSuara("level");
    this.showModal(`
      <div class="modal-center">
        <div class="modal-emoji">🎉</div>
        <h3>Naik Level!</h3>
        <p>Kamu sekarang Level ${lvl.level} — <strong>${lvl.nama}</strong></p>
        <button class="btn btn-primary" data-close>Lanjutkan Belajar</button>
      </div>
    `);
  },

  tampilkanBadgeBaru(badge) {
    this.mainkanSuara("badge");
    this.showModal(`
      <div class="modal-center">
        <div class="modal-emoji">${badge.icon}</div>
        <h3>Badge Baru Didapat!</h3>
        <p><strong>${badge.label}</strong><br>${badge.desc}</p>
        <button class="btn btn-primary" data-close>Keren!</button>
      </div>
    `);
  },

  showModal(innerHtml) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `<div class="modal-card fade-in">${innerHtml}</div>`;
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.hasAttribute("data-close")) overlay.remove();
    });
    document.body.appendChild(overlay);
    return overlay;
  },

  confettiRingan() {
    const layer = document.getElementById("confetti-layer");
    const warna = ["#FF5A3C", "#2FBF71", "#4C6FFF", "#FFC24C"];
    for (let i = 0; i < 26; i++) {
      const bit = document.createElement("div");
      bit.className = "confetti-bit";
      bit.style.left = Math.random() * 100 + "vw";
      bit.style.background = warna[i % warna.length];
      bit.style.animationDelay = (Math.random() * 0.3) + "s";
      bit.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(bit);
      setTimeout(() => bit.remove(), 1600);
    }
  },

  applyDarkMode(on) {
    document.documentElement.classList.toggle("dark", on);
  }
};
