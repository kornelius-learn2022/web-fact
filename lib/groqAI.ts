// Multi-Layered AI Service with resilient fallback layers

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

// Hierarchical AI models
const AI_LAYERS = [
  { model: "groq/compound", name: "Sistem Cerdas" },
  { model: "groq/compound-mini", name: "Sistem Cerdas" },
  { model: "qwen/qwen3.8-27b", name: "Sistem Cerdas" },
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

/**
 * Executes a prompt across multiple AI layers with automatic fallback.
 */
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
        temperature: 0.3,
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
    } catch (err) {
      console.warn(`Layer ${i + 1} (${layer.model}) gagal, beralih ke layer cadangan...`);
    }
  }

  throw new Error("Sistem AI sedang sibuk. Silakan coba sesaat lagi.");
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
 * Generates an interlocking 2D Crossword Puzzle where AI decides optimal word count.
 */
export async function generateAICrossword(
  category: string = "Semua Kategori",
  wordCount?: number
): Promise<AICrosswordResult> {
  const countInstruction = wordCount
    ? `Buatlah ${wordCount} kata`
    : `Tentukan sendiri jumlah kata yang optimal dan kaya wawasan menurut Anda (buat antara 3 hingga 5 kata yang saling berpotongan/interlocking)`;

  const themeInstruction =
    category === "Semua Kategori"
      ? "mengambil fakta edukatif dari beragam domain ilmu (Sains, Teknologi, Sejarah, Bahasa, Alam, Seni)"
      : `dengan tema "${category}"`;

  const prompt = `Anda adalah generator Teka-Teki Silang (TTS) edukatif bahasa Indonesia untuk platform Mind.Maze.
${countInstruction} ${themeInstruction}. Biarkan Anda (AI) yang memutuskan jumlah kata dan struktur silang terbaik.

Aturan Ketat:
1. Setiap kata harus berupa 1 KATA BENDA / FAKTA BAHASA INDONESIA yang valid (HANYA HURUF KAPITAL A-Z, tanpa spasi, tanpa angka, tanpa tanda hubung).
2. Terdapat kata MENDATAR (direction: "across") dan kata MENURUN (direction: "down").
3. Kata-kata tersebut HARUS saling berpotongan (interlocking) di 1 huruf yang sama pada baris (startRow) dan kolom (startCol) koordinat 0-indexed yang konsisten dan akurat.
4. Tentukan ukuran grid { rows, cols } yang cukup memuat seluruh kata tanpa terpotong (misalnya 7 baris x 8 kolom atau 8 baris x 10 kolom).
5. Petunjuk (clue) harus informatif, ringkas, dan mendidik.

Kembalikan HANYA format JSON valid berikut tanpa penjelasan tambahan di luar JSON:
{
  "title": "Teka-Teki Silang: ${category}",
  "category": "${category}",
  "grid": { "rows": 7, "cols": 8 },
  "words": [
    {
      "number": 1,
      "direction": "across",
      "word": "KOMPUTER",
      "clue": "Perangkat pemroses data elektronik.",
      "startRow": 1,
      "startCol": 0
    },
    {
      "number": 2,
      "direction": "down",
      "word": "PROTON",
      "clue": "Partikel subatomik bermuatan positif di inti atom.",
      "startRow": 1,
      "startCol": 3
    }
  ]
}`;

  try {
    const result = await callGroqLayers([
      {
        role: "system",
        content:
          "Anda adalah generator Teka-Teki Silang profesional berbahasa Indonesia. Kembalikan selalu format JSON murni.",
      },
      { role: "user", content: prompt },
    ]);

    const cleaned = cleanJsonText(result.text);
    const parsed = JSON.parse(cleaned);
    if (parsed.words && Array.isArray(parsed.words) && parsed.words.length > 0) {
      return {
        title: parsed.title || `Teka-Teki Silang: ${category}`,
        category: parsed.category || category,
        grid: parsed.grid || { rows: 7, cols: 8 },
        words: parsed.words,
        modelUsed: "Sistem Cerdas",
        layer: result.layer,
      };
    }
  } catch (err) {
    console.warn("Semua layer online tidak merespons, mengaktifkan safety net lokal...");
  }

  // Resilient Local Safety Net
  return getLocalFallbackCrossword(category);
}

/**
 * Generates Multiple-Choice Trivia Quiz where AI dynamically decides the number of questions,
 * pulling references across ALL categories (Sains, Teknologi, Psikologi, Sejarah, Ekonomi, Seni).
 */
export async function generateAIQuiz(
  category: string = "Semua Kategori",
  count?: number
): Promise<AIQuizResult> {
  const countInstruction = count
    ? `Buatlah ${count} pertanyaan kuis`
    : `Tentukan sendiri jumlah pertanyaan yang banyak, kaya wawasan, dan menantang (buat antara 5 hingga 8 pertanyaan pilihan ganda berbobot)`;

  const prompt = `Anda adalah master kuis trivia edukasi bahasa Indonesia untuk platform Mind.Maze.
${countInstruction} dengan mengambil referensi secara merata dan kaya dari SEMUA KATEGORI pengetahuan Mind.Maze:
- Sains & Alam (Science)
- Teknologi & Komputasi (Technology)
- Psikologi & Pikiran (Psychology)
- Sejarah & Peradaban (History)
- Ekonomi & Pasar Global (Economy)
- Seni & Kebudayaan (Art & Culture)

Aturan:
1. Jangan membatasi hanya pada 1 topik. Variasikan setiap nomor pertanyaan dari bidang kategori yang berbeda secara seimbang agar mencakup seluruh spektrum wawasan multidisiplin.
2. Setiap pertanyaan harus memiliki 4 opsi jawaban (A, B, C, D) dengan 1 jawaban benar.
3. Berikan penjelasan singkat, mendalam, dan edukatif di setiap nomor.
4. Sertakan field "category" pada setiap nomor soal yang menandakan rumpun ilmunya (contoh: "Sains", "Teknologi", "Psikologi", "Sejarah", "Ekonomi", "Seni & Budaya").

Format JSON yang wajib dikembalikan (HANYA JSON murni tanpa pembungkus luar):
{
  "title": "Kuis Trivia Multidisiplin",
  "category": "Semua Kategori",
  "questions": [
    {
      "id": 1,
      "question": "Pertanyaan trivia unik dan berbobot...",
      "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      "correctIndex": 0,
      "explanation": "Penjelasan ilmiah atau sejarah singkat mengapa jawaban tersebut benar.",
      "category": "Sains"
    }
  ]
}`;

  try {
    const result = await callGroqLayers([
      {
        role: "system",
        content:
          "Anda adalah master kuis edukatif berbahasa Indonesia. Selalu respon dalam format JSON yang valid.",
      },
      { role: "user", content: prompt },
    ]);

    const cleanedText = cleanJsonText(result.text);
    const parsed = JSON.parse(cleanedText);
    if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      return {
        title: parsed.title || "Kuis Trivia Multidisiplin",
        category: parsed.category || "Semua Kategori",
        questions: parsed.questions,
        modelUsed: "Sistem Cerdas",
        layer: result.layer,
      };
    }
  } catch (err) {
    console.warn("Semua layer online tidak merespons, mengaktifkan safety net kuis lokal...");
  }

  // Resilient Local Quiz Safety Net
  return getLocalFallbackQuiz(category);
}

/**
 * Resilient Fallback Puzzles (Zero-failure safety net)
 */
function getLocalFallbackCrossword(category: string): AICrosswordResult {
  const presets: { [key: string]: AICrosswordResult } = {
    Technology: {
      title: "Teka-Teki Silang: Teknologi & Komputasi",
      category: "Technology",
      grid: { rows: 6, cols: 8 },
      words: [
        {
          number: 1,
          direction: "across",
          word: "KOMPUTER",
          clue: "Perangkat pemroses data dan kalkulasi astronomi kuno Antikythera.",
          startRow: 1,
          startCol: 0,
        },
        {
          number: 2,
          direction: "down",
          word: "PROTON",
          clue: "Partikel subatomik bermuatan positif yang berpotongan pada huruf P.",
          startRow: 1,
          startCol: 3,
        },
      ],
      modelUsed: "Sistem Cerdas",
      layer: 4,
    },
    Science: {
      title: "Teka-Teki Silang: Sains & Alam",
      category: "Science",
      grid: { rows: 6, cols: 8 },
      words: [
        {
          number: 1,
          direction: "across",
          word: "ATMOSFER",
          clue: "Lapisan gas bumi tempat molekul menyebarkan cahaya matahari.",
          startRow: 1,
          startCol: 0,
        },
        {
          number: 2,
          direction: "down",
          word: "SURYA",
          clue: "Sebutan lain untuk matahari, sumber cahaya dan energi utama.",
          startRow: 1,
          startCol: 4,
        },
      ],
      modelUsed: "Sistem Cerdas",
      layer: 4,
    },
  };

  return (
    presets[category] || {
      title: `Teka-Teki Silang: ${category}`,
      category: category,
      grid: { rows: 6, cols: 8 },
      words: [
        {
          number: 1,
          direction: "across",
          word: "MEMORI",
          clue: "Daya ingat kognitif yang menyimpan pengalaman masa lalu.",
          startRow: 1,
          startCol: 1,
        },
        {
          number: 2,
          direction: "down",
          word: "OTAK",
          clue: "Organ vital pengendali sistem saraf dan pikiran manusia.",
          startRow: 1,
          startCol: 3,
        },
      ],
      modelUsed: "Sistem Cerdas",
      layer: 4,
    }
  );
}

function getLocalFallbackQuiz(category: string = "Semua Kategori"): AIQuizResult {
  return {
    title: "Kuis Trivia Multidisiplin: Semua Kategori",
    category: "Semua Kategori",
    questions: [
      {
        id: 1,
        question: "Mengapa langit pada siang hari tampak berwarna biru?",
        options: [
          "Pantulan air laut",
          "Hamburan Rayleigh oleh partikel gas udara",
          "Emisi gas ozon",
          "Lapisan awan tipis",
        ],
        correctIndex: 1,
        explanation:
          "Molekul udara di atmosfer bumi lebih banyak menyebarkan cahaya biru yang memiliki panjang gelombang lebih pendek daripada warna lain (Hamburan Rayleigh).",
        category: "Sains",
      },
      {
        id: 2,
        question: "Perangkat apakah yang disebut sebagai komputer analog tertua dari abad ke-2 SM yang ditemukan di dasar laut Yunani?",
        options: [
          "Abakus Romawi",
          "Mekanisme Antikythera",
          "Jam Pasir Alexandria",
          "Astrolabe Babilonia",
        ],
        correctIndex: 1,
        explanation:
          "Mekanisme Antikythera memiliki lebih dari 30 roda gigi perunggu presisi yang mampu menghitung pergerakan kosmik ribuan tahun lalu.",
        category: "Teknologi",
      },
      {
        id: 3,
        question: "Fenomena tiba-tiba lupa tujuan saat melangkah ke ruangan baru dinamakan:",
        options: [
          "Doorway Effect",
          "Tunnel Vision",
          "Déjà Vu",
          "Placebo Reset",
        ],
        correctIndex: 0,
        explanation:
          "Doorway Effect terjadi karena pintu bertindak sebagai batas peristiwa (event boundary) yang membuat otak mengarsipkan memori ruangan sebelumnya.",
        category: "Psikologi",
      },
      {
        id: 4,
        question: "Berapa persen oksigen di atmosfer bumi yang dihasilkan oleh organisme laut (fitoplankton)?",
        options: ["Sekitar 10-20%", "Sekitar 30-40%", "Sekitar 50-80%", "Hampir 99%"],
        correctIndex: 2,
        explanation:
          "Mayoritas oksigen di planet kita (antara 50% hingga 80%) diproduksi oleh fitoplankton dan fotosintesis laut, bukan dari hutan daratan saja.",
        category: "Sains",
      },
      {
        id: 5,
        question: "Prinsip komputasi kuantum di mana data qubit dapat bernilai 0 dan 1 sekaligus disebut:",
        options: ["Quantum Superposition", "Binary Singularity", "Parallel Cache", "Entanglement Shift"],
        correctIndex: 0,
        explanation:
          "Superposisi kuantum memungkinkan qubit memproses sejumlah besar probabilitas secara simultan sebelum diobservasi.",
        category: "Teknologi",
      },
      {
        id: 6,
        question: "Peristiwa gelembung ekonomi pertama yang tercatat dalam sejarah dunia pada abad ke-17 di Belanda adalah:",
        options: ["South Sea Bubble", "Tulip Mania (Demam Tulip)", "Mississippi Scheme", "The Great Depreseed"],
        correctIndex: 1,
        explanation:
          "Tulip Mania (1637) terjadi ketika harga umbi tulip langka melambung hingga menyamai harga rumah mewah sebelum akhirnya jatuh drastis.",
        category: "Ekonomi",
      },
      {
        id: 7,
        question: "Teknik lukisan legendaris Leonardo da Vinci yang memadukan gradasi warna tanpa garis batas tegas dinamakan:",
        options: ["Chiaroscuro", "Sfumato", "Impasto", "Fresco"],
        correctIndex: 1,
        explanation:
          "Sfumato (berasal dari kata Italia 'berasap') menciptakan transisi lembut antara warna dan bayangan, seperti yang terlihat pada senyum Mona Lisa.",
        category: "Seni & Budaya",
      },
      {
        id: 8,
        question: "Pustaka kuno legendaris manakah di era Helenistik yang pernah menjadi pusat penyimpanan seluruh naskah ilmu pengetahuan dunia kuno?",
        options: ["Perpustakaan Alexandria", "Perpustakaan Ashurbanipal", "Perpustakaan Pergamon", "House of Wisdom Baghdad"],
        correctIndex: 0,
        explanation:
          "Perpustakaan Besar Alexandria di Mesir menampung ratusan ribu gulungan papirus papirus filsafat, matematika, dan sains kuno.",
        category: "Sejarah",
      },
    ],
    modelUsed: "Sistem Cerdas",
    layer: 4,
  };
}
