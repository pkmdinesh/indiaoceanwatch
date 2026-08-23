import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read status.json
let rawStatus = fs.readFileSync(path.join(rootDir, 'status.json'), 'utf8');
if (rawStatus.charCodeAt(0) === 0xFEFF) {
  rawStatus = rawStatus.slice(1);
}
const statusData = JSON.parse(rawStatus);

// 2. Load buildBulletinSummary and VOICE_LANGUAGES from js/voice-summary.js
const voiceSummaryCode = fs.readFileSync(path.join(rootDir, 'js', 'voice-summary.js'), 'utf8');
const sandbox = new Function('globalThis', voiceSummaryCode + '; return { buildBulletinSummary, VOICE_LANGUAGES };');
const { buildBulletinSummary, VOICE_LANGUAGES } = sandbox(globalThis);

const audioDir = path.join(rootDir, 'audio', 'bulletins');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Language code mapping for Google TTS endpoint
const TTS_LANG_MAP = {
  ta: 'ta',
  hi: 'hi',
  te: 'te',
  ml: 'ml',
  bn: 'bn',
  mr: 'mr',
  gu: 'gu',
  kn: 'kn',
  en: 'en',
  or: 'hi' // Odia fallback phonetic voice
};

function splitTextIntoChunks(text, maxLength = 180) {
  if (!text || text.length <= maxLength) return [text];

  const chunks = [];
  // Split on sentence terminators: . । ? ! ; or newline
  const sentences = text.split(/(?<=[.।?!;\n])\s+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
      currentChunk = (currentChunk + ' ' + sentence).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      // If single sentence itself is longer than maxLength, split on commas or spaces
      if (sentence.length > maxLength) {
        const subWords = sentence.split(' ');
        let subChunk = '';
        for (const w of subWords) {
          if ((subChunk + ' ' + w).trim().length <= maxLength) {
            subChunk = (subChunk + ' ' + w).trim();
          } else {
            if (subChunk) chunks.push(subChunk);
            subChunk = w;
          }
        }
        if (subChunk) chunks.push(subChunk);
        currentChunk = '';
      } else {
        currentChunk = sentence;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks.filter(c => c && c.trim().length > 0);
}

async function fetchGoogleTtsChunk(text, ttsLang) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${ttsLang}&client=tw-ob`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/'
    }
  });

  if (!response.ok) {
    throw new Error(`Google TTS request failed with status ${response.status} for lang ${ttsLang}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function generateAllBulletins() {
  console.log('Starting Google Text-to-Speech audio bulletin generation...');
  const manifest = {
    updated: new Date().toISOString(),
    bulletins: {}
  };

  for (const lang of VOICE_LANGUAGES) {
    const langPrefix = lang.voicePrefix;
    const ttsLang = TTS_LANG_MAP[langPrefix] || 'en';
    const bulletin = buildBulletinSummary(statusData, lang.code);
    const text = bulletin.text;

    console.log(`Generating [${lang.name}] (${langPrefix}) - text length: ${text.length} chars...`);
    const chunks = splitTextIntoChunks(text);
    const audioBuffers = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      try {
        const buf = await fetchGoogleTtsChunk(chunk, ttsLang);
        audioBuffers.push(buf);
        // Small delay to be polite to endpoint
        await new Promise(r => setTimeout(r, 200));
      } catch (err) {
        console.warn(`Warning: Chunk ${i + 1}/${chunks.length} failed for ${langPrefix}:`, err.message);
      }
    }

    if (audioBuffers.length > 0) {
      const combinedBuffer = Buffer.concat(audioBuffers);
      const fileName = `bulletin-${langPrefix}.mp3`;
      const filePath = path.join(audioDir, fileName);
      fs.writeFileSync(filePath, combinedBuffer);

      manifest.bulletins[langPrefix] = {
        file: `audio/bulletins/${fileName}`,
        size: combinedBuffer.length,
        title: bulletin.title,
        langCode: lang.code
      };
      console.log(`✓ Saved ${fileName} (${(combinedBuffer.length / 1024).toFixed(1)} KB)`);
    }
  }

  fs.writeFileSync(path.join(audioDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('✓ Audio bulletin generation complete! Manifest written to audio/bulletins/manifest.json');
}

generateAllBulletins().catch(err => {
  console.error('Fatal audio generation error:', err);
  process.exit(1);
});
