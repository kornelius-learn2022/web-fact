export interface SessionSchedule {
  id: string;
  name: string;
  time: string;
  description: string;
  badge: string;
  iconName: "Drama" | "Market" | "Clock";
}

export interface SceneItem {
  id: number;
  title: string;
  setting: string;
  summary: string;
  songs: string[];
  keyCharacters: string[];
  moral: string;
}

export interface CastMember {
  character: string;
  actor: string;
  category: "Pemeran Utama" | "Keluarga" | "Pasar & Warga" | "Prajurit & Penjaga" | "Musik & Paduan Suara";
  roleDescription: string;
}

export interface VenueZone {
  id: string;
  name: string;
  code: string;
  description: string;
  operatingHours: string;
  highlights: string[];
  xPercent: number;
  yPercent: number;
  color: string;
}

export const CHRISTMAS_EVENT_INFO = {
  schoolName: "Cita Hati Christian Elementary School",
  campusName: "Pakuwon City Campus",
  presentationTagline: "Proudly Presents",
  categorySubtitle: "Christmas Celebration & Market",
  mainTitle: "The Gift Worth Giving",
  dateFormatted: "Saturday, 05 December 2026",
  dateISO: "2026-12-05T12:00:00+07:00",
  venueName: "Cita Hati Elementary School Pakuwon City Campus",
  venueAddress: "Jl. Kejawan Putih Barat No. 99, Pakuwon City, Surabaya, Jawa Timur 60112",
  openForPublic: true,
  publicBadge: "Open for Public",
  contactPhone: "081310007452",
  contactWhatsAppUrl: "https://wa.me/6281310007452?text=Halo%20Cita%20Hati%20Pakuwon%20City,%20saya%20ingin%20bertanya%20mengenai%20acara%20Christmas%20Celebration%20The%20Gift%20Worth%20Giving",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.692484083321!2d112.8028731!3d-7.2758129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa18536ec6f5%3A0xe54020a40ffbfa6!2sSekolah%20Kristen%20Cita%20Hati%20(Pakuwon%20City)!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  googleMapsUrl: "https://maps.app.goo.gl/u7m4cK8vK5t6Pj9m7",
};

export const SESSIONS_DATA: SessionSchedule[] = [
  {
    id: "market",
    name: "Christmas Market & Bazaar",
    time: "12.00 - 20.00 WIB",
    description: "Bazaar kuliner lezat, pernak-pernik dekorasi Natal, aneka kue kering, kerajinan tangan siswa, dan stand seru ramah keluarga sepanjang hari.",
    badge: "Buka Sepanjang Hari",
    iconName: "Market",
  },
  {
    id: "session-1",
    name: "Musical Drama Session I",
    time: "14.00 - 15.30 WIB",
    description: "Penampilan drama musikal spektakuler sesi siang. Penonton disarankan hadir 30 menit sebelum pertunjukan dimulai untuk registrasi tempat duduk.",
    badge: "Sesi Siang",
    iconName: "Drama",
  },
  {
    id: "session-2",
    name: "Musical Drama Session II",
    time: "17.00 - 18.30 WIB",
    description: "Penampilan drama musikal spektakuler sesi senja. Suasana panggung bercahaya lampu Natal yang hangat dan perayaan penuh sukacita.",
    badge: "Sesi Senja",
    iconName: "Drama",
  },
];

export const SYNOPSIS_OVERVIEW = {
  tagline: "Kisah Tentang Kasih, Pengampunan, dan Hadiah Sejati",
  summary:
    "Di sebuah kota kecil bersalju, pasar Natal tradisional selalu menyala dengan aroma kue khas Munich, karangan bunga cemara, dan keceriaan warga. Namun keceriaan itu terancam oleh seorang Walikota yang hatinya membeku karena kepedihan masa kecilnya yang miskin. Ketika pajak dinaikkan dan dekorasi dirampas, hadirlah seorang Pengelana bertopeng misterius yang memberikan hadiah-hadiah penuh kasih kepada keluarga yang membutuhkan. Melalui ketulusan, keajaiban kecil, dan pengorbanan, drama musikal 'The Gift Worth Giving' mengisahkan bagaimana kasih sejati mampu meluluhkan kepahitan, memulihkan keluarga, dan mengembalikan makna Natal terindah: kasih Allah, keluarga, sahabat, dan sesama.",
  quote: "Hadiah sejati bukanlah tentang apa yang kita miliki, melainkan kasih tulus yang kita bagikan kepada sesama.",
  quoteAuthor: "Pesan Utama Drama Musikal The Gift Worth Giving",
};

export const SCENES_DATA: SceneItem[] = [
  {
    id: 0,
    title: "Prolog: Kerinduan di Bawah Cahaya Salju",
    setting: "Pasar Natal Kota Kecil Munich di Bawah Cahaya Lampu",
    summary:
      "Lampu-lampu pasar Natal mulai menyala saat Thania melantunkan lagu White Christmas. Narator Arissa membuka kisah tentang sebuah kota kecil dan seorang walikota yang menyimpan kepedihan masa lalu, mengingatkan bahwa hadiah terindah selalu bermula dari ketulusan hati.",
    songs: ["White Christmas"],
    keyCharacters: ["Thania (Penyanyi)", "Arissa (Narator)"],
    moral: "Hadiah paling berharga lahir dari ketulusan hati yang siap berbagi.",
  },
  {
    id: 1,
    title: "Adegan 1: Hiruk-Pikuk Pasar Natal & Doa Tulus",
    setting: "Kios Pasar Natal Warga Munich",
    summary:
      "Pedagang sibuk menata karangan bunga dan kue kering lezat khas Munich. Heidi dan Gisella dengan gembira membantu penjualan. Namun para prajurit walikota datang memungut pajak ganda yang memberatkan. Di tengah kekecewaan, Gisella dan Heidi tidak membalas dengan amarah, melainkan menaikkan doa tulus agar Tuhan melembutkan hati sang Walikota.",
    songs: ["Nutcracker Miniature Overture", "It's Beginning to Look a Lot Like Christmas"],
    keyCharacters: ["Heidi (Casey)", "Gisella (Elsheva)", "Para Pedagang", "Prajurit Walikota"],
    moral: "Menghadapi ketidakadilan dengan doa dan kasih, bukan kepahitan.",
  },
  {
    id: 2,
    title: "Adegan 2: Rahasia Kepedihan di Kantor Walikota",
    setting: "Kantor Walikota & Pasar yang Gelap",
    summary:
      "Di kantornya, sang Walikota menghitung uang pajak dan kue sitaan. Terungkap luka masa kecilnya: ayahnya tak mampu membelikan boneka Natal, membuatnya bersumpah tidak akan membiarkan siapa pun berbahagia saat Natal. Sang Walikota merobek dekorasi pasar, tetapi Pengelana bertopeng muncul secara ajaib dan memulihkan seluruh dekorasi dalam semalam.",
    songs: ["Dance of the Sugar Plum Fairy", "Send a Little Love"],
    keyCharacters: ["Sang Walikota", "Freya (Penasihat)", "Pengelana Bertopeng", "Heidi & Gisella"],
    moral: "Luka masa lalu yang belum sembuh melahirkan kekerasan, namun kasih tetap bekerja tanpa suara.",
  },
  {
    id: 3,
    title: "Adegan 3: Kehangatan Keluarga Penebang Kayu",
    setting: "Pondok Sederhana Keluarga Victor di Pinggir Hutan",
    summary:
      "Keluarga Victor dan Valerie hanya memiliki semangkuk sup kentang dan kayu bakar yang tersisa separuh akibat pajak. Saat sang Pengelana kedinginan mengetuk pintu, mereka menyambutnya dengan selimut dan sup hangat. Sebagai ucapan terima kasih, Pengelana menghadiahkan kapak tajam baru untuk sang ayah dan biola baru untuk Valentine menggantikan biolanya yang patah.",
    songs: ["Waltz of the Flowers"],
    keyCharacters: ["Victor (Kirston)", "Valerie (Skye)", "Vincent (Haydn)", "Valentine (Adel)", "Pengelana"],
    moral: "Kemurahan hati di saat kekurangan adalah bukti cinta yang sesungguhnya.",
  },
  {
    id: 4,
    title: "Adegan 4: Dongeng Malam & Hadiah Tak Terduga",
    setting: "Ruang Tengah Keluarga Damon & Deloris",
    summary:
      "Keluarga Damon membacakan dongeng Si Kerudung Merah kepada David dan Diane sebelum tidur. Sang Pengelana kembali bertamu mencari perlindungan dari badai salju. Sebelum pergi dalam senyap, ia menyelipkan bantal empuk untuk sang ayah yang lelah dan sepatu balet anggun untuk Diane yang bermimpi menari.",
    songs: ["Marzipan Nutcracker", "Silent Night"],
    keyCharacters: ["Damon (Luke)", "Deloris (Helena)", "David (Maxton)", "Diane (Leslie)", "Pengelana"],
    moral: "Tindakan kebaikan rahasia membawa sukacita yang menguatkan jiwa.",
  },
  {
    id: 5,
    title: "Adegan 5: Rombongan Pedagang Keliling di Jalan Salju",
    setting: "Jalan Setapak Menuju Pasar Kota",
    summary:
      "Rombongan pedagang keliling (Bella, Beth, Brenda, Bonny) membawa gerobak penuh mainan dan ornamen meriah. Namun Walikota menghadang dan menyita seluruh isi gerobak mereka dengan dalih surat izin buatan. Ketika Walikota tertidur di kantornya, sang Pengelana menyelinap tenang dan mengambil kembali seluruh hadiah untuk dikembalikan kepada pemilik sahnya.",
    songs: ["Russian Trepak Dance", "Deck the Halls"],
    keyCharacters: ["Bella (Emily)", "Beth (Micah)", "Brenda (Scherzi)", "Bonny (Letycia)", "Walikota", "Pengelana"],
    moral: "Keserakahan tidak akan pernah menang atas keadilan dan kepedulian.",
  },
  {
    id: 6,
    title: "Adegan 6: Pembukaan Kedok & Hadiah Terindah",
    setting: "Panggung Utama Festival Natal Kota Munich",
    summary:
      "Pagi Natal tiba, warga bersukacita menemukan semua barang mereka dikembalikan. Saat Walikota hendak marah besar, sang Pengelana melangkah maju dan membuka topengnya: ia adalah Freya, penasihat sang Walikota sendiri! Freya menyerahkan hadiah khusus untuk Walikota: boneka kecil yang ia dambakan sejak kecil. Hati Walikota luluh dalam tangis pengampunan. Valentine memainkan biolanya mengiringi lagu sukacita atas kasih Allah dan keluarga.",
    songs: ["March of the Toy Soldiers"],
    keyCharacters: ["Freya (Advisor/Traveler)", "Sang Walikota", "Seluruh Warga & Pemeran"],
    moral: "Kasih Allah dan pengampunan adalah hadiah terbaik yang layak dibagikan kepada dunia.",
  },
];

export const CAST_DATA: CastMember[] = [
  { character: "Heidi", actor: "Casey", category: "Pemeran Utama", roleDescription: "Gadis cilik periang penjual kue Natal yang penuh iman dan harapan." },
  { character: "Gisella", actor: "Elsheva", category: "Pemeran Utama", roleDescription: "Sahabat setia Heidi penjual karangan bunga yang mendoakan perubahan hati Walikota." },
  { character: "Advisor / Traveler (Pengelana)", actor: "Freya", category: "Pemeran Utama", roleDescription: "Sosok penasihat yang menyamar sebagai pengelana bertopeng untuk menolong warga." },
  { character: "Drosselmeyer", actor: "Javine", category: "Pemeran Utama", roleDescription: "Tokoh pembuat keajaiban Natal penuh misteri dan kearifan." },

  { character: "Victor (Ayah)", actor: "Kirston", category: "Keluarga", roleDescription: "Ayah pekerja keras penebang kayu yang tulus merawat keluarganya." },
  { character: "Valerie (Ibu)", actor: "Skye", category: "Keluarga", roleDescription: "Ibu penyayang yang penuh rasa syukur meski hidup bersahaja." },
  { character: "Vincent (Anak Laki-laki)", actor: "Haydn", category: "Keluarga", roleDescription: "Pemuda pemberani yang gigih membantu ayahnya bekerja." },
  { character: "Valentine (Anak Perempuan)", actor: "Adel", category: "Keluarga", roleDescription: "Gadis berbakat pemetik biola bersuara emas yang penuh cinta kasih." },

  { character: "Damon (Ayah)", actor: "Luke", category: "Keluarga", roleDescription: "Kepala keluarga kedua yang rela berkorban demi istri dan anak-anaknya." },
  { character: "Deloris (Ibu)", actor: "Helena", category: "Keluarga", roleDescription: "Ibu hangat yang gemar mendongengkan kisah bijak kepada anak-anaknya." },
  { character: "David", actor: "Maxton", category: "Keluarga", roleDescription: "Putra lincah yang rela memberikan tempat tidurnya bagi orang asing." },
  { character: "Diane", actor: "Leslie", category: "Keluarga", roleDescription: "Putri manis yang bermimpi menari balet dan menerima sepatu impian." },

  { character: "Merchant 1", actor: "Bella", category: "Pasar & Warga", roleDescription: "Pedagang kue kering Munich yang murah senyum dan bersahabat." },
  { character: "Merchant 2", actor: "Megan", category: "Pasar & Warga", roleDescription: "Pengrajin karangan bunga Natal cemara hijau yang sabar." },
  { character: "Merchant 3", actor: "Allison", category: "Pasar & Warga", roleDescription: "Pedagang pasar kota yang gigih berjuang mencari nafkah." },
  { character: "Shopper 1", actor: "Tiffany", category: "Pasar & Warga", roleDescription: "Pengunjung pasar yang gemar berbelanja hadiah untuk keluarga." },
  { character: "Shopper 2", actor: "Aracelli", category: "Pasar & Warga", roleDescription: "Pelanggan setia kue kering favorit sang suami." },
  { character: "Shopper 3", actor: "Emily", category: "Pasar & Warga", roleDescription: "Warga yang menghargai nilai ketulusan dalam memberi." },

  { character: "Bella (Pedagang Keliling)", actor: "Emily", category: "Pasar & Warga", roleDescription: "Pemimpin rombongan pedagang keliling pembawa pernak-pernik Natal." },
  { character: "Beth (Pedagang Keliling)", actor: "Micah", category: "Pasar & Warga", roleDescription: "Pedagang boneka dan mainan anak yang ceria." },
  { character: "Brenda (Pedagang Keliling)", actor: "Scherzi", category: "Pasar & Warga", roleDescription: "Pedagang topi wol hangat dan syal warna-warni." },
  { character: "Bonny (Pedagang Keliling)", actor: "Letycia", category: "Pasar & Warga", roleDescription: "Penjual cokelat manis yang membagikan pesan cinta kasih." },

  { character: "Villager 1", actor: "Nichelle", category: "Pasar & Warga", roleDescription: "Warga kota yang menyambut kedatangan para pedagang dengan ramah." },
  { character: "Villager 2", actor: "Liesel", category: "Pasar & Warga", roleDescription: "Warga kota yang merindukan kembalinya sukacita Natal." },
  { character: "Villager 3", actor: "Chloe (5)", category: "Pasar & Warga", roleDescription: "Anak desa yang mencari cokelat manis untuk keluarganya." },

  { character: "Henchman 1", actor: "Grant", category: "Prajurit & Penjaga", roleDescription: "Pengawal walikota penarik pajak yang bertindak tegas di pasar." },
  { character: "Henchman 2", actor: "Sam (4B)", category: "Prajurit & Penjaga", roleDescription: "Pengawal kedua yang gemar menyantap kue kering sitaan." },

  { character: "Singer", actor: "Thania", category: "Musik & Paduan Suara", roleDescription: "Penyanyi pembuka yang membawakan lagu White Christmas dengan anggun." },
  { character: "Narrator", actor: "Arissa", category: "Musik & Paduan Suara", roleDescription: "Narator pencerita yang menuntun alur kisah The Gift Worth Giving." },
  { character: "Dancer", actor: "Quinn", category: "Musik & Paduan Suara", roleDescription: "Penari balet anggun pengiring musik Tchaikovsky." },

  { character: "Choir 1", actor: "Lovanna", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 2", actor: "Arie", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 3", actor: "Caitlin", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 4", actor: "Chloe", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 5", actor: "Sofia", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 6", actor: "Victoria", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 7", actor: "Ashley", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 8", actor: "Amora", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 9", actor: "Joanne", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 10", actor: "Marion", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 11", actor: "Aria (3)", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
  { character: "Choir 12", actor: "Sofia", category: "Musik & Paduan Suara", roleDescription: "Anggota paduan suara harmoni Natal." },
];

export const VENUE_ZONES: VenueZone[] = [
  {
    id: "auditorium",
    name: "Main Auditorium & Grand Stage",
    code: "AUD",
    description: "Ruang pertunjukan panggung utama drama musikal The Gift Worth Giving dengan tata cahaya panggung dan sound system teater.",
    operatingHours: "Sesi I: 14.00 - 15.30 | Sesi II: 17.00 - 18.30 WIB",
    highlights: ["Panggung Teatrikal Megah", "Tempat Duduk Bertingkat", "Ruang Berpendingin Udara"],
    xPercent: 50,
    yPercent: 32,
    color: "#E5C07B",
  },
  {
    id: "market",
    name: "Christmas Market & Culinary Bazaar",
    code: "MKT",
    description: "Area pasar terbuka festival Natal yang menghadirkan puluhan stand makanan, kue khas Eropa, minuman hangat, dan cinderamata buatan siswa.",
    operatingHours: "12.00 - 20.00 WIB",
    highlights: ["25+ Stand Kuliner & Hadiah", "Meja Bersantap Warga", "Pohon Natal Lampu Peri"],
    xPercent: 26,
    yPercent: 62,
    color: "#38A169",
  },
  {
    id: "entrance",
    name: "Main Gate & Registration Desk",
    code: "REG",
    description: "Gerbang penyambutan utama bagi pengunjung umum, meja informasi tiket, penukaran tanda masuk, dan denah acara.",
    operatingHours: "Mulai 11.30 WIB",
    highlights: ["Akses Kursi Roda & Lansia", "Pemeriksaan Keamanan Ramah", "Buku Tamu Pengunjung"],
    xPercent: 50,
    yPercent: 88,
    color: "#3182CE",
  },
  {
    id: "photobooth",
    name: "Winter Wonderland Photo Plaza",
    code: "FOTO",
    description: "Spot foto bernuansa salju dan pohon cemara Natal raksasa lengkap dengan dekorasi kotak hadiah emas raksasa.",
    operatingHours: "12.00 - 20.00 WIB",
    highlights: ["Pohon Natal Raksasa 5 Meter", "Properti Topi & Syal Lucu", "Cahaya Foto Profesional"],
    xPercent: 74,
    yPercent: 60,
    color: "#DD6B20",
  },
  {
    id: "parking",
    name: "Drop-Off Zone & Visitor Parking",
    code: "PRK",
    description: "Area penurunan penumpang (drop-off) serta parkir kendaraan roda empat dan roda dua yang teratur dengan petugas keamanan kampus.",
    operatingHours: "11.00 - 20.30 WIB",
    highlights: ["Area Drop-off Bebas Macet", "Parkir Mobil & Motor Luas", "Petugas Keamanan 24 Jam"],
    xPercent: 82,
    yPercent: 86,
    color: "#805AD5",
  },
  {
    id: "medical",
    name: "First Aid & Information Center",
    code: "MED",
    description: "Pusat informasi kegiatan, penitipan barang, serta posko pertolongan pertama dengan tenaga medis siaga.",
    operatingHours: "11.30 - 20.30 WIB",
    highlights: ["Tenaga Medis Siaga", "Air Mineral Gratis", "Pusat Bantuan Informasi"],
    xPercent: 18,
    yPercent: 84,
    color: "#E53E3E",
  },
];
