// Multi-Layered AI Service directly grounded in Mind.Maze's 16 Published Fact Articles
import { INITIAL_ARTICLES } from "@/data/mockData";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const AI_LAYERS = [
  { model: "qwen/qwen3.8-27b", name: "Sistem Cerdas Qwen" },
  { model: "openai/gpt-oss-20b", name: "Sistem Cerdas GPT" },
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

// 4 Verified 100% Interlocking Crossword Presets Grounded in Mind.Maze 16 Articles
export const ARTICLE_CROSSWORD_PRESETS: AICrosswordResult[] = [
  {
    title: "Teka-Teki Silang: Sistem Komputasi & Budaya",
    category: "Rahasia Sistem dan Inovasi",
    grid: { rows: 7, cols: 9 },
    words: [
      {
        number: 1,
        direction: "across",
        word: "BLUETOOTH",
        clue: "Teknologi nirkabel yang dinamai dari Raja Viking abad ke-10 Harald Gormsson yang menyatukan Skandinavia.",
        startRow: 1,
        startCol: 0,
      },
      {
        number: 2,
        direction: "down",
        word: "LOUVRE",
        clue: "Museum seni ternama di Paris tempat lukisan legendaris Mona Lisa dipajang dan pernah dicuri tahun 1911.",
        startRow: 1,
        startCol: 1,
      },
      {
        number: 3,
        direction: "across",
        word: "RESTART",
        clue: "Fungsi reboot komputer (Ctrl+Alt+Del) ciptaan David Bradley di IBM untuk mengatasi sistem freeze.",
        startRow: 5,
        startCol: 1,
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 1,
  },
  {
    title: "Teka-Teki Silang: Asal-Usul & Sejarah Teknologi",
    category: "Asal-Usul Benda Sehari-hari",
    grid: { rows: 9, cols: 10 },
    words: [
      {
        number: 1,
        direction: "across",
        word: "ANTOSIANIN",
        clue: "Pigmen alami pemberi warna ungu pekat pada varietas wortel domestikasi awal di Persia abad ke-10.",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 2,
        direction: "down",
        word: "SANGGURDI",
        clue: "Pijakan kaki pada pelana kuda tempat hak sepatu tentara kavaleri Persia pertama kali dikaitkan.",
        startRow: 0,
        startCol: 4,
      },
      {
        number: 3,
        direction: "across",
        word: "DEBUGGING",
        clue: "Istilah pelacakan dan perbaikan bug komputer yang diabadikan Grace Hopper usai insiden ngengat 1947.",
        startRow: 3,
        startCol: 0,
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 1,
  },
  {
    title: "Teka-Teki Silang: Misteri Otak & Perilaku",
    category: "Misteri Perilaku Manusia",
    grid: { rows: 8, cols: 9 },
    words: [
      {
        number: 1,
        direction: "across",
        word: "DOPAMIN",
        clue: "Zat neurotransmiter otak yang mengalir deras saat menikmati makanan atau minuman berlabel harga mahal.",
        startRow: 1,
        startCol: 1,
      },
      {
        number: 2,
        direction: "down",
        word: "NAVIGASI",
        clue: "Sistem penentuan koordinat rute GPS yang dulunya sengaja dikaburkan akurasinya oleh militer AS.",
        startRow: 0,
        startCol: 4,
      },
      {
        number: 3,
        direction: "across",
        word: "DIFUSI",
        clue: "Penyebaran rasa tanggung jawab dalam fenomena bystander effect yang menghambat tindakan menolong.",
        startRow: 6,
        startCol: 0,
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 1,
  },
  {
    title: "Teka-Teki Silang: Budaya Pop & Mitos",
    category: "Sisi Unik Pop Culture",
    grid: { rows: 10, cols: 8 },
    words: [
      {
        number: 1,
        direction: "across",
        word: "FOLKLOR",
        clue: "Cerita rakyat dan adat tradisi turun-temurun di balik kebiasaan mengetuk kayu 'amit-amit'.",
        startRow: 2,
        startCol: 0,
      },
      {
        number: 2,
        direction: "down",
        word: "DIFUSI",
        clue: "Penyebaran rasa tanggung jawab pada kerumunan orang banyak yang menghambat tindakan darurat.",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 3,
        direction: "down",
        word: "RETRAKSI",
        clue: "Peristiwa menyusutnya kulit akibat dehidrasi pasca-kematian yang menimbulkan ilusi kuku memanjang.",
        startRow: 2,
        startCol: 6,
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 1,
  },
];

// Compact context string generated from the actual 16 articles
function getArticlesContext(category?: string): string {
  const filtered =
    category && category !== "Semua Kategori"
      ? INITIAL_ARTICLES.filter(
          (a) =>
            a.category.toLowerCase().includes(category.toLowerCase()) ||
            a.categorySlug === category
        )
      : INITIAL_ARTICLES;

  const targetList = filtered.length > 0 ? filtered : INITIAL_ARTICLES;

  return targetList
    .map(
      (a, idx) =>
        `${idx + 1}. [Kategori: ${a.category}] "${a.title}": ${a.shortSummary}. ` +
        (a.crosswordClue
          ? `KATA KUNCI UTAMA: ${a.crosswordClue.word} (Petunjuk: ${a.crosswordClue.clue}). `
          : "") +
        (a.triviaPopup ? `Fakta: ${a.triviaPopup.text}.` : "")
    )
    .join("\n");
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
            modelName: layer.name,
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
 * Robust 2D Crossword Interlocking Layout Engine
 * Validates or computes coordinates so words intersect at identical letters with 0 collisions.
 */
function buildInterlockingCrossword(
  rawWords: any[],
  category: string = "Semua Kategori",
  modelName: string = "Sistem Cerdas (Groq AI)",
  layer: number = 1
): AICrosswordResult | null {
  if (!rawWords || !Array.isArray(rawWords) || rawWords.length === 0) {
    return null;
  }

  // Sanitize words
  const cleanWords = rawWords
    .map((item) => ({
      word: (item.word || "").toUpperCase().replace(/[^A-Z]/g, ""),
      clue: (item.clue || "").trim(),
      direction: item.direction as "across" | "down" | undefined,
      startRow: typeof item.startRow === "number" ? item.startRow : undefined,
      startCol: typeof item.startCol === "number" ? item.startCol : undefined,
      number: typeof item.number === "number" ? item.number : undefined,
    }))
    .filter((item) => item.word.length >= 3 && item.clue.length > 0);

  if (cleanWords.length < 2) return null;

  // 1. Check if AI already provided coordinates that are 100% collision-free & interlocking
  let aiCoordinatesValid = true;
  let intersectionCount = 0;
  const gridMap = new Map<string, string>();

  for (const item of cleanWords) {
    if (
      typeof item.startRow !== "number" ||
      typeof item.startCol !== "number" ||
      !item.direction
    ) {
      aiCoordinatesValid = false;
      break;
    }

    for (let i = 0; i < item.word.length; i++) {
      const r = item.direction === "across" ? item.startRow : item.startRow + i;
      const c = item.direction === "across" ? item.startCol + i : item.startCol;
      const key = `${r},${c}`;
      if (gridMap.has(key)) {
        if (gridMap.get(key) !== item.word[i]) {
          aiCoordinatesValid = false;
          break;
        } else {
          intersectionCount++;
        }
      } else {
        gridMap.set(key, item.word[i]);
      }
    }
    if (!aiCoordinatesValid) break;
  }

  if (aiCoordinatesValid && intersectionCount > 0) {
    let minR = Infinity,
      minC = Infinity,
      maxR = -Infinity,
      maxC = -Infinity;

    cleanWords.forEach((item) => {
      for (let i = 0; i < item.word.length; i++) {
        const r = item.direction === "across" ? item.startRow! : item.startRow! + i;
        const c = item.direction === "across" ? item.startCol! + i : item.startCol!;
        if (r < minR) minR = r;
        if (c < minC) minC = c;
        if (r > maxR) maxR = r;
        if (c > maxC) maxC = c;
      }
    });

    const normalized = cleanWords.map((item, idx) => ({
      number: idx + 1,
      direction: item.direction!,
      word: item.word,
      clue: item.clue,
      startRow: item.startRow! - minR,
      startCol: item.startCol! - minC,
    }));

    return {
      title: "Teka-Teki Silang Fakta Mind.Maze",
      category,
      grid: { rows: maxR - minR + 1, cols: maxC - minC + 1 },
      words: normalized,
      modelUsed: modelName,
      layer,
    };
  }

  // 2. If AI coordinates were imperfect or missing, compute exact interlocking geometry
  const placed: AICrosswordWord[] = [];
  const cellMap = new Map<string, string>();

  function setChar(r: number, c: number, ch: string) {
    cellMap.set(`${r},${c}`, ch);
  }
  function getChar(r: number, c: number) {
    return cellMap.get(`${r},${c}`);
  }

  // Place first word horizontally
  const w0 = cleanWords[0];
  const firstPlaced: AICrosswordWord = {
    number: 1,
    direction: "across",
    word: w0.word,
    clue: w0.clue,
    startRow: 0,
    startCol: 0,
  };
  for (let i = 0; i < w0.word.length; i++) {
    setChar(0, i, w0.word[i]);
  }
  placed.push(firstPlaced);

  let numSeq = 2;
  const pool = [...cleanWords.slice(1)];

  for (const cand of pool) {
    let placedSuccess = false;

    for (const p of placed) {
      if (placedSuccess) break;
      const targetDir = p.direction === "across" ? "down" : "across";

      for (let i = 0; i < p.word.length; i++) {
        if (placedSuccess) break;
        const pChar = p.word[i];
        const pR = p.direction === "across" ? p.startRow : p.startRow + i;
        const pC = p.direction === "across" ? p.startCol + i : p.startCol;

        for (let j = 0; j < cand.word.length; j++) {
          if (cand.word[j] === pChar) {
            const cStartRow = targetDir === "across" ? pR : pR - j;
            const cStartCol = targetDir === "across" ? pC - j : pC;

            let canPlace = true;
            for (let k = 0; k < cand.word.length; k++) {
              const cR = targetDir === "across" ? cStartRow : cStartRow + k;
              const cC = targetDir === "across" ? cStartCol + k : cStartCol;
              const existing = getChar(cR, cC);
              if (existing && existing !== cand.word[k]) {
                canPlace = false;
                break;
              }
            }

            if (canPlace) {
              const newPlaced: AICrosswordWord = {
                number: numSeq++,
                direction: targetDir,
                word: cand.word,
                clue: cand.clue,
                startRow: cStartRow,
                startCol: cStartCol,
              };
              for (let k = 0; k < cand.word.length; k++) {
                const cR = targetDir === "across" ? cStartRow : cStartRow + k;
                const cC = targetDir === "across" ? cStartCol + k : cStartCol;
                setChar(cR, cC, cand.word[k]);
              }
              placed.push(newPlaced);
              placedSuccess = true;
              break;
            }
          }
        }
      }
    }
  }

  if (placed.length >= 2) {
    let minR = Infinity,
      minC = Infinity,
      maxR = -Infinity,
      maxC = -Infinity;

    placed.forEach((p) => {
      for (let i = 0; i < p.word.length; i++) {
        const r = p.direction === "across" ? p.startRow : p.startRow + i;
        const c = p.direction === "across" ? p.startCol + i : p.startCol;
        if (r < minR) minR = r;
        if (c < minC) minC = c;
        if (r > maxR) maxR = r;
        if (c > maxC) maxC = c;
      }
    });

    placed.forEach((p) => {
      p.startRow -= minR;
      p.startCol -= minC;
    });

    return {
      title: "Teka-Teki Silang Fakta Mind.Maze",
      category,
      grid: { rows: maxR - minR + 1, cols: maxC - minC + 1 },
      words: placed,
      modelUsed: modelName,
      layer,
    };
  }

  return null;
}

/**
 * Generates an interlocking 2D Crossword Puzzle GROUNDED STRICTLY on Mind.Maze articles.
 */
export async function generateAICrossword(
  category: string = "Semua Kategori",
  wordCount?: number
): Promise<AICrosswordResult> {
  const articlesContext = getArticlesContext(category);

  const prompt = `Anda adalah master Teka-Teki Silang (TTS) edukatif untuk platform Mind.Maze.
Tugas Anda adalah menyusun Teka-Teki Silang yang DIAMBIL KHUSUS DAN HANYA DARI ARTIKEL-ARTIKEL RESMI MIND.MAZE BERIKUT:
${articlesContext}

Aturan Ketat:
1. Kata jawaban dan petunjuk (clue) HARUS diambil dari fakta pada artikel Mind.Maze di atas (misal: BLUETOOTH, LOUVRE, RESTART, ANTOSIANIN, SANGGURDI, DEBUGGING, DOPAMIN, NAVIGASI, FOLKLOR, RETRAKSI, dsb).
2. Pilihlah 2 hingga 4 kata yang memiliki huruf sama agar dapat saling berpotongan (interlocking) pada grid teka-teki silang.
3. Clue harus mendidik, menarik, dan secara akurat menguji pemahaman fakta artikel.
4. Kembalikan format JSON murni:
{
  "title": "Teka-Teki Silang Fakta Mind.Maze",
  "category": "${category}",
  "words": [
    {
      "word": "BLUETOOTH",
      "clue": "Teknologi nirkabel yang dinamai dari Raja Viking abad ke-10 Harald Gormsson yang menyatukan Skandinavia."
    },
    {
      "word": "LOUVRE",
      "clue": "Museum seni di Paris tempat lukisan legendaris Mona Lisa dipajang dan pernah dicuri tahun 1911."
    }
  ]
}`;

  try {
    const result = await callGroqLayers([
      {
        role: "system",
        content:
          "Anda adalah master TTS edukatif bahasa Indonesia yang selalu menyusun teka-teki silang berdasarkan fakta artikel Mind.Maze yang disediakan. Selalu balas dalam format JSON murni.",
      },
      { role: "user", content: prompt },
    ]);

    const cleaned = cleanJsonText(result.text);
    const parsed = JSON.parse(cleaned);

    if (parsed.words && Array.isArray(parsed.words) && parsed.words.length > 0) {
      const crossword = buildInterlockingCrossword(
        parsed.words,
        category,
        result.modelName,
        result.layer
      );
      if (crossword) {
        return crossword;
      }
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
  const articlesContext = getArticlesContext(category);

  const prompt = `Anda adalah master kuis trivia resmi untuk platform Mind.Maze.
Buatlah ${count} pertanyaan kuis pilihan ganda yang DIANGKAT LANGSUNG DARI ARTIKEL-ARTIKEL RESMI MIND.MAZE BERIKUT:
${articlesContext}

Aturan Mutlak:
1. SETIAP SOAL HARUS MENGUJI FAKTA DARI ARTIKEL DI ATAS (misalnya tentang sejarah wortel ungu, asal nama Bluetooth raja Viking, penemuan bug ngengat Grace Hopper 1947, pencurian Mona Lisa di Louvre 1911, tombol Ctrl+Alt+Del IBM, dsb).
2. Setiap pertanyaan harus memiliki 4 opsi jawaban dengan 1 jawaban benar.
3. Berikan "explanation" yang mendidik dan mengacu pada penjelasan di artikel.
4. Sertakan "category" yang sesuai dari kategori Mind.Maze ("Asal-Usul Benda Sehari-hari", "Sisi Unik Pop Culture", "Misteri Perilaku Manusia", "Rahasia Sistem dan Inovasi").

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
      "category": "Asal-Usul Benda Sehari-hari"
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
        modelUsed: result.modelName,
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
export function getLocalFallbackCrossword(category: string = "Semua Kategori"): AICrosswordResult {
  if (category && category !== "Semua Kategori") {
    const matched = ARTICLE_CROSSWORD_PRESETS.find(
      (p) => p.category.toLowerCase().includes(category.toLowerCase())
    );
    if (matched) return matched;
  }

  // Pick random preset for variety
  const randomIndex = Math.floor(Math.random() * ARTICLE_CROSSWORD_PRESETS.length);
  return ARTICLE_CROSSWORD_PRESETS[randomIndex];
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
        category: "Asal-Usul Benda Sehari-hari",
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
        category: "Rahasia Sistem dan Inovasi",
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
        category: "Sisi Unik Pop Culture",
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
          "Menurut riset medis di British Medical Journal, kematian menghentikan suplai glukosa seketika. Kulit di sekitar rambut dan kuku menyusut akibat dehidrasi, sehingga kuku terlihat memanjang padahal tidak tumbuh sama sekali.",
        category: "Sisi Unik Pop Culture",
      },
      {
        id: 5,
        question:
          "Insiden 'bug' pertama yang tercatat dalam sejarah komputasi pada 1947 melibatkan seekor serangga sungguhan, yaitu:",
        options: [
          "Seekor ngengat di antara Relai Harvard Mark II",
          "Seekor kecoak di sirkuit IBM",
          "Semut peluru di kartu punch",
          "Lalat di tabung vakum ENIAC",
        ],
        correctIndex: 0,
        explanation:
          "Pada 9 September 1947, teknisi Harvard menemukan ngengat mati terselip di Relai 70 Panel F kalkulator Mark II. Grace Hopper menempelkannya di buku catatan dengan tulisan 'First actual case of bug being found'.",
        category: "Rahasia Sistem dan Inovasi",
      },
      {
        id: 6,
        question:
          "Fenomena psikologis di mana seseorang enggan menolong korban saat banyak orang lain hadir di lokasi disebut:",
        options: [
          "Bystander Effect (Difusi Tanggung Jawab)",
          "Doorway Effect",
          "Placebo Bias",
          "Dunning-Kruger Effect",
        ],
        correctIndex: 0,
        explanation:
          "Bystander effect terjadi karena difusi tanggung jawab, di mana setiap orang berasumsi ada orang lain yang akan bertindak terlebih dahulu.",
        category: "Misteri Perilaku Manusia",
      },
    ],
    modelUsed: "Kurasi Fakta Mind.Maze",
    layer: 4,
  };
}
