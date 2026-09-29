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
  icon: "Sparkles" | "Palette" | "Brain" | "Cpu";
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
  sources?: string[];
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
    id: "asal-usul-benda",
    slug: "asal-usul-benda",
    name: "Asal-Usul Benda Sehari-hari",
    count: 4,
    icon: "Sparkles",
    bgColor: "bg-amber-400",
    textColor: "text-black",
    description:
      "Menyingkap sejarah tersembunyi dan transformasi tak terduga dari benda-benda di sekitar kita.",
  },
  {
    id: "sisi-unik-pop-culture",
    slug: "sisi-unik-pop-culture",
    name: "Sisi Unik Pop Culture",
    count: 4,
    icon: "Palette",
    bgColor: "bg-neon-fuchsia",
    textColor: "text-black",
    description:
      "Fenomena viral, mitos populer, dan cerita menarik di balik budaya pop yang jarang diketahui publik.",
  },
  {
    id: "misteri-perilaku-manusia",
    slug: "misteri-perilaku-manusia",
    name: "Misteri Perilaku Manusia",
    count: 4,
    icon: "Brain",
    bgColor: "bg-cyan-400",
    textColor: "text-black",
    description:
      "Menguak misteri kognisi, bias psikologis, dan keanehan cara kerja otak serta interaksi sosial manusia.",
  },
  {
    id: "rahasia-sistem-inovasi",
    slug: "rahasia-sistem-inovasi",
    name: "Rahasia Sistem dan Inovasi",
    count: 4,
    icon: "Cpu",
    bgColor: "bg-cyber-lime",
    textColor: "text-black",
    description:
      "Kisah monumental penemuan teknologi, rekayasa sistem, dan insiden tak terduga yang mengubah dunia komputasi.",
  },
];

const ADMIN_AUTHOR: Author = {
  name: "Tim Redaksi Mind.Maze",
  email: "admin@mindmaze.com",
  role: "Admin",
  avatarColor: "bg-neon-fuchsia",
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "fact-1",
    slug: "wortel-tidak-hanya-berwarna-oranye",
    title: "Did you know? Wortel Tidak Hanya Berwarna Oranye!",
    highlightWord: "Tidak Hanya Oranye",
    highlightColor: "#FFB800",
    category: "Asal-Usul Benda Sehari-hari",
    categorySlug: "asal-usul-benda",
    readTime: "3 min read",
    shortSummary:
      "Wortel liar awalnya berakar putih, kecil, dan pahit untuk obat. Varietas ungu dan kuning lahir di Persia, sebelum akhirnya petani Belanda memuliakan varietas oranye manis pada abad ke-17.",
    content:
      "Perjalanan sejarah wortel dimulai dari wortel liar (Daucus carota, Carota) yang berasal dari Eropa, Afrika Utara, dan Asia Barat dengan akar berwarna putih/gading, kecil, keras, serta pahit. Pada zaman Yunani dan Romawi Kuno hingga abad ke-3 SM, tanaman ini belum dijadikan makanan harian, melainkan dimanfaatkan biji dan daunnya sebagai obat-obatan.\n\nBudidaya wortel sebagai tanaman pangan baru pertama kali tercatat sekitar abad ke-10 Masehi di wilayah Kekaisaran Persia dan Dataran Tinggi Iran (termasuk area Afghanistan saat ini). Varietas awal yang didomestikasi ini terdiri dari dua warna utama, yaitu kelompok ungu (mengandung antosianin) dan kelompok kuning. Melalui jalur perdagangan Arab dan Jalur Sutra, wortel ungu dan kuning menyebar ke Baghdad, Afrika Utara, hingga Spanyol pada abad ke-11 hingga ke-12, serta dibawa oleh Kublai Khan ke Tiongkok sekitar tahun 1300 M. Saat memasuki Eropa Kontinental pada abad ke-14 dan ke-15, varietas kuning mulai lebih disukai karena tidak melunturkan warna gelap pada air rebusan dan peralatan masak seperti varietas ungu.\n\nPada abad ke-15 hingga ke-16 di Spanyol dan Jerman, varietas wortel berwarna oranye mulai muncul secara konsisten. Penelitian genetika modern mengonfirmasi bahwa wortel oranye ini lahir dari seleksi bertahap mutasi alami varietas wortel kuning. Memasuki abad ke-17 hingga ke-18, para petani di Belanda mengembangbiakkan varietas oranye tersebut agar memiliki ukuran lebih padat, rasa yang jauh lebih manis, serta kualitas yang stabil. Upaya pemuliaan ini melahirkan jenis kultivar seperti Long Orange dan Horn, yang menjadi varietas wortel oranye modern yang kita kenal hari ini.",
    imageUrl:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://web.archive.org/web/20220917180640/http://www.carrotmuseum.co.uk/history.html",
    ],
    reactions: { mindBlown: 4120, justLearned: 3890, neutral: 120 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Wortel oranye yang mendominasi supermarket dunia lahir dari riset pemuliaan petani Belanda abad ke-17 sebagai bentuk penghormatan bagi pangeran William of Orange!",
    },
    crosswordClue: {
      word: "ANTOSIANIN",
      clue: "Pigmen alami pemberi warna ungu pekat pada varietas wortel domestikasi awal di Persia.",
    },
  },
  {
    id: "fact-2",
    slug: "kebiasaan-mengetuk-kayu-asal-usul",
    title:
      "Kebiasaan Mengetuk Kayu dengan Ucapan “Ih Amit-Amit!” Ternyata Ada Asal Usulnya Lho!",
    highlightWord: "Mengetuk Kayu",
    highlightColor: "#FF2E9A",
    category: "Sisi Unik Pop Culture",
    categorySlug: "sisi-unik-pop-culture",
    readTime: "3 min read",
    shortSummary:
      "Tradisi mengetuk kayu berakar dari kepercayaan Pagan kuno yang meyakini pohon dihuni roh baik pelindung, hingga permainan kejar-kejaran anak Inggris 'Tiggy Touchwood' pada abad ke-19.",
    content:
      "Sejarah asal-usul adanya tradisi mengetuk kayu untuk menghindari kesialan atau petaka ini memiliki beberapa versi cerita yang berbeda. Teori tertua bermula dari kepercayaan masyarakat Pagan kuno (seperti bangsa Kelt/Celts). Mereka meyakini bahwa pohon-pohon dihuni oleh roh atau dewa. Mengetuk kayu pohon dilakukan dengan dua alasan: pertama, untuk meminta perlindungan atau keberuntungan dari roh baik; kedua, untuk menciptakan suara bising agar roh jahat tidak dapat mendengar kesombongan atau harapan manusia yang bisa mendatangkan nasib buruk.\n\nAdapun dari sisi kepercayaan atau religi Kristen yang mengatakan bahwa tradisi ini dikaitkan dengan salib kayu tempat Yesus disalibkan. Menyentuh atau mengetuk benda berbahan kayu dianggap sebagai tindakan spontan untuk memohon perlindungan dan berkah Ilahi. Namun, teori kemunculan dari budaya keagamaan kristen mengalami penolakan dari beberapa orang sebab Jika praktik ini benar-benar berasal dari Kristen, kemungkinan besar akan muncul dalam tulisan atau khotbah abad pertengahan, tetapi tidak ada referensi seperti itu.\n\nVersi terakhir, yang mengatakan budaya mengetuk kayu adalah berasal dari permainan kejar-kejaran anak-anak di Inggris bernama 'Tiggy Touchwood'. Dalam permainan ini, seorang pemain dianggap berada di 'zona aman' dan tidak bisa ditangkap selama ia menyentuh benda berbahan kayu. Konsep 'kayu sebagai perlindungan dari bahaya' ini kemudian terbawa hingga dewasa. Hal ini divalidasi kebenaranya oleh Oxford’s Dictionary of English Folklore. Para editornya tidak menemukan jejak kebiasaan tersebut sebelum abad ke-19, menolak teori roh pohon dan salib Kristen sebagai penemuan romantis.",
    imageUrl:
      "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.mentalfloss.com/culture/why-do-we-knock-wood",
      "https://historyfacts.com/world-history/article/why-do-we-knock-on-wood/",
    ],
    reactions: { mindBlown: 3510, justLearned: 4200, neutral: 210 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Permainan anak Inggris 'Tiggy Touchwood' menjadikan menyentuh kayu sebagai 'zona aman' dari kejaran, yang terbawa menjadi sugesti penolak bala hingga masa dewasa!",
    },
    crosswordClue: {
      word: "FOLKLOR",
      clue: "Cerita rakyat dan adat tradisi turun temurun seperti kebiasaan mengetuk kayu.",
    },
  },
  {
    id: "fact-3",
    slug: "sejarah-fashion-high-heels-untuk-pria",
    title: "Menelisik Sejarah Fashion High Heels yang Awalnya untuk Pria",
    highlightWord: "Awalnya untuk Pria",
    highlightColor: "#CFFF04",
    category: "Asal-Usul Benda Sehari-hari",
    categorySlug: "asal-usul-benda",
    readTime: "3 min read",
    shortSummary:
      "Sepatu berhak tinggi diciptakan untuk kavaleri berkuda Persia abad ke-10 agar mantap memanah di atas sanggurdi. Dipopulerkan raja Eropa seperti Louis XIV sebelum bergeser jadi simbol feminitas.",
    content:
      "Sepatu berhak tinggi pertama kali digunakan oleh para tentara kavaleri atau prajurit berkuda pria di Persia pada abad ke-10. Desain hak sepatu sengaja dibuat agar kaki prajurit dapat mengait dengan kokoh pada sanggurdi (stirrup) saat mereka menunggang kuda di medan perang, sehingga mereka bisa berdiri dan memanah dengan stabil sambil bergerak.\n\nKetika budaya Persia diadopsi oleh kaum bangsawan di Eropa pada awal abad ke-17, high heels menjadi simbol status sosial yang sangat bergengsi. Shah Abbas I dari Persia mengirimkan utusan diplomatik ke berbagai kerajaan Eropa, yang kemudian mempopulerkan tren sepatu berhak di kalangan raja dan bangsawan pria. Raja Louis XIV dari Prancis menjadi salah satu tokoh yang sangat terkenal gemar mengenakan sepatu hak tinggi berhiasan mewah untuk menunjukkan kekuasaan, martabat, dan posisinya yang tinggi.\n\nMemasuki abad ke-18 era pencerahan, terjadi pergeseran budaya di Eropa. Kaum pria mulai berpikir rasional dan meninggalkan pakaian yang terlalu mencolok, penuh hiasan, dan sepatu berhak tinggi. Pria beralih mengenakan pakaian yang lebih gelap, datar, dan praktis untuk bekerja, sementara sepatu hak tinggi secara perlahan mulai ditinggalkan oleh kaum pria. Menjelang akhir abad ke-17 hingga abad ke-18, wanita di Eropa mulai mengadopsi elemen pakaian pria, termasuk sepatu hak tinggi. Seiring berjalannya waktu, desain hak sepatu mengalami modifikasi: sepatu hak pria dibuat lebih tebal dan kokoh, sementara sepatu hak wanita dirancang lebih ramping, melengkung, dan tinggi untuk menonjolkan estetika bentuk kaki. Pada abad ke-19 hingga modern, high heels sepenuhnya bertransformasi menjadi ikon fesyen dan simbol feminitas.",
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://nationalgeographic.grid.id/read/133487801/aneh-tapi-nyata-awal-mula-sepatu-hak-tinggi-digunakan-oleh-pria?page=all",
      "https://londonrunway-co-uk.translate.goog/the-history-of-high-heels/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc",
    ],
    reactions: { mindBlown: 5800, justLearned: 3100, neutral: 140 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Raja Louis XIV dari Prancis hanya mengizinkan kalangan bangsawan terdekatnya memakai sepatu hak tinggi berwarna merah darah!",
    },
    crosswordClue: {
      word: "SANGGURDI",
      clue: "Pijakan kaki pada pelana kuda tempat hak sepatu tentara Persia pertama kali dikaitkan.",
    },
  },
  {
    id: "fact-4",
    slug: "perasaan-deja-vu-penjelasan-ilmiah",
    title:
      "Pernah Mengalami Perasaan “Deja Vu”? Sebenarnya Kenapasih Kita Ngerasain Hal Tersebut?",
    highlightWord: "Deja Vu",
    highlightColor: "#00D8F6",
    category: "Misteri Perilaku Manusia",
    categorySlug: "misteri-perilaku-manusia",
    readTime: "3 min read",
    shortSummary:
      "Déjà vu adalah bentuk fact-checking otomatis di mana otak bagian depan mendeteksi dan mengoreksi sinyal keliru rasa familiaritas dari hippocampus yang tidak sesuai dengan konteks nyata.",
    content:
      "Déjà vu berasal dari bahasa Prancis yang berarti 'sudah pernah dilihat', yaitu fenomena ketika seseorang merasakan sensasi familiaritas yang sangat kuat terhadap suatu kondisi atau tempat, padahal ia sadar betul bahwa peristiwa tersebut baru pertama kali dialami.\n\nSecara ilmiah, fenomena ini terjadi karena adanya konflik metakognitif di dalam otak. Sinyal familiaritas dari pemrosesan memori tingkat bawah terkirim, namun evaluasi metakognitif menyadari bahwa rasa familiar tersebut tidak logis. Melalui pemindaian functional Magnetic Resonance Imaging (fMRI), terlihat adanya aktivasi pada area otak depan (frontal midline) dan parietal saat déjà vu berlangsung, di mana area-area tersebut berperan penting dalam mendeteksi serta menyelesaikan konflik memori. Proses terjadinya déjà vu berkaitan erat dengan struktur otak yang mengatur memori episodik dan pengenalan, seperti hippocampus dan cortex rhinal. Fenomena ini muncul akibat ketidaksesuaian antara pengenalan rasa familiar (familiarity) dengan ingatan kontekstual.\n\nSelain faktor mekanisme memori, munculnya déjà vu juga dipengaruhi oleh kondisi psikologis maupun medis. Individu yang memiliki tingkat kecemasan (anxiety) atau stres tinggi cenderung lebih sering melaporkan pengalaman ini karena kecemasan dapat memicu terjadinya disosiasi memori. Di samping itu, penderita epilepsi lobus temporal (Temporal Lobe Epilepsy) kerap merasakan déjà vu sebagai sinyal sebelum serangan kejang terjadi. Pada akhirnya, déjà vu dapat dipahami sebagai bentuk pemeriksaan fakta (fact-checking) otomatis yang dilakukan oleh otak. Ketika sistem memori secara keliru mengirimkan sinyal 'rasa pernah tahu', otak bagian depan dengan cepat melakukan koreksi dan menyadari bahwa hal tersebut tidak mungkin.",
    imageUrl:
      "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.tandfonline.com/doi/full/10.1080/09658211.2021.1911197#d1e235",
      "https://www.siloamhospitals.com/informasi-siloam/artikel/apa-itu-dejavu",
    ],
    reactions: { mindBlown: 6200, justLearned: 4400, neutral: 180 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Merasakan déjà vu justru tanda sehat bahwa fungsi evaluasi memori otak depan Anda bekerja sangat teliti mengoreksi ilusi kognitif!",
    },
    crosswordClue: {
      word: "HIPPOCAMPUS",
      clue: "Bagian struktur otak pembentuk memori episodik dan pengenalan rasa familiar.",
    },
  },
  {
    id: "fact-5",
    slug: "computer-debugging-pertama-karena-serangga-sungguhan",
    title:
      "Kejadian Computer Debugging Pertama Ternyata Karena Serangga Sungguhan!",
    highlightWord: "Serangga Sungguhan",
    highlightColor: "#CFFF04",
    category: "Rahasia Sistem dan Inovasi",
    categorySlug: "rahasia-sistem-inovasi",
    readTime: "3 min read",
    shortSummary:
      "Pada 9 September 1947, komputer Harvard Mark II mati mendadak karena seekor ngengat terselip di relai mekanik. Grace Hopper menempelkannya di buku log sebagai 'kasus bug nyata pertama'.",
    content:
      "Jauh sebelum komputer digital diciptakan, istilah bug sudah digunakan di bidang rekayasa dan teknik elektronik sejak abad ke-19 untuk menggambarkan gangguan teknis yang belum diketahui penyebabnya. Salah satu catatan historis berasal dari penemu terkenal, Thomas Alva Edison. Pada tahun 1873, ketika Edison sedang mengerjakan sistem telegraf Quadruplex, ia menemukan seekor kecoak berlumuran tinta yang merayap di atas sirkuit sehingga mengganggu keseimbangan arus listrik. Untuk mengatasi masalah tersebut, Edison menyebutnya sebagai bug trap.\n\nPeristiwa monumental lainnya yang mengabadikan istilah bug ke dalam dunia komputasi terjadi pada 9 September 1947. Saat itu, para teknisi dan ilmuwan komputer di Universitas Harvard sedang mengoperasikan komputer elektromekanis raksasa bernama Aiken Mark II Relay Calculator. Komputer tersebut tiba-tiba mengalami kerusakan dan berhenti beroperasi total.\n\nSetelah dilakukan pemeriksaan pada bagian mesin yang terbuka, tim menemukan seekor ngengat mati yang terselip di antara Relai 70, Panel F. Keberadaan ngengat tersebut menyumbat aliran listrik, memicu korsleting, dan membuat komputer crash. Para ilmuwan kemudian melepaskan serangga tersebut dari komponen relai. Insiden ini dipopulerkan oleh Grace Hopper, seorang laksamana madya Angkatan Laut AS sekaligus ilmuwan komputer perintis yang menjadi bagian dari tim tersebut. Ngengat itu ditempelkan pada buku catatan log harian mesin (logbook) dengan keterangan tertulis: 'First actual case of bug being found' (Kasus pertama ditemukannya serangga/bug nyata).",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://tekno.kompas.com/read/2025/06/27/15040017/istilah-bug-di-komputer-ternyata-berasal-dari-insiden-tahun-1947",
      "https://www.idntimes.com/tech/trend/asal-kata-bug-software-c1c2-01-zh9sw-64ttjd",
      "https://lunduke.substack.com/p/the-story-of-the-first-computer-bug",
    ],
    reactions: { mindBlown: 7100, justLearned: 3800, neutral: 95 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Buku catatan logbook asli tahun 1947 lengkap dengan fosil ngengat bersejarah tersebut kini disimpan di Museum Nasional Sejarah Amerika Smithsonian!",
    },
    crosswordClue: {
      word: "DEBUGGING",
      clue: "Istilah proses pelacakan dan perbaikan kesalahan teknis pada sistem komputasi.",
    },
  },
  {
    id: "fact-6",
    slug: "cerita-unik-asal-usul-nama-bluetooth",
    title:
      "Di Balik Istilah Perangkat Nirkabel “Bluetooth” Ada Cerita Unik Tentang Pembuatan Nama Ini!",
    highlightWord: "Raja Viking",
    highlightColor: "#00D8F6",
    category: "Rahasia Sistem dan Inovasi",
    categorySlug: "rahasia-sistem-inovasi",
    readTime: "3 min read",
    shortSummary:
      "Nama Bluetooth diambil dari raja Viking abad ke-10, Harald 'Blåtand' Gormsson, yang menyatukan Skandinavia. Awalnya nama kode sementara karena opsi RadioWire dan PAN terkendala hak cipta.",
    content:
      "Nama Bluetooth berakar dari julukan raja Viking abad ke-10 asal Denmark dan Norwegia, yaitu Raja Harald 'Blåtand' Gormsson. Kata Blåtand merupakan Bahasa Denmark/Skandinavia Kuno yang diterjemahkan ke dalam Bahasa Inggris sebagai Bluetooth. Julukan 'Gigi Biru' tersebut diberikan kepadanya karena Raja Harald memiliki satu gigi mati yang membusuk atau menghitam, sehingga tampak berwarna gelap atau kebiruan. Pencapaian terbesar Raja Harald selama masa kepemimpinannya adalah berhasil menyatukan suku-suku Denmark dan Norwegia yang sebelumnya saling berselisih menjadi satu kerajaan.\n\nPada tahun 1996, tiga perusahaan raksasa teknologi yakni Intel, Ericsson, dan Nokia bertemu untuk melakukan standarisasi teknologi radio jarak pendek agar berbagai jenis perangkat dapat saling terhubung. Dalam pertemuannya dengan para insinyur teknologi, Jim Kardach dari Intel mengusulkan nama Bluetooth. Gagasan ini muncul setelah Jim Kardach membaca buku sejarah tentang Bangsa Viking. Menurutnya, analogi Raja Harald yang berhasil menyatukan Skandinavia sangat cocok dengan visi teknologi nirkabel baru ini, yaitu menyatukan industri komputer (PC) dan telepon seluler lewat koneksi nirkabel jarak pendek.\n\nUsulan ini awalnya hanya disepakati sebagai nama kode sementara (code name atau placeholder) sampai tim pemasaran menemukan nama resmi yang lebih keren. Ketika masa peluncuran semakin dekat, tim menyiapkan dua opsi nama resmi untuk menggantikan Bluetooth, yaitu RadioWire dan PAN (Personal Area Networking). Istilah PAN menjadi pilihan utama, tetapi pendaftaran merek dagang gagal karena istilah tersebut sudah terpakai luas di internet. Di sisi lain, proses pencarian merek dagang untuk nama RadioWire tidak dapat diselesaikan tepat waktu sebelum jadwal peluncuran resmi. Karena tidak ada opsi lain yang siap, Bluetooth akhirnya ditetapkan sebagai nama resmi secara permanen.",
    imageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    isHotPick: true,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.bluetooth.com/",
      "https://www.kompas.com/tren/read/2023/10/17/194500565/cerita-unik-di-balik-asal-usul-nama-bluetooth?page=all",
    ],
    reactions: { mindBlown: 6500, justLearned: 5100, neutral: 130 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Logo ikonik Bluetooth merupakan kombinasi dua huruf rune Nordik Kuno: ᚼ (Hagall) dan ᛒ (Bjarkan), inisial resmi Harald Blåtand!",
    },
    crosswordClue: {
      word: "NIRKABEL",
      clue: "Komunikasi dan transfer data tanpa perantara kabel menggunakan frekuensi radio.",
    },
  },
  {
    id: "fact-7",
    slug: "cat-warna-mummy-brown-kisah-tragis",
    title:
      "Berkenalan dengan cat warna “Mummy Brown” yang mengandung kisah tragis dan mengerikan",
    highlightWord: "Jasad Mumi Asli",
    highlightColor: "#FFB800",
    category: "Asal-Usul Benda Sehari-hari",
    categorySlug: "asal-usul-benda",
    readTime: "3 min read",
    shortSummary:
      "Dari abad ke-16 hingga ke-20, pigmen cat cokelat 'Mummy Brown' dibuat dari serbuk jasad mumi Mesir asli. Banyak maestro lukis seperti kelompok Pre-Raphaelite menggunakannya tanpa menyadari bahan aslinya.",
    content:
      "Mummy Brown (Caput Mortuum) merupakan salah satu pigmen cat cokelat paling populer di Eropa dari abad ke-16 hingga awal abad ke-20. Proses pembuatan cat ini diketahui ternyata berasal dari penggunaan jasad mumi asli sebagai bahan baku utama. Penggunaan mumi sebagai bahan cat ini berakar dari praktik medis abad pertengahan di Eropa, di mana serbuk mumi (mumia) digunakan untuk pengobatan penyakit. Pada akhir abad ke-18 yakni invasi napoleon ke Mesir memberikan gelombang Egyptomania (obsesi terhadap budaya Mesir kuno) yakni jasa-jasad mumi yang dibawa kembali ke Eropa baik untuk bahan bakar mesin uap, pupuk tanaman, hingga dijadikan ajang hiburan pesta.\n\nPara pelukis sangat menggemari mummy brown karena mampu menghasilkan warna cokelat yang kaya, hangat, kaya nuansa, serta memiliki transparansi (translucency) yang luar biasa. Karakteristik transparan inilah yang menjadikan mummy brown sangat ideal digunakan dalam teknik glazing (mengaplikasikan lapisan cat transparan tipis di atas kanvas), membentuk efek bayangan (shadows), serta mencampur warna kulit (flesh tones). Teknik lukis ini merupakan ciri khas atau karakter karya dari para seniman abad ke-19, termasuk kelompok pelukis terkenal Pre-Raphaelite Brotherhood (PRB). Namun yang menyedihkan, banyak seniman pada era tersebut tanpa menyadari bahwa nama 'mummy brown' merujuk pada jasad mumi yang dihancurkan.\n\nTerdapat satu kisah menarik yang digambarkan oleh penulis Rudyard Kipling. Ia menjelaskan kejadian yang terjadi pada tahun 1860-an dimana Edward Burne Jones, seniman generasi kedua yang dekat dengan kelompok Pre-Raphaelite (paman Kipling) menghadiri acara makan siang bersama rekan senimannya, Alma Tadema yang menjelaskan bahwa cat mummy brown benar-benar berasal dari mayat mumi. Merasa mual dan syok atas kenyataan tersebut, ia segera kembali ke studio lukisnya, mengambil satu-satunya tabung mummy brown yang ia miliki, lalu menguburkannya secara layak di taman rumahnya. Produksi pigmen ini akhirnya benar-benar terhenti pada pertengahan abad ke-20 karena menipisnya pasokan mumi Mesir.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.nationalgeographic.com/history/article/mummy-art-painting-delacroix-pigment-ancient-Egypt",
      "https://www.discovermagazine.com/5-famous-paint-colors-first-made-from-mummies-insects-and-ancient-rocks-45608",
      "https://fitzmuseum.cam.ac.uk/explore-our-collection/highlights/context/tradition-and-change/the-pre-raphaelite-brotherhood",
    ],
    reactions: { mindBlown: 5200, justLearned: 3800, neutral: 170 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Kuas Eugène Delacroix pada mahakarya 'Liberty Leading the People' (1830) terbukti mengandung partikel sisa mumi Mesir dari pigmen Mummy Brown!",
    },
    crosswordClue: {
      word: "PIGMEN",
      clue: "Bubuk zat warna alami yang dicampur cairan pengikat untuk menghasilkan cat lukis.",
    },
  },
  {
    id: "fact-8",
    slug: "kombinasi-ctrl-alt-delete-awal-mulanya",
    title:
      "Kombinasi Tombol Ctrl + Alt + Delete Awalnya Bukan Sebagai Solusi Permasalahan Komputer yang Disebarkan untuk Publik",
    highlightWord: "Bukan untuk Publik",
    highlightColor: "#CFFF04",
    category: "Rahasia Sistem dan Inovasi",
    categorySlug: "rahasia-sistem-inovasi",
    readTime: "3 min read",
    shortSummary:
      "Diciptakan oleh David J. Bradley di IBM pada 1981 sebagai jalan pintas internal para teknisi untuk reboot tanpa mematikan hardware. Tombol Delete dipilih di ujung seberang agar mustahil tertekan tidak sengaja.",
    content:
      "Berdasarkan dokumentasi resmi Lemelson-MIT Program, kombinasi tombol Ctrl+Alt+Delete diciptakan oleh David J. Bradley, insinyur perangkat lunak yang meraih gelar PhD Teknik Elektro dari Purdue University pada 1975 sebelum bergabung dengan IBM di Boca Raton, Florida. Pada 1980, Bradley menjadi bagian dari tim berjumlah 12 insinyur yang dikenal sebagai 'Original 12' tim yang bertanggung jawab membangun komputer IBM Personal Computer pertama. Tugas spesifik Bradley adalah mengembangkan kode ROM BIOS (Basic Input/Output System).\n\nPada 1981, tim Bradley mencari cara sederhana agar pengguna bisa me-reboot komputer tanpa harus mematikan mesin sepenuhnya saat terjadi freeze atau kegagalan sistem mengingat komputer saat itu butuh jeda beberapa detik setelah dimatikan sebelum aman dinyalakan kembali, demi mencegah kerusakan pada hardware. Bradley kemudian menulis kode yang memungkinkan tiga tombol Control, Alt, dan Delete ditekan bersamaan untuk memicu fungsi restart tersebut. Ia memilih kombinasi ini, yang kelak dikenal sebagai 'the three-finger salute', secara spesifik karena sangat sulit tertekan secara tidak sengaja: dua di antaranya adalah tombol modifier, sementara tombol Delete sengaja diposisikan di ujung keyboard yang berbeda agar kombinasi ini aman digunakan.\n\nMenurut catatan yang sama, Bradley hanya membutuhkan waktu beberapa menit untuk merancang solusi ini, dan pada awalnya ia memang hanya memperuntukkannya bagi kalangan internal yaitu programmer dan insinyur. Fitur ini kemudian diadopsi secara resmi oleh Microsoft ke dalam sistem operasi Windows sebagai mekanisme penanganan saat software mengalami kegagalan.",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://lemelson.mit.edu/resources/david-bradley",
      "https://www.mentalfloss.com/technology/computers/history-ctrl-alt-delete",
    ],
    reactions: { mindBlown: 4900, justLearned: 3400, neutral: 110 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "David Bradley pernah berkelakar di samping Bill Gates: 'Saya mungkin yang menemukan kombinasi Ctrl+Alt+Del, tapi Bill Gates yang membuatnya terkenal lewat layar biru Windows!'",
    },
    crosswordClue: {
      word: "RESTART",
      clue: "Perintah memulai kembali siklus operasi komputer tanpa mematikan saklar daya listrik.",
    },
  },
  {
    id: "fact-9",
    slug: "sinyal-gps-dulu-sengaja-dirusak-militer-as",
    title:
      "Sinyal GPS yang Kamu Pakai Sehari-hari Dulu Sengaja \"Dirusak\" oleh Militer AS",
    highlightWord: "Sengaja Dirusak",
    highlightColor: "#00D8F6",
    category: "Rahasia Sistem dan Inovasi",
    categorySlug: "rahasia-sistem-inovasi",
    readTime: "3 min read",
    shortSummary:
      "Sebelum 1 Mei 2000, militer AS menerapkan Selective Availability yang sengaja mengaburkan akurasi GPS sipil hingga melenceng 100 meter demi alasan pertahanan nasional.",
    content:
      "Sebelum tahun 2000, setiap kali orang biasa memakai GPS untuk navigasi, mereka sebenarnya tidak pernah mendapatkan posisi yang benar-benar akurat dan itu bukan kebetulan. Menurut situs resmi pemerintah Amerika Serikat, GPS.gov, pemerintah AS menerapkan kebijakan bernama Selective Availability (SA), yaitu degradasi sinyal GPS publik yang dilakukan secara sengaja demi alasan keamanan nasional.\n\nSecara teknis, militer menyuntikkan semacam 'jitter' atau gangguan acak ke dalam sinyal navigasi sipil, yang menyebabkan posisi hasil perhitungan bisa melenceng secara tidak terduga hingga sejauh 100 meter atau lebih dari lokasi sebenarnya. Awalnya militer menyebut kebijakan ini dengan istilah 'accuracy denial' (penolakan akurasi), sebelum akhirnya berganti nama menjadi Selective Availability. Masalahnya, teknologi sipil berkembang jauh lebih cepat dan keterbatasan akurasi ini mulai menimbulkan masalah nyata bagi penerbangan dan transportasi komersial.\n\nPuncaknya terjadi tepat lewat tengah malam pada penghujung 1 Mei 2000, ketika Presiden Bill Clinton memerintahkan penghentian total penggunaan SA agar GPS bisa lebih responsif untuk kebutuhan publik global. Dampaknya seketika dan berlaku serentak di seluruh dunia tanpa perlu update perangkat. Akurasi untuk pengguna sipil langsung melompat dari 100 meter menjadi 10-20 meter atau bahkan 6 meter. Pada 2007, generasi satelit GPS III diputuskan dibangun tanpa kapabilitas SA sama sekali.",
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.gps.gov/selective-availability",
      "https://www.aviationtoday.com/2000/07/01/the-real-reason-selective-availability-was-turned-off/",
      "https://www.gpsworld.com/defensenewswhite-house-agrees-remove-selective-availability-3243/",
    ],
    reactions: { mindBlown: 5600, justLearned: 4100, neutral: 140 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Penghentian Selective Availability pada tahun 2000 langsung memicu lahirnya hobi baru di seluruh dunia bernama 'Geocaching' dan membuka jalan lahirnya Google Maps!",
    },
    crosswordClue: {
      word: "NAVIGASI",
      clue: "Sistem penentuan posisi arah dan rute perjalanan berpedoman koordinat garis lintang bujur.",
    },
  },
  {
    id: "fact-10",
    slug: "menggelitik-diri-sendiri-tidak-berasa-geli",
    title: "Kenapa Kalau Menggelitik Diri Sendiri Tidak Berasa Geli Ya?",
    highlightWord: "Tidak Berasa Geli",
    highlightColor: "#FF2E9A",
    category: "Misteri Perilaku Manusia",
    categorySlug: "misteri-perilaku-manusia",
    readTime: "3 min read",
    shortSummary:
      "Cerebellum otak memprediksi konsekuensi sensorik dari gerakan tubuh kita sendiri, lalu secara aktif meredam respons sensasi geli sebelum gerakan selesai dilakukan.",
    content:
      "Ternyata terdapat alasan ilmiah mengapa ketika kita menggelitik diri sendiri justru tidak merasakan sensasi geli sama sekali. Hal ini karena cerebellum otak secara aktif membatalkan sinyal sensasi geli saat kita menggelitik diri sendiri. Pernyataan ini merujuk pada hasil penelitian yang dilakukan Sarah-J. Blakemore bersama Daniel M. Wolpert dan Chris D. Frith mengenai pencitraan otak dibawah naungan Wellcome Department of Cognitive Neurology, University College London.\n\nDisini tim peneliti menggunakan sebuah alat stimulasi taktil khusus yakni sepotong busa lembut yang dipasang pada batang plastik sepanjang 70 cm yang bisa berputar vertikal. Temuan dari penelitian dengan enam partisipan sehat membuktikan bahwa ketika sentuhan dihasilkan secara eksternal (oleh peneliti), terjadi aktivitas di dalam otak yang jauh lebih tinggi secara signifikan pada tiga area: korteks somatosensori sekunder pada kedua sisi otak, lobus anterior cerebellum kanan, dan korteks cingulate anterior. Sebaliknya, ketika partisipan menghasilkan sentuhan melalui gerakannya sendiri, aktivitas di ketiga area tersebut jauh lebih rendah meskipun sentuhan yang diterima secara fisik identik.\n\nDapat disimpulkan bagian otak cerebellum berperan sebagai 'prediksi' dari sistem motorik tubuh, yang memperkirakan konsekuensi sensasi dari sebuah gerakan sebelum gerakan itu selesai dilakukan. Ketika peneliti menambahkan jeda waktu antara gerakan tangan dan sentuhan yang diterima dengan bantuan robotik, tingkat kegelian yang dilaporkan meningkat secara progresif, membuktikan peredaman bergantung pada ketepatan waktu prediksi otak.",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: ["https://link.springer.com/article/10.1038/2870"],
    reactions: { mindBlown: 4700, justLearned: 3950, neutral: 130 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Jika lengan mekanik digerakkan dengan jeda waktu hanya 0,2 detik dari gerakan Anda, otak akan gagal memprediksinya dan Anda akan mulai merasa geli!",
    },
    crosswordClue: {
      word: "CEREBELLUM",
      clue: "Bagian otak kecil pengendali koordinasi motorik yang meredam sensasi gelitikan diri sendiri.",
    },
  },
  {
    id: "fact-11",
    slug: "bubble-wrap-awalnya-dirancang-sebagai-wallpaper",
    title:
      "Bubble Wrap Awalnya Dirancang sebagai Wallpaper, Bukan Bahan Pembungkus",
    highlightWord: "Sebagai Wallpaper",
    highlightColor: "#00D8F6",
    category: "Asal-Usul Benda Sehari-hari",
    categorySlug: "asal-usul-benda",
    readTime: "3 min read",
    shortSummary:
      "Diciptakan tahun 1957 oleh Alfred Fielding dan Marc Chavannes sebagai wallpaper bertekstur gelembung untuk dinding. Sempat gagal sebelum sukses besar sebagai pembungkus paket pelindung.",
    content:
      "Plastik gelembung yang kini identik dengan dunia pengiriman barang dan e-commerce ternyata lahir dari sebuah eksperimen yang gagal total dari tujuan awalnya. Berdasarkan catatan International Directory of Company Histories yang dipublikasikan melalui FundingUniverse, Sealed Air Corporation didirikan oleh insinyur asal Amerika Serikat, Alfred W. Fielding, dan penemu asal Swiss, Marc A. Chavannes, yang bersama-sama menciptakan Bubble Wrap.\n\nProduk ini pertama kali dikembangkan pada 1957, dan awalnya diciptakan untuk memenuhi permintaan klien yang menginginkan jenis wallpaper plastik baru bertekstur 3 dimensi. Namun ketika ide tersebut tidak berhasil sebagai pelapis dinding, keduanya sempat mencoba memasarkan material ini sebagai bahan isolasi rumah kaca (greenhouse insulator), sebelum akhirnya menyadari bahwa fungsi paling tepat untuk material bergelembung ini adalah sebagai bantalan pelindung kemasan barang.\n\nBukti legal atas proses penciptaan material ini tercatat di Kantor Paten AS (USPTO) bernomor US 3,142,599 dengan judul 'Method for Making Laminated Cushioning Material'. Paten ini mencatat proses melaminasi dua lembar plastik yang menjebak udara membentuk elemen setengah bola. Titik balik komersial besar terjadi pada 1969 ketika IBM mulai memakainya untuk membungkus komputer mainframe sensitif mereka saat pengiriman ke seluruh dunia, mengubah nasib Bubble Wrap selamanya.",
    imageUrl:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.fundinguniverse.com/company-histories/sealed-air-corporation-history/#google_vignette",
      "https://patents.google.com/patent/US3142599A/en",
    ],
    reactions: { mindBlown: 6300, justLearned: 3800, neutral: 120 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Suara 'pop' saat meletuskan Bubble Wrap terbukti secara psikologis mampu menurunkan hormon kortisol pemicu stres dalam hitungan menit!",
    },
    crosswordClue: {
      word: "LAMINASI",
      clue: "Proses merekatkan dua lapisan lembaran plastik hingga menjebak gelembung udara pelindung.",
    },
  },
  {
    id: "fact-12",
    slug: "budaya-belum-5-menit-makanan-jatuh-tidak-ilmiah",
    title:
      "Budaya “Belom 5 Menit” untuk Makanan yang Jatuh Ternyata Tidak Berlaku Secara Ilmiah",
    highlightWord: "Belom 5 Menit",
    highlightColor: "#FFB800",
    category: "Sisi Unik Pop Culture",
    categorySlug: "sisi-unik-pop-culture",
    readTime: "3 min read",
    shortSummary:
      "Riset ilmiah peer-review dari Rutgers University membuktikan bahwa transfer bakteri terjadi secara instan dalam waktu kurang dari 1 detik. Kelembapan makanan jadi faktor penentu utama.",
    content:
      "Klaim populer bahwa makanan yang jatuh ke lantai masih aman dimakan asalkan diambil dalam waktu kurang dari lima menit atau lima detik akhirnya diuji secara sistematis dan dipublikasikan dalam jurnal peer-review berjudul 'Longer Contact Times Increase Cross-Contamination of Enterobacter aerogenes from Surfaces to Food' oleh Robyn C. Miranda dan Donald W. Schaffner dari Rutgers University, terbit di jurnal Applied and Environmental Microbiology.\n\nPenelitian ini menguji laju kontaminasi silang bakteri Enterobacter aerogenes pada empat jenis permukaan rumah tangga (baja tahan karat, keramik, kayu, dan karpet) dan empat jenis makanan (semangka, roti, roti bermentega, dan permen gummy). Dengan total 2.560 titik data pengukuran, hasil uji coba membuktikan bahwa transfer bakteri terjadi secara 'instan' bahkan pada waktu kontak kurang dari 1 detik, sehingga mematahkan mitos aturan lima detik yang dipercaya masyarakat luas.\n\nDari segi pola kontaminasi, semangka secara konsisten tercatat sebagai makanan dengan tingkat kontaminasi bakteri tertinggi karena kadar airnya yang melimpah, sementara permen gummy yang kering mengalami kontaminasi paling rendah. Ini membuktikan bahwa kelembapan makanan dan tekstur permukaan lantai jauh lebih menentukan laju penularan bakteri daripada durasi detik makanan menyentuh lantai.",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: ["https://journals.asm.org/doi/full/10.1128/aem.01838-16"],
    reactions: { mindBlown: 5900, justLearned: 4600, neutral: 160 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Karpet rumah tangga justru mentransfer bakteri jauh lebih sedikit ke makanan dibanding ubin keramik yang licin karena serat karpet menahan bakteri di dasar serat!",
    },
    crosswordClue: {
      word: "KONTAMINASI",
      clue: "Perpindahan kotoran atau mikroorganisme bakteri ke makanan yang menyentuh lantai kotor.",
    },
  },
  {
    id: "fact-13",
    slug: "otak-tertipu-rasa-enak-karena-harga-mahal",
    title:
      "Otak Bisa \"Tertipu\" Rasa Enak Hanya Karena Harganya yang Mahal, Meski Isinya Sama Persis",
    highlightWord: "Tertipu Harga",
    highlightColor: "#FF2E9A",
    category: "Misteri Perilaku Manusia",
    categorySlug: "misteri-perilaku-manusia",
    readTime: "3 min read",
    shortSummary:
      "Studi gabungan Caltech dan Stanford membuktikan bahwa label harga mahal langsung memicu lonjakan aktivitas neurologis di area medial orbitofrontal cortex otak, menghasilkan kenikmatan nyata.",
    content:
      "Sebuah studi ikonik yang dipublikasikan di jurnal Proceedings of the National Academy of Sciences (PNAS) pada Januari 2008 mengungkap bagaimana otak manusia dapat 'tertipu' oleh sekadar label harga, di mana harga yang lebih mahal menghasilkan persepsi rasa yang jauh lebih nikmat bagi penikmatnya.\n\nTim peneliti gabungan dari California Institute of Technology (Caltech) dan Stanford Graduate School of Business (Hilke Plassmann, John O'Doherty, Baba Shiv, dan Antonio Rangel) merancang eksperimen di mana 20 partisipan mencicipi sampel anggur (wine) sambil otak mereka dipindai mesin fMRI. Partisipan diberi tahu bahwa mereka mencicipi anggur dengan harga berbeda, padahal sebenarnya anggur yang sama disajikan berulang dengan label harga yang dimanipulasi: sekali berlabel $90 dan sekali berlabel $10, padahal cairannya identik.\n\nHasilnya menunjukkan lonjakan aktivitas BOLD yang sangat signifikan di area medial orbitofrontal cortex (mOFC), wilayah otak yang berperan mengkodekan sensasi kenikmatan sejati. Menariknya, intensitas rasa mentah (taste intensity) pada lidah tidak berubah, membuktikan efek sugesti harga bekerja langsung memanipulasi sistem penghargaan (reward system) otak.",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: ["https://www.pnas.org/doi/full/10.1073/pnas.0706929105"],
    reactions: { mindBlown: 4800, justLearned: 3700, neutral: 150 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Otak tidak berpura-pura menikmati; sugesti harga mahal secara biologis benar-benar melepaskan dopamin kepuasan yang mengubah persepsi rasa lidah!",
    },
    crosswordClue: {
      word: "DOPAMIN",
      clue: "Zat kimia neurotransmiter otak yang mengalir saat merasakan kenikmatan dan kepuasan sensorik.",
    },
  },
  {
    id: "fact-14",
    slug: "bystander-effect-difusi-tanggung-jawab",
    title:
      "Kenapa Semakin Banyak Orang Menyaksikan Kejadian Darurat, Justru Semakin Sedikit Orang yang Menolong Kita?",
    highlightWord: "Bystander Effect",
    highlightColor: "#CFFF04",
    category: "Misteri Perilaku Manusia",
    categorySlug: "misteri-perilaku-manusia",
    readTime: "4 min read",
    shortSummary:
      "Dikenal sebagai bystander effect, difusi tanggung jawab membuat setiap orang dalam kerumunan berasumsi orang lain yang akan bertindak lebih dulu. Menunjuk satu orang spesifik jadi solusi efektif.",
    content:
      "Fenomena yang dalam psikologi sosial dikenal sebagai bystander effect (efek pengamat) pertama kali diteliti secara sistematis oleh dua psikolog sosial, Bibb Latané dan John M. Darley, pada tahun 1968. Penelitian ini dipicu oleh kasus pembunuhan Kitty Genovese di New York pada 13 Maret 1964, di mana puluhan tetangga dikabarkan mendengar teriakan korban namun tidak ada yang segera melapor ke polisi.\n\nDalam eksperimen pertama mereka, mahasiswa diminta berdiskusi via interkom di ruangan terpisah. Ketika salah satu partisipan (rekaman) pura-pura mengalami kejang hebat dan meminta tolong, partisipan yang percaya hanya ada mereka berdua segera keluar melapor sebanyak 85% dengan respon 52 detik. Namun pada kondisi kelompok berenam, angka pelaporan anjlok menjadi hanya 31% dengan respon melambat hingga 166 detik.\n\nFenomena ini terjadi karena mekanisme psikologis yang disebut 'diffusion of responsibility' (difusi tanggung jawab). Semakin banyak orang yang hadir, semakin besar kecenderungan setiap individu secara bawah sadar merasa 'pasti ada orang lain yang bertindak lebih dulu'. Temuan ini membuktikan bahwa situasi sosial kerumunan jauh lebih menentukan daripada kepribadian individu, melahirkan panduan keselamatan darurat modern: tunjuk satu orang secara spesifik ('Kamu yang berbaju merah, telepon ambulans!') alih-alih berteriak minta tolong secara umum.",
    imageUrl:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://psycnet.apa.org/record/1969-03938-001",
      "https://psycnet.apa.org/record/1968-08862-001",
    ],
    reactions: { mindBlown: 5300, justLearned: 4100, neutral: 125 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Saat darurat di kerumunan, jangan berteriak umum 'Tolong!'. Tatap mata satu orang dan berikan perintah langsung: 'Kamu yang pakai jaket hitam, tolong panggil bantuan sekarang!'",
    },
    crosswordClue: {
      word: "DIFUSI",
      clue: "Penyebaran rasa tanggung jawab pada kerumunan orang banyak yang menghambat tindakan menolong.",
    },
  },
  {
    id: "fact-15",
    slug: "mona-lisa-lukisan-terkenal-karena-pencurian-1911",
    title:
      "Kenapa Mona Lisa Bisa Jadi Lukisan Paling Terkenal di Dunia? Ternyata Bukan Karena Lukisannya Itu Sendiri!",
    highlightWord: "Pencurian 1911",
    highlightColor: "#FFB800",
    category: "Sisi Unik Pop Culture",
    categorySlug: "sisi-unik-pop-culture",
    readTime: "4 min read",
    shortSummary:
      "Selama 350 tahun Mona Lisa hanyalah salah satu lukisan biasa di Louvre. Kepopuleran globalnya meledak drastis setelah dicuri oleh Vincenzo Peruggia pada 1911, memicu sensasi media dunia selama dua tahun.",
    content:
      "Kebanyakan orang di seluruh dunia berasumsi bahwa Mona Lisa selalu menjadi lukisan paling ikonik Leonardo da Vinci sejak abad ke-16. Namun faktanya, selama lebih dari 350 tahun sejak dipajang di Museum Louvre di Paris, lukisan ini hanya dianggap sebagai salah satu karya bagus di antara ribuan koleksi seni Renaissance lainnya, sama sekali belum menjadi fenomena selebriti dunia seperti sekarang.\n\nTitik balik yang mengubah segalanya terjadi pada Senin, 21 Agustus 1911. Seorang tukang kaca asal Italia bernama Vincenzo Peruggia yang pernah bekerja memasang kaca pelindung lukisan Louvre, bersembunyi di dalam museum semalaman. Keesokan paginya, ia melepas kanvas Mona Lisa, menyembunyikannya di bawah jubah kerja putihnya, dan berjalan keluar tanpa ada alarm yang berbunyi. Butuh lebih dari 24 jam sebelum staf museum menyadari lukisan tersebut hilang.\n\nBegitu berita pencurian diumumkan, sensasi media meledak di seluruh surat kabar internasional. Ribuan orang berbondong-bondong datang ke Louvre hanya untuk antre melihat dinding kosong bekas tempat lukisan digantung. Investigasi kepolisian bahkan sempat menahan penyair Guillaume Apollinaire dan menginterogasi pelukis muda Pablo Picasso. Selama dua tahun Peruggia menyembunyikan lukisan itu di koper apartemennya di Paris sebelum akhirnya tertangkap saat berusaha menjualnya ke pedagang seni di Florence pada akhir 1913. Rangkaian drama inilah yang mengabadikan wajah Mona Lisa ke dalam memori publik global sebagai ikon budaya pop dunia.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.abc.net.au/news/2025-04-14/mona-list-art-heist-by-vincenzo-peruggia/105150860",
      "https://daily.jstor.org/mona-lisa-mystery/",
      "https://www.historyheroes.co.uk/learning-hub/vincenzo-peruggia-and-the-theft-of-the-mona-lisa-how-the-painting-rose-to-fame/",
    ],
    reactions: { mindBlown: 6700, justLearned: 4900, neutral: 160 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Pablo Picasso sempat gemetar ketakutan dibui saat polisi Paris menginterogasinya atas dugaan terlibat sindikat pencurian Mona Lisa tahun 1911!",
    },
    crosswordClue: {
      word: "LOUVRE",
      clue: "Museum seni ternama di Paris tempat lukisan legendaris Mona Lisa dipajang dan pernah dicuri.",
    },
  },
  {
    id: "fact-16",
    slug: "mitos-rambut-dan-kuku-tumbuh-setelah-kematian",
    title: "Mitos \"Rambut dan Kuku Terus Tumbuh Setelah Kematian\"",
    highlightWord: "Mitos Medis",
    highlightColor: "#00D8F6",
    category: "Sisi Unik Pop Culture",
    categorySlug: "sisi-unik-pop-culture",
    readTime: "3 min read",
    shortSummary:
      "Pertumbuhan sel butuh aliran darah, glukosa, dan oksigen yang langsung mati saat jantung berhenti. Ilusi kuku memanjang sebenarnya disebabkan oleh kulit yang mengering dan menyusut (dehidrasi jaringan).",
    content:
      "Ini salah satu mitos horor paling melegenda dalam budaya populer dunia, muncul di novel klasik All Quiet on the Western Front (1929) hingga lelucon komedian Johnny Carson. Mitos ini mengklaim bahwa rambut dan kuku manusia terus bertumbuh selama berhari-hari setelah kematian.\n\nUntuk membongkar klaim ini secara ilmiah, dua peneliti kesehatan Rachel C. Vreeman dan Aaron E. Carroll mempublikasikan tinjauan medis dalam artikel 'Medical Myths' di British Medical Journal (BMJ) edisi Desember 2007. Secara biologis, pembelahan sel rambut dan matriks kuku adalah proses aktif yang membutuhkan pasokan glukosa, oksigen, dan ATP yang dibawa sirkulasi darah segar. Begitu jantung berhenti berdetak, pembelahan sel berhenti total dalam hitungan menit tanpa ada sisa pertumbuhan lanjutan.\n\nIlusi optik ini lahir murni dari dehidrasi jaringan tubuh pasca-kematian. Ketika cairan tubuh menguap, kulit mulai mengering dan mengalami retraksi (menyusut tertarik ke dalam). Proses penyusutan kulit di sekitar pangkal kuku dan folikel rambut inilah yang membuat kuku dan rambut tampak menyembul keluar lebih panjang, persis seperti ilusi cincin yang mendadak longgar saat jari menyusut.",
    imageUrl:
      "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80",
    isHotPick: false,
    status: "published",
    author: ADMIN_AUTHOR,
    createdAt: "2026-09-29",
    sources: [
      "https://www.bmj.com/content/335/7633/1288",
      "https://www.sciencedaily.com/releases/2007/12/071220195639.htm",
      "https://www.livescience.com/32174-do-hair-and-nails-keep-growing-after-death.html",
    ],
    reactions: { mindBlown: 5100, justLearned: 4300, neutral: 140 },
    triviaPopup: {
      title: "Ternyata selama ini...",
      text: "Ahli forensik legendaris William Maples menyebut klaim kuku tumbuh setelah mati sebagai ilusi murni akibat kulit yang mengering dan surut ke belakang!",
    },
    crosswordClue: {
      word: "RETRAKSI",
      clue: "Peristiwa menyusut atau tertariknya jaringan kulit akibat dehidrasi alami setelah kematian.",
    },
  },
];

export const ARTICLES = INITIAL_ARTICLES;
export const CATEGORIES = INITIAL_CATEGORIES;
