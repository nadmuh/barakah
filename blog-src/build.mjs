// Generates the static blog: blog/index.html, blog/<slug>/index.html, blog/feed.xml, sitemap.xml, robots.txt.
// No dependencies. Run from the site root:  node blog-src/build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from './articles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://barakahtrading.co';
const GA_ID = 'G-D0GBQRS0CN';

const INDEX_TITLE = 'Barakah Blogs | Prop Firm Trading Guides & Discipline';
const INDEX_DESC = 'Prop firm trading guides, trailing drawdown explainers and trading discipline tips from Barakah. Learn to protect your funded account.';

// ── helpers ──────────────────────────────────────────────────────────────
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fmtDate = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const jsonLd = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

function inline(text) {
  let t = esc(text);
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const external = /^https?:\/\//.test(href);
    return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return t;
}

function renderBody(src) {
  const lines = src.trim().split('\n');
  const out = [];
  const headings = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^## (.+)/))) {
      const id = slugify(m[1].replace(/[*]/g, ''));
      headings.push({ id, text: m[1].replace(/[*]/g, '') });
      out.push(`<h2 id="${id}">${inline(m[1])}</h2>`); i++;
    } else if ((m = line.match(/^### (.+)/))) {
      out.push(`<h3>${inline(m[1])}</h3>`); i++;
    } else if ((m = line.match(/^> (KEY|NOTE|TIP): (.+)/))) {
      const kind = m[1].toLowerCase();
      const label = { key: 'Key takeaway', note: 'Note', tip: 'Tip' }[kind];
      out.push(`<aside class="callout callout-${kind}"><span class="label">${label}</span>${inline(m[2])}</aside>`); i++;
    } else if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i++; }
      const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      out.push(`<div class="table-wrap"><table><thead><tr>${head.map(c => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr${r.some(c => c.includes('**Barakah')) ? ' class="hl"' : ''}>${r.map((c, ci) => ci === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
    } else if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) { items.push(lines[i].slice(2)); i++; }
      out.push(`<ul>${items.map(x => `<li>${inline(x)}</li>`).join('')}</ul>`);
    } else if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, '')); i++; }
      out.push(`<ol>${items.map(x => `<li>${inline(x)}</li>`).join('')}</ol>`);
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() && !/^(## |### |> |\||- |\d+\. )/.test(lines[i])) { para.push(lines[i]); i++; }
      out.push(`<p>${inline(para.join(' '))}</p>`);
    }
  }
  return { html: out.join('\n'), headings };
}

const plain = md => md.replace(/[*#>|\[\]()]/g, ' ').replace(/\s+/g, ' ');
const wordCount = a => plain(a.body).split(' ').filter(Boolean).length;
const readMins = a => Math.max(1, Math.round(wordCount(a) / 200));
const urlOf = a => `${SITE}/blog/${a.slug}/`;
const imgUrl = a => `${SITE}/blog/images/${a.image}`;

for (const a of articles) {
  if (a.metaTitle.length > 60) throw new Error(`metaTitle >60 (${a.metaTitle.length}): ${a.slug}`);
  if (a.description.length > 155) throw new Error(`description >155 (${a.description.length}): ${a.slug}`);
}
if (INDEX_TITLE.length > 60 || INDEX_DESC.length > 155) throw new Error('index meta too long');

// ── shared chrome ────────────────────────────────────────────────────────
const logoSvg = (size, id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 62" fill="none" width="${size}" height="${size}" style="flex-shrink:0" aria-hidden="true">
      <defs><mask id="${id}"><circle cx="31" cy="31" r="23" fill="white"/><circle cx="40" cy="25" r="19" fill="black"/></mask></defs>
      <circle cx="31" cy="31" r="23" fill="#C9A84C" mask="url(#${id})"/>
      <polyline points="8,52 14,44 20,48 28,34 34,38 46,20" stroke="#EAE8F0" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <polygon points="52,11 51,23 41,17" fill="#EAE8F0"/>
    </svg>`;

const head = ({ title, description, canonical, image, imageAlt, type, extra = '' }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}"/>
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"/>
  <meta name="theme-color" content="#0B0E14"/>
  <link rel="canonical" href="${canonical}"/>
  <link rel="alternate" type="application/rss+xml" title="Barakah Blogs" href="${SITE}/blog/feed.xml"/>
  <link rel="icon" type="image/png" id="favicon" href="/favicon-dark.png"/>
  <meta property="og:site_name" content="Barakah Trading"/>
  <meta property="og:locale" content="en_US"/>
  <meta property="og:type" content="${type}"/>
  <meta property="og:title" content="${esc(title)}"/>
  <meta property="og:description" content="${esc(description)}"/>
  <meta property="og:url" content="${canonical}"/>
  <meta property="og:image" content="${image}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content="${esc(imageAlt)}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${esc(title)}"/>
  <meta name="twitter:description" content="${esc(description)}"/>
  <meta name="twitter:image" content="${image}"/>
  <meta name="twitter:image:alt" content="${esc(imageAlt)}"/>
${extra}
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Outfit:wght@200;300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/blog/blog.css"/>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  </script>
</head>`;

const nav = () => `<body>
<a class="skip" href="#main" style="position:absolute;left:-9999px">Skip to content</a>
<div class="scroll-progress" id="scrollProgress"></div>
<div class="ambient-layer" aria-hidden="true"><div class="orb orb-1"></div><div class="orb orb-2"></div></div>

<nav id="nav" aria-label="Primary">
  <a href="/" class="logo" aria-label="Barakah home">
    ${logoSvg(34, 'cm')}
    <span class="logo-wordmark">Barakah</span>
  </a>
  <div class="nav-links">
    <a href="/#features">Features</a>
    <a href="/#how">How It Works</a>
    <a href="/#pricing">Pricing</a>
    <a href="/blog/" class="active" aria-current="page">Blogs</a>
    <a href="/#waitlist" class="nav-cta">Join Waitlist</a>
  </div>
  <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="mobileMenu">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <a href="/#features">Features</a>
  <a href="/#how">How It Works</a>
  <a href="/#pricing">Pricing</a>
  <a href="/blog/" class="active">Blogs</a>
  <a href="/#waitlist" class="m-cta">Join Waitlist</a>
</div>`;

const footer = () => `<footer>
  <a href="/" class="logo" aria-label="Barakah home">
    ${logoSvg(28, 'cmf')}
    <span class="logo-wordmark">Barakah</span>
  </a>
  <p>© 2026 Barakah Trading LLC. All rights reserved.</p>
  <div class="footer-links">
    <a href="/blog/">Blogs</a>
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="/contact.html">Contact</a>
  </div>
</footer>
<script src="/blog/blog.js" defer></script>
</body>
</html>
`;

const crumbs = items => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map((c, i) => i === items.length - 1 ? `<li><span aria-current="page">${esc(c[0])}</span></li>` : `<li><a href="${c[1]}">${esc(c[0])}</a></li>`).join('')}</ol></nav>`;
const crumbLd = items => jsonLd({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: c[1].startsWith('http') ? c[1] : SITE + c[1] })) });

const card = a => `<article class="post-card">
  <a class="thumb" href="/blog/${a.slug}/" tabindex="-1" aria-hidden="true"><img src="/blog/images/${a.image}" alt="" width="1200" height="630" loading="lazy" decoding="async"/></a>
  <div class="body">
    <div class="post-meta"><span class="cat">${esc(a.category)}</span><span class="dot"></span><time datetime="${a.published}">${fmtDate(a.published)}</time><span class="dot"></span><span>${readMins(a)} min read</span></div>
    <h2><a href="/blog/${a.slug}/">${esc(a.title)}</a></h2>
    <p>${esc(a.description)}</p>
    <span class="read-more">Read article <span aria-hidden="true">→</span></span>
  </div>
</article>`;

const ctaBox = (h, p) => `<section class="cta-box" aria-labelledby="cta-h">
  <h2 id="cta-h">${h}</h2>
  <p>${p}</p>
  <a class="btn-gold" href="/#waitlist">Join the Waitlist</a>
  <p class="disclaimer">Educational content only. Barakah Trading does not execute trades or provide financial advice. Trading involves risk of loss.</p>
</section>`;

// ── blog index ───────────────────────────────────────────────────────────
function buildIndex() {
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  const canonical = `${SITE}/blog/`;
  const ld = [
    jsonLd({ '@context': 'https://schema.org', '@type': 'Blog', '@id': canonical, name: 'Barakah Blogs', description: INDEX_DESC, url: canonical, inLanguage: 'en-US', publisher: { '@type': 'Organization', name: 'Barakah Trading', url: SITE + '/', logo: { '@type': 'ImageObject', url: `${SITE}/blog/images/barakah-logo.png` } }, blogPost: sorted.map(a => ({ '@type': 'BlogPosting', headline: a.title, url: urlOf(a), datePublished: a.published, image: imgUrl(a), description: a.description })) }),
    jsonLd({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: sorted.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: urlOf(a), name: a.title })) }),
    crumbLd([['Home', '/'], ['Blogs', '/blog/']]),
  ].join('\n  ');
  const html = head({ title: INDEX_TITLE, description: INDEX_DESC, canonical, image: `${SITE}/blog/images/blog-og.png`, imageAlt: 'Barakah Blogs: prop firm guides and trading discipline', type: 'website', extra: '  ' + ld }) + '\n' + nav() + `

<main id="main">
  <div class="wrap">
    ${crumbs([['Home', '/'], ['Blogs', '/blog/']])}
    <header class="blog-hero">
      <span class="eyebrow">The Barakah Blog</span>
      <h1>Barakah <em>Blogs</em></h1>
      <p>Prop firm guides, drawdown explainers and trading discipline playbooks, written trader-to-trader to help you protect your funded account.</p>
    </header>
    <div class="post-grid">
${sorted.map(card).join('\n')}
    </div>
    ${ctaBox('Trade smarter. <span>Learn faster.</span>', 'Join the waitlist for early access and founding-member pricing before public launch.')}
    <div style="height:5rem"></div>
  </div>
</main>

` + footer();
  mkdirSync(join(ROOT, 'blog'), { recursive: true });
  writeFileSync(join(ROOT, 'blog', 'index.html'), html);
}

// ── article pages ────────────────────────────────────────────────────────
function buildArticle(a) {
  const { html: bodyHtml, headings } = renderBody(a.body);
  const canonical = urlOf(a);
  const toc = [...headings, { id: 'faq', text: 'Frequently Asked Questions' }];
  const rel = a.related.map(s => articles.find(x => x.slug === s));
  const ld = [
    jsonLd({ '@context': 'https://schema.org', '@type': 'BlogPosting', mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }, headline: a.title, description: a.description, image: [imgUrl(a)], datePublished: a.published, dateModified: a.published, author: { '@type': 'Organization', name: 'Barakah Trading', url: SITE + '/' }, publisher: { '@type': 'Organization', name: 'Barakah Trading', url: SITE + '/', logo: { '@type': 'ImageObject', url: `${SITE}/blog/images/barakah-logo.png` } }, articleSection: a.category, keywords: a.keyword, wordCount: wordCount(a), inLanguage: 'en-US' }),
    jsonLd({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: a.faq.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })) }),
    crumbLd([['Home', '/'], ['Blogs', '/blog/'], [a.title, `/blog/${a.slug}/`]]),
  ].join('\n  ');
  const extra = `  <meta property="article:published_time" content="${a.published}"/>
  <meta property="article:modified_time" content="${a.published}"/>
  <meta property="article:section" content="${esc(a.category)}"/>
  <meta name="keywords" content="${esc(a.keyword)}"/>
  ${ld}`;
  const html = head({ title: a.metaTitle, description: a.description, canonical, image: imgUrl(a), imageAlt: a.imageAlt, type: 'article', extra }) + '\n' + nav() + `

<main id="main">
  <article>
    <div class="wrap-narrow">
      ${crumbs([['Home', '/'], ['Blogs', '/blog/'], [a.title, `/blog/${a.slug}/`]])}
      <header class="article-head">
        <span class="eyebrow">${esc(a.category)}</span>
        <h1>${esc(a.title)}</h1>
        <p class="lede">${esc(a.lede)}</p>
        <div class="byline">
          <span>By <strong>Barakah Trading</strong></span>
          <span>Published <time datetime="${a.published}"><strong>${fmtDate(a.published)}</strong></time></span>
          <span><strong>${readMins(a)} min</strong> read</span>
        </div>
      </header>
      <figure class="hero-img">
        <img src="/blog/images/${a.image}" alt="${esc(a.imageAlt)}" width="1200" height="630" fetchpriority="high" decoding="async"/>
      </figure>
      <nav class="toc" aria-label="In this article">
        <h2>In this article</h2>
        <ol>${toc.map(h => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('')}</ol>
      </nav>
      <div class="prose">
${bodyHtml}
        <h2 id="faq">Frequently Asked Questions</h2>
        <div class="faq">
${a.faq.map(([q, ans]) => `          <div class="faq-item"><h3>${esc(q)}</h3><p>${inline(ans)}</p></div>`).join('\n')}
        </div>
      </div>
      ${ctaBox('Ready to see <span>why</span>, not just what?', 'Barakah\'s Behavioral Discipline Engine is built for traders working through funded-account evaluations. Join the waitlist for <strong>founding-member pricing</strong> before public launch.')}
      <aside class="sources" aria-labelledby="sources-h">
        <h2 id="sources-h">Sources &amp; further reading</h2>
        <ul>
${a.sources.map(([name, url, note]) => `          <li><a href="${url}" target="_blank" rel="noopener noreferrer">${esc(name)}</a> <span class="note">— ${esc(note)}</span></li>`).join('\n')}
        </ul>
        <p class="disclaimer">Rules, thresholds and account sizes at prop firms change periodically. Always confirm current terms on the firm's official pages. Published ${fmtDate(a.published)}.</p>
      </aside>
    </div>
  </article>
  <section class="related" aria-labelledby="related-h">
    <div class="wrap">
      <h2 id="related-h">Keep reading</h2>
      <div class="post-grid">
${rel.map(card).join('\n')}
      </div>
    </div>
  </section>
</main>

` + footer();
  mkdirSync(join(ROOT, 'blog', a.slug), { recursive: true });
  writeFileSync(join(ROOT, 'blog', a.slug, 'index.html'), html);
}

// ── sitemap, robots, feed ────────────────────────────────────────────────
function buildMeta() {
  const latest = articles.map(a => a.published).sort().pop();
  const urls = [
    [`${SITE}/`, null, '1.0'],
    [`${SITE}/blog/`, latest, '0.9'],
    ...articles.map(a => [urlOf(a), a.published, '0.8']),
    [`${SITE}/contact.html`, null, '0.3'],
  ];
  writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([loc, mod, pr]) => `  <url><loc>${loc}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}<priority>${pr}</priority></url>`).join('\n')}
</urlset>
`);
  writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  writeFileSync(join(ROOT, 'blog', 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Barakah Blogs</title>
  <link>${SITE}/blog/</link>
  <description>${esc(INDEX_DESC)}</description>
  <language>en-us</language>
  <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${sorted.map(a => `  <item><title>${esc(a.title)}</title><link>${urlOf(a)}</link><guid isPermaLink="true">${urlOf(a)}</guid><pubDate>${new Date(a.published + 'T12:00:00Z').toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`).join('\n')}
</channel>
</rss>
`);
}

buildIndex();
articles.forEach(buildArticle);
buildMeta();
console.log(`Built ${articles.length} articles + index, sitemap.xml, robots.txt, feed.xml`);
