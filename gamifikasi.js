/* ============================================================
   GAMIFIKASI — XP, Level, Badge, Misi Harian
   ============================================================ */

const LEVELS = [
  { level: 1, nama: "Penjelajah", minXP: 0 },
  { level: 2, nama: "Pemaham", minXP: 100 },
  { level: 3, nama: "Ahli", minXP: 250 },
  { level: 4, nama: "Master", minXP: 450 }
];

const BADGES = [
  { id: "pemula", label: "Pemula", icon: "🥉", desc: "Membaca subbab pertamamu", cek: p => p.subbabDibaca.length >= 1 },
  { id: "pembelajar-aktif", label: "Pembelajar Aktif", icon: "🥈", desc: "Membaca 3 subbab", cek: p => p.subbabDibaca.length >= 3 },
  { id: "pemaham", label: "Pemaham", icon: "🥇", desc: "Menyelesaikan 3 praktik dengan benar", cek: p => p.praktikSelesai.length >= 3 },
  { id: "ahli-materi", label: "Ahli Materi", icon: "🏆", desc: "Membaca seluruh subbab", cek: (p, materi) => p.subbabDibaca.length >= materi.subbab.length },
  { id: "rajin-belajar", label: "Rajin Belajar", icon: "🔥", desc: "Streak belajar 2 hari berturut-turut", cek: p => p.streak >= 2 },
  { id: "penyelesai-misi", label: "Penyelesai Misi", icon: "🎯", desc: "Menyelesaikan semua misi harian", cek: p => p.misiSelesai.length >= 4 },
  { id: "juara-boss", label: "Penakluk Boss Challenge", icon: "👑", desc: "Menyelesaikan Boss Challenge", cek: p => p.bossChallengeSelesai }
];

const XP_RULES = {
  bacaMateri: 10,
  praktikBenar: 20,
  jawabanBenarKuis: 10,
  misiSelesai: 30,
  bossChallenge: 100
};

const Gamifikasi = {
  hitungLevel(xp) {
    let current = LEVELS[0];
    for (const l of LEVELS) if (xp >= l.minXP) current = l;
    return current;
  },

  progresKeLevelBerikutnya(xp) {
    const current = this.hitungLevel(xp);
    const idx = LEVELS.findIndex(l => l.level === current.level);
    const next = LEVELS[idx + 1];
    if (!next) return { persen: 100, next: null };
    const rentang = next.minXP - current.minXP;
    const capaian = xp - current.minXP;
    return { persen: Math.min(100, Math.round((capaian / rentang) * 100)), next };
  },

  tambahXP(progress, jumlah, keterangan) {
    progress.xp += jumlah;
    const lvl = this.hitungLevel(progress.xp);
    const naikLevel = lvl.level > progress.level;
    progress.level = lvl.level;
    progress.riwayatAktivitas.unshift({ ket: keterangan, xp: jumlah, waktu: new Date().toISOString() });
    progress.riwayatAktivitas = progress.riwayatAktivitas.slice(0, 50);
    this.updateStreak(progress);
    Store.saveProgress(progress);
    UI.tampilkanToastXP(jumlah, keterangan);
    if (naikLevel) UI.tampilkanNaikLevel(lvl);
    this.cekBadgeBaru(progress);
    return progress;
  },

  updateStreak(progress) {
    const hariIni = new Date().toISOString().slice(0, 10);
    if (progress.lastActiveDate === hariIni) return;
    const kemarin = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    progress.streak = progress.lastActiveDate === kemarin ? progress.streak + 1 : 1;
    progress.lastActiveDate = hariIni;
  },

  cekBadgeBaru(progress) {
    const materi = App.materi;
    let ada = false;
    BADGES.forEach(b => {
      if (!progress.badge.includes(b.id) && b.cek(progress, materi)) {
        progress.badge.push(b.id);
        ada = true;
        UI.tampilkanBadgeBaru(b);
      }
    });
    if (ada) Store.saveProgress(progress);
  },

  misiHarianList(materi, progress) {
    const hariIni = new Date().toISOString().slice(0, 10);
    return [
      { id: `baca-${hariIni}`, icon: "📖", label: "Baca 1 subbab hari ini", xp: XP_RULES.bacaMateri,
        selesai: progress.subbabDibaca.length > 0 },
      { id: `praktik-${hariIni}`, icon: "🧠", label: "Selesaikan 1 praktik", xp: XP_RULES.praktikBenar,
        selesai: progress.praktikSelesai.length > 0 },
      { id: `kuis-${hariIni}`, icon: "🎯", label: "Selesaikan 1 kuis", xp: XP_RULES.jawabanBenarKuis,
        selesai: Object.keys(progress.quizSkor).length > 0 },
      { id: `poin-${hariIni}`, icon: "🏆", label: "Kumpulkan minimal 80 XP", xp: XP_RULES.misiSelesai,
        selesai: progress.xp >= 80 }
    ];
  },

  cekMisiSelesai(progress) {
    const misi = this.misiHarianList(App.materi, progress);
    misi.forEach(m => {
      if (m.selesai && !progress.misiSelesai.includes(m.id)) {
        progress.misiSelesai.push(m.id);
        this.tambahXP(progress, m.xp, `Misi selesai: ${m.label}`);
      }
    });
  }
};
