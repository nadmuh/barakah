// Generates the 1200x630 article header / social-share images in blog/images/.
// Each category has its own colour and artwork; articles in a category share the look, the title changes.
//
// Needs the `sharp` package, which this site doesn't otherwise use:
//   npm i --no-save sharp && node blog-src/make-images.mjs
// (or point SHARP_PATH at an existing install: SHARP_PATH=/path/to/node_modules/sharp node blog-src/make-images.mjs)
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from './articles.mjs';

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH || 'sharp');
const IMG = join(dirname(fileURLToPath(import.meta.url)), '..', 'blog', 'images');

const GOLD = '#C9A84C', GOLD_LIGHT = '#E8CC7A', CYAN = '#00D4FF', GREEN = '#00E5A0', TEXT = '#EAE8F0';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONT = 'Arial, Helvetica, sans-serif';

// Artwork lives in the right-hand ~400px; titles wrap to <= ~640px so nothing collides.
const THEMES = {
  'Trade Journals': {
    accent: GOLD, label: 'TRADE JOURNALS',
    art: () => {
      const rows = [0, 1, 2, 3, 4].map(i => {
        const y = 190 + i * 64, bar = [150, 170, 120, 150, 120][i], win = [1, 0, 1, 1, 0][i];
        return `<circle cx="826" cy="${y}" r="9" fill="${win ? GOLD : 'none'}" stroke="${GOLD}" stroke-width="2.5"/>
<rect x="852" y="${y - 6}" width="${bar}" height="12" rx="6" fill="#fff" fill-opacity=".2"/>
<rect x="1056" y="${y - 6}" width="64" height="12" rx="6" fill="${win ? GOLD : '#fff'}" fill-opacity="${win ? .85 : .25}"/>`;
      }).join('\n');
      const rings = [0, 1, 2, 3, 4, 5].map(i => `<circle cx="790" cy="${150 + i * 62}" r="9" fill="#0B0E14" stroke="${GOLD}" stroke-opacity=".7" stroke-width="3"/>`).join('');
      return `<rect x="790" y="112" width="360" height="400" rx="20" fill="#fff" fill-opacity=".045" stroke="${GOLD}" stroke-opacity=".55" stroke-width="2"/>
<rect x="822" y="132" width="110" height="14" rx="7" fill="${GOLD}" fill-opacity=".9"/>
${rows}${rings}
<g transform="translate(1010 430)" stroke="${GOLD_LIGHT}" stroke-width="3" stroke-linecap="round">
  <line x1="0" y1="-40" x2="0" y2="40"/><rect x="-10" y="-18" width="20" height="40" rx="3" fill="${GOLD}"/>
  <line x1="44" y1="-26" x2="44" y2="52"/><rect x="34" y="-4" width="20" height="38" rx="3" fill="#0B0E14"/>
  <line x1="88" y1="-52" x2="88" y2="20"/><rect x="78" y="-38" width="20" height="40" rx="3" fill="${GOLD}"/>
</g>`;
    },
  },
  'Prop Firm Guides': {
    accent: CYAN, label: 'PROP FIRM GUIDES',
    art: () => `<g stroke="#fff" stroke-opacity=".07">${[0, 1, 2, 3, 4].map(i => `<line x1="780" y1="${150 + i * 90}" x2="1160" y2="${150 + i * 90}"/>`).join('')}</g>
<polygon points="790,470 850,430 900,455 960,380 1010,400 1070,310 1120,330 1150,250 1150,360 1120,360 1120,440 1010,440 1010,490 900,490 900,520 790,520" fill="${CYAN}" fill-opacity=".1"/>
<polyline points="790,520 900,520 900,490 1010,490 1010,440 1120,440 1120,360 1150,360" fill="none" stroke="${CYAN}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
<polyline points="790,470 850,430 900,455 960,380 1010,400 1070,310 1120,330 1150,250" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
<g fill="#0B0E14" stroke="${CYAN}" stroke-width="3.5"><circle cx="900" cy="505" r="8"/><circle cx="1010" cy="465" r="8"/><circle cx="1120" cy="400" r="8"/></g>
<circle cx="1150" cy="250" r="9" fill="#fff"/>
<g stroke="${CYAN}" stroke-width="2.5" stroke-linecap="round" fill="none"><line x1="1070" y1="318" x2="1070" y2="410" stroke-dasharray="3 9"/><path d="M1062 402l8 10 8-10"/></g>`,
  },
  'Trading Discipline': {
    accent: GREEN, label: 'TRADING DISCIPLINE',
    art: () => `<g fill="none" stroke="${GREEN}"><circle cx="960" cy="312" r="150" stroke-opacity=".28" stroke-width="2"/><circle cx="960" cy="312" r="205" stroke-opacity=".16" stroke-width="2"/><circle cx="960" cy="312" r="260" stroke-opacity=".08" stroke-width="2"/></g>
<g transform="translate(960 312) scale(15) translate(-12 -12)">
  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" fill="${GREEN}" fill-opacity=".14" stroke="${GREEN}" stroke-width=".42" stroke-linejoin="round"/>
  <path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<polyline points="790,540 860,540 885,510 910,570 935,525 955,540 1160,540" fill="none" stroke="${GREEN}" stroke-opacity=".7" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`,
  },
};

// Wrap a title into <= 3 lines of at most ~19 characters (Arial Bold 62px stays under ~640px).
function wrap(title, max = 19) {
  const words = title.split(' '), lines = [''];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if ((cur + ' ' + w).trim().length <= max || !cur) lines[lines.length - 1] = (cur + ' ' + w).trim();
    else lines.push(w);
  }
  return lines;
}

const svg = (theme, lines) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B0E14"/><stop offset="1" stop-color="#171C28"/></linearGradient>
  <radialGradient id="g1" cx="0.12" cy="0.08" r="0.75"><stop offset="0" stop-color="${theme.accent}" stop-opacity="0.22"/><stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/></radialGradient>
  <radialGradient id="g2" cx="0.85" cy="0.55" r="0.5"><stop offset="0" stop-color="${theme.accent}" stop-opacity="0.12"/><stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#g1)"/><rect width="1200" height="630" fill="url(#g2)"/>
<g stroke="#fff" stroke-opacity="0.035">${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join('')}${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join('')}</g>
<rect x="0" y="0" width="10" height="630" fill="${theme.accent}"/>
${theme.art()}
<text x="150" y="104" font-family="${FONT}" font-size="30" font-weight="700" letter-spacing="8" fill="${GOLD}">BARAKAH</text>
<rect x="80" y="232" width="8" height="30" rx="4" fill="${theme.accent}"/>
<text x="104" y="257" font-family="${FONT}" font-size="24" font-weight="700" letter-spacing="5" fill="${theme.accent}">${esc(theme.label)}</text>
${lines.map((l, i) => `<text x="80" y="${340 + i * 76}" font-family="${FONT}" font-size="62" font-weight="700" fill="${TEXT}">${esc(l)}</text>`).join('\n')}
</svg>`;

const indexArt = {
  accent: GOLD, label: 'THE BARAKAH BLOG',
  art: () => `<g fill="none" stroke="${GOLD}"><circle cx="960" cy="312" r="150" stroke-opacity=".3" stroke-width="2"/><circle cx="960" cy="312" r="210" stroke-opacity=".16" stroke-width="2"/></g>
<g font-family="${FONT}" font-size="16" font-weight="700" letter-spacing="2">
  <rect x="770" y="508" width="132" height="34" rx="17" fill="${GOLD}" fill-opacity=".14" stroke="${GOLD}"/><text x="836" y="530" text-anchor="middle" fill="${GOLD}">JOURNALS</text>
  <rect x="912" y="508" width="112" height="34" rx="17" fill="${CYAN}" fill-opacity=".14" stroke="${CYAN}"/><text x="968" y="530" text-anchor="middle" fill="${CYAN}">GUIDES</text>
  <rect x="1034" y="508" width="144" height="34" rx="17" fill="${GREEN}" fill-opacity=".14" stroke="${GREEN}"/><text x="1106" y="530" text-anchor="middle" fill="${GREEN}">DISCIPLINE</text>
</g>`,
};

const logo = await sharp(join(IMG, 'barakah-logo.png')).resize(84, 84).png().toBuffer();
const bigLogo = await sharp(join(IMG, 'barakah-logo.png')).resize(240, 240).png().toBuffer();
const out = f => join(IMG, f);
const png = s => sharp(Buffer.from(s));

for (const a of articles) {
  const theme = THEMES[a.category];
  if (!theme) throw new Error(`No image theme for category "${a.category}" (add one to THEMES)`);
  await png(svg(theme, wrap(a.title.replace(/(: | — ).*$/, '')))).composite([{ input: logo, left: 52, top: 52 }])
    .png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out(a.image));
}
await png(svg(indexArt, ['Prop Firm Guides', '& Trading', 'Discipline'])).composite([{ input: logo, left: 52, top: 52 }, { input: bigLogo, left: 840, top: 192 }])
  .png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out('blog-og.png'));
console.log(`Wrote ${articles.length} article images + blog-og.png`);
