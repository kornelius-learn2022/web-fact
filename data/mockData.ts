export interface Author {
  name: string;
  email: string;
  role: "Admin" | "Kontributor";
  avatarColor: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  count: number;
  icon: "Cpu" | "Palette" | "Brain" | "FlaskConical" | "Landmark" | "TrendingUp" | "Sparkles";
  bgColor: string;
  textColor: string;
  description: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  highlightWord?: string;
  highlightColor?: string;
  category: string;
  categorySlug: string;
  readTime: string;
  shortSummary: string;
  content: string;
  imageUrl: string;
  isHotPick: boolean;
  status: "published" | "pending" | "rejected";
  author: Author;
  createdAt: string;
  adminFeedback?: string;
  reactions: {
    mindBlown: number;
    justLearned: number;
    neutral: number;
  };
  triviaPopup?: {
    title: string;
    text: string;
  };
  crosswordClue?: {
    word: string;
    clue: string;
  };
}

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "tech",
    slug: "technology",
    name: "Technology",
    count: 12,
    icon: "Cpu",
    bgColor: "bg-cyan-400",
    textColor: "text-black",
    description: "Inovasi komputasi kuantum, kecerdasan buatan, dan arsitektur digital masa depan.",
  },
  {
    id: "art",
    slug: "art-culture",
    name: "Art & Culture",
    count: 8,
    icon: "Palette",
    bgColor: "bg-neon-fuchsia",
    textColor: "text-black",
    description: "Karya seni legendaris, tradisi peradaban dunia, dan evolusi estetika manusia.",
  },
  {
    id: "psy",
    slug: "psychology",
    name: "Psychology",
    count: 15,
    icon: "Brain",
    bgColor: "bg-cyber-lime",
    textColor: "text-black",
    description: "Misteri perilaku kognitif, bias psikologis, dan cara kerja bawah sadar kita.",
  },
  {
    id: "sci",
    slug: "science",
    name: "Science",
    count: 14,
    icon: "FlaskConical",
    bgColor: "bg-electric-indigo",
    textColor: "text-white",
    description: "Hukum fisika, reaksi kimia, dan rahasia kosmik di balik alam semesta.",
  },
  {
    id: "hist",
    slug: "history",
    name: "History",
    count: 10,
    icon: "Landmark",
    bgColor: "bg-amber-400",
    textColor: "text-black",
    description: "Kisah tersembunyi para tokoh besar dan revolusi peradaban masa lampau.",
  },
  {
    id: "econ",
    slug: "economy",
    name: "Economy",
    count: 9,
    icon: "TrendingUp",
    bgColor: "bg-vibrant-orange",
    textColor: "text-black",
    description: "Dinamika pasar, psikologi uang, dan pola interaksi sosial modern.",
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "langit-tidak-selalu-berwarna-biru",
    title: "Langit tidak selalu berwarna biru.",
    highlightWord: "biru.",
    highlightColor: "#0084FF",
    category: "Science",
    categorySlug: "science",
    readTime: "2 min read",
    status: "published",
    author: {
      name: "dr. Farhan Malik",
      email: "farhan@mindmaze.com",
      role: "Kontributor",
      avatarColor: "bg-electric-indigo",
    },
    createdAt: "2026-09-18",
    shortSummary:
      "Warna langit yang kita lihat sebenarnya merupakan hasil dari bagaimana cahaya matahari berinteraksi dengan atmosfer bumi. Molekul udara lebih banyak menyebarkan cahaya biru.",
    content:
      "Warna langit yang kita lihat sebenarnya merupakan hasil dari bagaimana cahaya matahari berinteraksi dengan atmosfer bumi. Molekul udara lebih banyak menyebarkan cahaya biru daripada warna lain, sehingga langit tampak biru pada siang hari.\n\nCahaya matahari yang tampak putih sebenarnya tersusun dari spektrum semua warna pelangi. Ketika cahaya ini memasuki atmosfer bumi, ia bertabrakan dengan partikel gas. Cahaya dengan panjang gelombang pendek (seperti biru dan ungu) dihamburkan ke segala arah jauh lebih kuat daripada warna gelombang panjang (merah dan kuning). Fenomena ini dikenal dalam fisika sebagai Hamburan Rayleigh (Rayleigh Scattering).",
    imageUrl:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    reactions: {
      mindBlown: 3400,
      justLearned: 2100,
      neutral: 542,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Warna langit bisa berubah tergantung pada waktu, lokasi, dan kondisi atmosfer. Misalnya, saat matahari terbenam, cahaya biru lebih banyak terhambur, sehingga langit tampak oranye atau merah.",
    },
    crosswordClue: {
      word: "ATMOSFER",
      clue: "Lapisan gas bumi tempat molekul menyebarkan cahaya matahari sehingga langit berwarna.",
    },
  },
  {
    id: "art-2",
    slug: "kenapa-otak-lupa-saat-lewat-pintu",
    title: "Pernah tiba-tiba lupa mau ngapain saat melangkah lewat pintu?",
    highlightWord: "lewat pintu?",
    highlightColor: "#CFFF04",
    category: "Psychology",
    categorySlug: "psychology",
    readTime: "2 min read",
    status: "published",
    author: {
      name: "Tim Redaksi Mind.Maze",
      email: "admin@mindmaze.com",
      role: "Admin",
      avatarColor: "bg-neon-fuchsia",
    },
    createdAt: "2026-09-17",
    shortSummary:
      "Fenomena ini disebut Doorway Effect. Berjalan melewati pintu memicu otak untuk mengarsipkan ingatan ruangan sebelumnya sebagai babak yang sudah selesai.",
    content:
      "Pernahkah Anda berjalan ke dapur untuk mengambil sesuatu, tapi begitu melewati pintu, Anda berdiri terpaku dan benar-benar lupa apa yang Anda cari? Ini bukan tanda penuaan dini, melainkan cara kerja alami otak bernama 'The Doorway Effect'.\n\nPeneliti psikologi menemukan bahwa pintu bertindak sebagai 'batas peristiwa' (event boundary). Otak kita memilah pengalaman hidup ke dalam kompartemen terpisah. Melewati ambang pintu memberi sinyal ke otak bawah sadar bahwa konteks lingkungan telah berganti, sehingga informasi dari ruangan sebelumnya segera diarsipkan untuk memberi ruang pada observasi baru.",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    reactions: {
      mindBlown: 5210,
      justLearned: 3420,
      neutral: 180,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Untuk memulihkan ingatan Anda yang hilang akibat Doorway Effect, Anda cukup melangkah mundur kembali ke ruangan awal atau membayangkan kembali objek yang sedang Anda pikirkan!",
    },
    crosswordClue: {
      word: "MEMORI",
      clue: "Daya ingat kognitif yang di-reset oleh otak ketika melewati ambang pintu baru.",
    },
  },
  {
    id: "art-3",
    slug: "komputer-pertama-di-dunia-mekanik",
    title: "Mekanisme Antikythera: Komputer analog tertua dari 2.000 tahun lalu.",
    highlightWord: "Komputer analog",
    highlightColor: "#00D8F6",
    category: "Technology",
    categorySlug: "technology",
    readTime: "3 min read",
    status: "published",
    author: {
      name: "dr. Farhan Malik",
      email: "farhan@mindmaze.com",
      role: "Kontributor",
      avatarColor: "bg-electric-indigo",
    },
    createdAt: "2026-09-16",
    shortSummary:
      "Ditemukan di dasar laut Yunani, perangkat perunggu beroda gigi rumit ini mampu memprediksi gerhana dan posisi planet ribuan tahun sebelum revolusi industri.",
    content:
      "Pada tahun 1901, penyelam spons di dekat pulau Antikythera menemukan gumpalan perunggu misterius dari bangkai kapal kuno Yunani. Setelah dipindai dengan teknologi tomografi modern, para ilmuwan terkejut menemukan lebih dari 30 roda gigi perunggu yang sangat presisi.\n\nAlat ini dijuluki sebagai 'komputer analog pertama di dunia'. Dibuat sekitar abad ke-2 SM, Mekanisme Antikythera mampu menghitung kalender matahari, orbit bulan, posisi planet, serta memprediksi tanggal gerhana matahari dengan akurasi astronomi yang luar biasa.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    reactions: {
      mindBlown: 6200,
      justLearned: 4100,
      neutral: 230,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Tingkat kerumitan mekanik Antikythera setara dengan jam mekanik Eropa abad ke-14. Artinya, teknologi serupa hilang dari sejarah selama lebih dari 1.500 tahun!",
    },
    crosswordClue: {
      word: "KOMPUTER",
      clue: "Perangkat pemroses data dan kalkulasi astronomi kuno Antikythera.",
    },
  },
  {
    id: "art-4",
    slug: "rahasia-warna-ungu-bangsawan",
    title: "Mengapa warna ungu dulunya hanya boleh dipakai kaisar dan raja?",
    highlightWord: "warna ungu",
    highlightColor: "#FF2E9A",
    category: "Art & Culture",
    categorySlug: "art-culture",
    readTime: "2 min read",
    status: "published",
    author: {
      name: "Nadia Putri",
      email: "nadia@mindmaze.com",
      role: "Kontributor",
      avatarColor: "bg-cyber-lime",
    },
    createdAt: "2026-09-15",
    shortSummary:
      "Pewarna ungu Tyrian kuno dibuat dari lendir ribuan siput laut beracun, menjadikannya lebih mahal daripada emas murni pada zaman Romawi.",
    content:
      "Dalam sejarah seni dan busana kerajaan, warna ungu identik dengan royalti dan kemewahan mutlak. Alasannya sangat sederhana: harganya yang tidak masuk akal.\n\nPewarna ungu legendaris bernama 'Tyrian Purple' diekstraksi dari sekresi kelenjar siput laut karnivora spesies Murex. Untuk menghasilkan hanya satu gram pigmen ungu murni, dibutuhkan lebih dari 10.000 siput laut yang harus dikumpulkan dan diolah melalui proses fermentasi rumit berbau menyengat.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    reactions: {
      mindBlown: 4120,
      justLearned: 2840,
      neutral: 310,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Kaisar Romawi Aurelian bahkan melarang istrinya membeli selendang sutra ungu karena harganya setara dengan berat emas murni selendang tersebut!",
    },
    crosswordClue: {
      word: "PIGMEN",
      clue: "Zat pewarna alami dari siput murex yang bernilai lebih mahal dari emas.",
    },
  },
  {
    id: "art-5",
    slug: "rahasia-kulkas-kuno-mesir",
    title: "Bangsa kuno gurun pasir sudah bisa membuat es tanpa listrik.",
    highlightWord: "tanpa listrik.",
    highlightColor: "#FFB800",
    category: "History",
    categorySlug: "history",
    readTime: "3 min read",
    status: "published",
    author: {
      name: "Nadia Putri",
      email: "nadia@mindmaze.com",
      role: "Kontributor",
      avatarColor: "bg-cyber-lime",
    },
    createdAt: "2026-09-14",
    shortSummary:
      "Jauh sebelum lemari es modern diciptakan, peradaban kuno memanfaatkan pendinginan evaporatif dengan bejana tanah liat di malam hari yang kering.",
    content:
      "Ribuan tahun lalu di wilayah Timur Tengah dan Mesir kuno, masyarakat padang pasir yang panas sudah dapat menikmati minuman dingin dan bahkan es batu. Rahasianya terletak pada pemanfaatan hukum fisika dan kondisi alam gurun yang ekstrem.\n\nPada malam hari yang sangat kering dan berangin, suhu gurun bisa turun drastis. Mereka menempatkan air dalam wadah tanah liat berpori di atas alas jerami basah. Saat angin kering berhembus, air di pori-pori tanah liat menguap dengan cepat, menyerap kalor dari wadah dan membekukan sisa air di dalamnya sebelum fajar tiba.",
    imageUrl:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    reactions: {
      mindBlown: 4120,
      justLearned: 1980,
      neutral: 290,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Di Persia, struktur pendingin ini dibangun dalam skala arsitektur raksasa bernama 'Yakhchal', yang mampu menyimpan es balok sepanjang musim panas terik.",
    },
    crosswordClue: {
      word: "EVAPORASI",
      clue: "Proses penguapan alami yang dimanfaatkan bangsa kuno untuk menghasilkan efek pembekuan es.",
    },
  },
  {
    id: "art-6",
    slug: "paradoks-uang-dan-kebahagiaan",
    title: "Uang tidak bisa membeli kebahagiaan? Sains punya jawabannya.",
    highlightWord: "kebahagiaan?",
    highlightColor: "#FF7A33",
    category: "Economy",
    categorySlug: "economy",
    readTime: "3 min read",
    status: "published",
    author: {
      name: "Tim Redaksi Mind.Maze",
      email: "admin@mindmaze.com",
      role: "Admin",
      avatarColor: "bg-neon-fuchsia",
    },
    createdAt: "2026-09-13",
    shortSummary:
      "Riset ekonomi perilaku menunjukkan uang menambah kebahagiaan hingga batas kebutuhan terpenuhi, setelah itu pengalaman sosial lebih menentukan.",
    content:
      "Sebuah studi terkenal oleh peraih Nobel Daniel Kahneman dan Angus Deaton menemukan bahwa kebahagiaan emosional meningkat seiring bertambahnya pendapatan, namun cenderung mendatar setelah mencapai tingkat stabilitas ekonomi tertentu.\n\nUang memang menghilangkan stres finansial, namun untuk kebahagiaan jangka panjang, membeli 'pengalaman' (seperti liburan, belajar keahlian baru, dan berbagi bersama orang tercinta) terbukti menghasilkan kepuasan psikologis yang jauh lebih awet daripada membeli barang-barang material.",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    reactions: {
      mindBlown: 2980,
      justLearned: 1840,
      neutral: 420,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Menghabiskan uang untuk orang lain (prosocial spending) terbukti memicu hormon oksitosin dan endorfin lebih tinggi daripada berbelanja untuk diri sendiri!",
    },
    crosswordClue: {
      word: "EKONOMI",
      clue: "Ilmu yang mempelajari bagaimana manusia mengalokasikan sumber daya dan membuat pilihan.",
    },
  },
  {
    id: "art-pending-1",
    slug: "misteri-suara-paus-52-hertz",
    title: "Paus paling kesepian di dunia yang bernyanyi di frekuensi 52 Hz.",
    highlightWord: "52 Hz",
    highlightColor: "#00D8F6",
    category: "Science",
    categorySlug: "science",
    readTime: "2 min read",
    status: "pending",
    author: {
      name: "Budi Wicaksono",
      email: "budi@mindmaze.com",
      role: "Kontributor",
      avatarColor: "bg-electric-indigo",
    },
    createdAt: "2026-09-19",
    shortSummary:
      "Sejak 1989, hidrofon militer mendeteksi suara paus unik pada frekuensi 52 Hertz, frekuensi yang tidak dapat didengar atau dijawab oleh kawanan paus lainnya.",
    content:
      "Di kedalaman samudra pasifik, terdapat seekor paus misterius yang dijuluki '52 Blue'. Paus pada umumnya (seperti paus biru dan paus sirip) berkomunikasi pada rentang frekuensi 10 hingga 20 Hertz. Namun, paus ini selalu bersuara pada frekuensi 52 Hertz.\n\nAkibat perbedaan nada vokal yang terlalu tinggi ini, nyanyiannya tidak pernah direspons oleh paus lain. Ia bermigrasi sendirian melintasi lautan luas selama beberapa dekade tanpa pernah terdengar memiliki pasangan kawin.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    reactions: {
      mindBlown: 120,
      justLearned: 85,
      neutral: 12,
    },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Para ilmuwan meyakini paus ini tidak cacat, melainkan spesies hibrida langka antara paus biru dan paus sirip!",
    },
  },
];

export const CATEGORIES = INITIAL_CATEGORIES;
export const ARTICLES = INITIAL_ARTICLES;
