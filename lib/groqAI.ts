// Multi-Layered AI Service directly grounded in Mind.Maze's 16 Published Fact Articles
import { INITIAL_ARTICLES } from "@/data/mockData";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const AI_LAYERS = [
  { model: "llama-3.3-70b-versatile", name: "Sistem Cerdas" },
  { model: "llama-3.1-8b-instant", name: "Sistem Cerdas" },
  { model: "mixtral-8x7b-32768", name: "Sistem Cerdas" },
];

export interface AICrosswordWord {
  number: number;
  direction: "across" | "down";
  word: string;
  clue: string;
  startRow: number;
  startCol: number;
}

export interface AICrosswordResult {
  title: string;
  category: string;
  grid: { rows: number; cols: number };
  words: AICrosswordWord[];
  modelUsed: string;
  layer: number;
}

export interface AIQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: string;
}

export interface AIQuizResult {
  title: string;
  category: string;
  questions: AIQuizQuestion[];
  modelUsed: string;
  layer: number;
}

// Compact context string generated from the actual 16 articles
function getArticlesContext(): string {
  return INITIAL_ARTICLES.map(
    (a, idx) =>
      `${idx + 1}. [${a.category}] "${a.title}": ${a.shortSummary}. ` +
      (a.crosswordClue ? `Kata kunci: ${a.crosswordClue.word} (${a.crosswordClue.clue}). ` : "") +
      (a.triviaPopup ? `Trivia: ${a.triviaPopup.text}.` : "")
  ).join("\n");
}

async function callGroqLayers(
  messages: Array<{ role: string; content: string }>,
  responseFormatJson: boolean = true
): Promise<{ text: string; modelName: string; layer: number }> {
  for (let i = 0; i < AI_LAYERS.length; i++) {
    const layer = AI_LAYERS[i];
    try {
      const payload: any = {
        model: layer.model,
        messages,
        temperature: 0.2,
        max_tokens: 1500,
      };

      if (responseFormatJson) {
        payload.response_format = { type: "json_object" };
      }

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices[0]?.message?.content;
        if (content) {
          return {
            text: content,
            modelName: "Sistem Cerdas",
            layer: i + 1,
          };
        }
      }
    } catch {
      // Continue to next layer
    }
  }

  throw new Error("Sistem AI sedang sibuk. Menggunakan bank soal artikel Mind.Maze.");
}

function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

/**
 * Generates an interlocking 2D Crossword Puzzle GROUNDED STRICTLY on Mind.Maze articles.
 */
export async function generateAICrossword(
  category: string = "Semua Kategori",
  wordCount?: number
): Promise<AICrosswordResult> {
  const articlesContext = getArticlesContext();

  const prompt = `Anda adalah master Teka-Teki Silang (TTS) edukatif untuk platform Mind.Maze.
Tugas Anda adalah menyusun Teka-Teki Silang yang DIAMBIL KHUSUS DAN HANYA DARI ARTIKEL-ARTIKEL RESMI MIND.MAZE BERIKUT:
${articlesContext}

Aturan Ketat:
1. Kata jawaban dan petunjuk (clue) HARUS diambil dari isi fakta artikel di atas (contoh: BLUETOOTH, FLEMING, QWERTY, LOUVRE, PERSIA, ORANYE, PLACEBO, dsb).
2. Setiap kata harus berupa 1 KATA BAHASA INDONESIA / NAMA YANG VALID (HURUF KAPITAL A-Z, tanpa spasi, tanpa angka).
3. Buatlah minimal 2 hingga 4 kata saling berpotongan (interlocking) pada baris (startRow) dan kolom (startCol) koordinat 0-indexed yang konsisten dan akurat.
4. Tentukan ukuran grid { rows, cols } yang cukup memuat kata.
5. Clue harus spesifik merujuk fakta pada artikel Mind.Maze.

Format JSON yang wajib dikembalikan:
{
  "title": "Teka-Teki Silang Fakta Mind.Maze",
  "category": "${category}",
  "grid": { "rows": 8, "cols": 10 },
  "words": [
    {
      "number": 1,
      "direction": "across",
      "word": "BLUETOOTH",
      "clue": "Teknologi nirkabel yang dinamai dari Raja Viking abad ke-10 Harald Gormsson.",
      "startRow": 1,
      "startCol": 0
    },
    {
      "number": 2,
      "direction": "down",
      "word": "LOUVRE",
      "clue": "Museum ternama di Paris tempat lukisan Mona Lisa dicuri pada tahun 1911.",
      "startRow": 1,
      "startCol": 1
    }
  ]
}`;

  try {
    const result = await callGroqLayers([
      {
        role: "system",
        content:
          "Anda adalah master TTS edukatif bahasa Indonesia yang selalu menyusun teka-teki silang berdasarkan fakta artikel Mind.Maze yang disediakan. Selalu respon dengan format JSON murni.",
      },
      { role: "user", content: prompt },
    ]);

    const cleaned = cleanJsonText(result.text);
    const parsed = JSON.parse(cleaned);
    if (parsed.words && Array.isArray(parsed.words) && parsed.words.length > 0) {
      return {
        title: parsed.title || `Teka-Teki Silang: Fakta Mind.Maze`,
        category: parsed.category || category,
        grid: parsed.grid || { rows: 8, cols: 10 },
        words: parsed.words,
        modelUsed: "Sistem Cerdas",
        layer: result.layer,
      };
    }
  } catch {
    // Fallback to grounded local crossword
  }

  return getLocalFallbackCrossword(category);
}

/**
 * Generates Multiple-Choice Trivia Quiz GROUNDED STRICTLY on Mind.Maze articles.
 */
export async function generateAIQuiz(
  category: string = "Semua Kategori",
  count: number = 6
): Promise<AIQuizResult> {
  const articlesContext = getArticlesContext();

  const prompt = `Anda adalah master kuis trivia resmi untuk platform Mind.Maze.
Buatlah ${count} pertanyaan kuis pilihan ganda yang DIANGKAT LANGSUNG DARI ARTIKEL-ARTIKEL RESMI MIND.MAZE BERIKUT:
${articlesContext}

Aturan Mutlak:
1. SETIAP SOAL HARUS MENGUJI FAKTA DARI ARTIKEL DI ATAS (misalnya tentang sejarah wortel ungu, asal nama Bluetooth raja Viking, penemuan penisilin Alexander Fleming, pencurian Mona Lisa di Louvre 1911, mesin tik QWERTY Christopher Sholes, dryad pada mitos ketuk kayu, dsb).
2. Setiap pertanyaan harus memiliki 4 opsi jawaban dengan 1 jawaban benar.
3. Berikan "explanation" yang mendidik dan mengacu pada penjelasan di artikel.
4. Sertakan "category" yang sesuai dari kategori Mind.Maze ("Asal-Usul Benda", "Mitos Populer", "Peristiwa Bersejarah", "Sains & Tubuh Manusia").

Format JSON yang wajib dikembalikan:
{
  "title": "Kuis Trivia Fakta Mind.Maze",
  "category": "${category}",
  "questions": [
    {
      "id": 1,
      "question": "Warna asli wortel liar sebelum didomestikasi dan dibiakkan menjadi oranye di Belanda adalah...",
      "options": ["Ungu dan Kuning", "Merah dan Biru", "Hitam dan Cokelat", "Hijau Terang"],
      "correctIndex": 0,
      "explanation": "Wortel awal yang didomestikasi di Dataran Tinggi Iran abad ke-10 adalah varietas ungu dan kuning. Warna oranye baru distabilkan petani Belanda abad ke-17 untuk menghormati William of Orange.",
      "category": "Asal-Usul Benda"
    }
  ]
}`;

  try {
    const result = await callGroqLayers([
      {
        role: "system",
        content:
          "Anda adalah penguji kuis trivia interaktif untuk platform Mind.Maze. Semua soal Anda harus berakar pada 16 artikel fakta yang disediakan. Selalu balas dalam format JSON murni.",
      },
      { role: "user", content: prompt },
    ]);

    const cleanedText = cleanJsonText(result.text);
    const parsed = JSON.parse(cleanedText);
    if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      return {
        title: parsed.title || "Kuis Trivia Fakta Mind.Maze",
        category: parsed.category || "Semua Kategori",
        questions: parsed.questions,
        modelUsed: "Sistem Cerdas",
        layer: result.layer,
      };
    }
  } catch {
    // Fallback to grounded local quiz
  }

  return getLocalFallbackQuiz(category);
}

/**
 * High-quality fallback crossword derived directly from Mind.Maze articles
 */
function getLocalFallbackCrossword(category: string): AICrosswordResult {
  return {
    title: "Teka-Teki Silang Fakta Mind.Maze",
    category: category,
    grid: { rows: 9, cols: 10 },
    words: [
      {
        number: 1,
        direction: "across",
        word: "BLUETOOTH",
        clue: "Teknologi nirkabel yang dinamai dari Raja Viking abad ke-10 Harald Gormsson.",
        startRow: 1,
        startCol: 0,
      },
      {
        number: 2,
        direction: "down",
        word: "LOUVRE",
        clue: "Museum Paris tempat lukisan Mona Lisa dicuri oleh Vincenzo Peruggia pada tahun 1911.",
        startRow: 1,
        startCol: 1,
      },
      {
        number: 3,
        direction: "down",
        word: "QWERTY",
        clue: "Tata letak keyboard ciptaan Christopher Sholes 1873 untuk mencegah tabrakan tuas mesin tik.",
        startRow: 1,
        startCol: 8,
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 4,
  };
}

/**
 * 100% grounded fallback quiz testing actual Mind.Maze published articles
 */
function getLocalFallbackQuiz(category: string = "Semua Kategori"): AIQuizResult {
  return {
    title: "Kuis Trivia Fakta Mind.Maze",
    category: category,
    questions: [
      {
        id: 1,
        question:
          "Warna asli wortel sebelum dibiakkan menjadi dominan oranye oleh petani Belanda pada abad ke-17 adalah:",
        options: [
          "Ungu dan Kuning",
          "Merah dan Putih",
          "Biru dan Cokelat",
          "Hijau Terang",
        ],
        correctIndex: 0,
        explanation:
          "Wortel awal yang didomestikasi di Persia abad ke-10 terdiri dari varietas ungu (mengandung antosianin) dan kuning. Petani Belanda abad ke-17 memuliakan varietas oranye untuk menghormati Wangsa Oranje (William of Orange).",
        category: "Asal-Usul Benda",
      },
      {
        id: 2,
        question:
          "Siapakah tokoh sejarah yang menjadi inspirasi nama dan logo teknologi nirkabel 'Bluetooth'?",
        options: [
          "Raja Harald Bluetooth Gormsson",
          "Kaisar Napoleon Bonaparte",
          "Raja Louis XIV dari Prancis",
          "Gideon Sundback",
        ],
        correctIndex: 0,
        explanation:
          "Jim Kardach dari Intel mengusulkan nama Harald Bluetooth, raja Viking abad ke-10 yang menyatukan Skandinavia. Logonya merupakan gabungan bindrune huruf Hagalaz (ᚼ) dan Berkanan (ᛒ).",
        category: "Asal-Usul Benda",
      },
      {
        id: 3,
        question:
          "Pada tahun 1911, lukisan mahakarya Mona Lisa karya Leonardo da Vinci sempat dicuri dari museum:",
        options: [
          "Museum Louvre, Paris",
          "The British Museum, London",
          "Museum Hermitage, St. Petersburg",
          "Museum Prado, Madrid",
        ],
        correctIndex: 0,
        explanation:
          "Vincenzo Peruggia, mantan pekerja kaca di Louvre, menyembunyikan Mona Lisa di balik mantelnya pada 21 Agustus 1911. Pencurian spektakuler ini yang membuat Mona Lisa mendunia.",
        category: "Peristiwa Bersejarah",
      },
      {
        id: 4,
        question:
          "Apa alasan ilmiah mengapa kuku dan rambut tampak memanjang pada jenazah manusia setelah meninggal?",
        options: [
          "Sel kuku terus membelah selama 30 hari",
          "Ilusi optik akibat retraksi dan dehidrasi jaringan kulit",
          "Pertumbuhan folikel rambut akibat enzim sisa",
          "Peningkatan sirkulasi darah pasca henti jantung",
        ],
        correctIndex: 1,
        explanation:
          "Menurut riset dr. Rachel Vreeman di British Medical Journal, kematian menghentikan suplai glukosa seketika. Kulit di sekitar rambut dan kuku menyusut akibat dehidrasi, sehingga kuku terlihat memanjang padahal tidak tumbuh sama sekali.",
        category: "Mitos Populer",
      },
      {
        id: 5,
        question:
          "Mengapa Christopher Sholes menyusun keyboard dengan format QWERTY pada mesin tik tahun 1873?",
        options: [
          "Agar kecepatan mengetik manusia mencapai rekor tertinggi",
          "Mencegah tabrakan mekanis antar tuas huruf yang sering ditekan berurutan",
          "Mengikuti urutan abjad Yunani kuno",
          "Instruksi khusus dari militer telegraf Amerika Serikat",
        ],
        correctIndex: 1,
        explanation:
          "Pada mesin tik mekanik awal, pengetikan yang terlalu cepat menyebabkan tuas huruf saling bertabrakan dan macet. Sholes memisahkan pasangan huruf yang sering berurutan (seperti T-H dan S-T) guna mencegah tabrakan tuas.",
        category: "Asal-Usul Benda",
      },
      {
        id: 6,
        question:
          "Siapakah ilmuwan yang secara tidak sengaja menemukan penisilin dari cawan petri yang terkontaminasi jamur Penicillium notatum pada 1928?",
        options: [
          "Alexander Fleming",
          "Louis Pasteur",
          "Robert Koch",
          "Edward Jenner",
        ],
        correctIndex: 0,
        explanation:
          "Dr. Alexander Fleming menemukan cawan petri bakteri Staphylococcus miliknya tertutup jamur Penicillium notatum yang membentuk zona bebas bakteri, menjadi awal mula era antibiotik modern.",
        category: "Peristiwa Bersejarah",
      },
      {
        id: 7,
        question:
          "Akar tradisi mengetuk kayu (knock on wood) untuk menolak bala berasal dari kepercayaan animisme bangsa kuno terhadap:",
        options: [
          "Dryad atau roh pelindung yang bersemayam di dalam pepohonan",
          "Dewa petir Thor yang memegang palu kayu",
          "Ritual pedagang sutra Cina untuk menguji kualitas kayu kapal",
          "Peraturan arsitektur kuil batu Yunani",
        ],
        correctIndex: 0,
        explanation:
          "Bangsa Celtic dan suku Jerman kuno meyakini pohon-pohon besar dihuni oleh Dryad (roh pohon). Mengetuk batang kayu dilakukan untuk meminta perlindungan atau berterima kasih atas keberuntungan yang diterima.",
        category: "Mitos Populer",
      },
      {
        id: 8,
        question:
          "Apa peristiwa tragis yang mendasari Presiden AS Ronald Reagan membuka teknologi navigasi GPS untuk publik dunia pada 1983?",
        options: [
          "Penembakan pesawat komersil Korean Air Lines Penerbangan 007",
          "Krisis Selat Malaka pada era Perang Dingin",
          "Tenggelamnya kapal selam nuklir K-129",
          "Bencana pendaratan darurat Apollo 13",
        ],
        correctIndex: 0,
        explanation:
          "Pesawat sipil KAL 007 ditembak jatuh jet tempur Soviet setelah tersesat akibat navigasi autopilot yang melenceng. Presiden Reagan mengeluarkan arahan agar sistem militer Navstar GPS dibuka gratis untuk sipil seluruh dunia demi keselamatan penerbangan.",
        category: "Peristiwa Bersejarah",
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 4,
  };
}
