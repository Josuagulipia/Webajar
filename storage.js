/* ============================================================
   STORAGE — menyimpan data di browser (localStorage)
   Guru & siswa TIDAK PERLU mengedit file ini.
   ============================================================ */

const STORE_KEYS = {
  materi: "belajar_materi_v1",
  progress: "belajar_progress_v1",
  settings: "belajar_settings_v1",
  notes: "belajar_catatan_v1"
};

const Store = {
  // ---------- MATERI (bisa ditimpa lewat Mode Guru) ----------
  getMateri() {
    try {
      const raw = localStorage.getItem(STORE_KEYS.materi);
      if (raw) return JSON.parse(raw);
    } catch (e) { console.warn("Gagal membaca materi tersimpan, memakai materi bawaan.", e); }
    return JSON.parse(JSON.stringify(DEFAULT_MATERI));
  },
  saveMateri(materi) {
    localStorage.setItem(STORE_KEYS.materi, JSON.stringify(materi));
  },
  resetMateri() {
    localStorage.removeItem(STORE_KEYS.materi);
  },

  // ---------- PROGRESS SISWA ----------
  defaultProgress() {
    return {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: null,
      subbabDibaca: [],       // id subbab yang sudah dibaca
      praktikSelesai: [],     // id subbab yang praktiknya sudah benar
      quizSkor: {},           // { subbabId: {benar, total} }
      misiSelesai: [],        // id misi harian yang sudah selesai (per tanggal)
      badge: [],              // daftar id badge yang didapat
      bookmark: [],           // id subbab yang di-bookmark
      bossChallengeSelesai: false,
      riwayatAktivitas: []    // log ringkas, untuk rekap nilai
    };
  },
  getProgress() {
    try {
      const raw = localStorage.getItem(STORE_KEYS.progress);
      if (raw) return Object.assign(this.defaultProgress(), JSON.parse(raw));
    } catch (e) { console.warn("Gagal membaca progress, memulai baru.", e); }
    return this.defaultProgress();
  },
  saveProgress(p) {
    localStorage.setItem(STORE_KEYS.progress, JSON.stringify(p));
  },
  resetProgress() {
    localStorage.removeItem(STORE_KEYS.progress);
  },

  // ---------- SETTINGS (dark mode, suara, dll) ----------
  defaultSettings() {
    return { darkMode: false, soundOn: true, musicOn: false, ttsOn: true };
  },
  getSettings() {
    try {
      const raw = localStorage.getItem(STORE_KEYS.settings);
      if (raw) return Object.assign(this.defaultSettings(), JSON.parse(raw));
    } catch (e) {}
    return this.defaultSettings();
  },
  saveSettings(s) {
    localStorage.setItem(STORE_KEYS.settings, JSON.stringify(s));
  },

  // ---------- CATATAN SISWA ----------
  getNotes() {
    try {
      const raw = localStorage.getItem(STORE_KEYS.notes);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  },
  saveNotes(notes) {
    localStorage.setItem(STORE_KEYS.notes, JSON.stringify(notes));
  }
};
