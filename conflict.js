/*
 * conflict.js — the "Knights and the Klan" dossier page (this repo's own renderer).
 *
 * This project's declared second focus is the documented conflict between the
 * Order and organized anti-Catholicism in the United States. The chronology
 * table carries the events; this module renders the SEPARATED PART — one
 * narrative page per locale (/{lang}/<slug>/) that tells the story in
 * sections, then derives its timeline from the main dataset by filtering the
 * events tagged with the conflict lane. Nothing is duplicated: the page cites
 * the same references[] and reuses the same event rows.
 *
 * Contract (mirrors core ADR-0001, and olavo's philosophers.js idiom): the
 * feature exists only when data/chronology.json carries the optional
 * `conflictPage` key — without it the build is byte-identical to the plain
 * template. The page asserts the same posture as the dataset: the bogus oath
 * is documented as a fabrication from the acts; characterizations are
 * attributed; the Order's self-crediting claims are recorded as its own.
 */
'use strict';

/**
 * Accessor for the optional top-level `conflictPage` key (ADR-0001 idiom:
 * absent key = byte-identical build). Callers never poke the shape directly.
 */
function getConflictPage(data) {
  return (data && data.conflictPage && Array.isArray(data.conflictPage.sections))
    ? data.conflictPage
    : null;
}

/** Routes this page adds (module-scope in build.js, so the sitemap test sees them). */
function conflictRoutes(page) {
  return [`${page.slug}/`];
}

/** Events belonging to the page's lane, in dataset order. */
function laneEvents(page, events) {
  return (events || []).filter((e) => Array.isArray(e.threads) && e.threads.includes(page.lane));
}

/**
 * Local citation numbering: only the references this page actually uses
 * (intro + sections + every lane event), in the shared file order — the same
 * choice philosophers.js made, so a reader never sees numbering gaps.
 */
function pageReferences(page, events, references) {
  const used = new Set(page.sources || []);
  for (const s of page.sections || []) for (const id of s.sources || []) used.add(id);
  for (const ev of laneEvents(page, events)) for (const id of ev.sources || []) used.add(id);
  return references.filter((r) => used.has(r.id));
}

/** Main-page teaser section linking the dossier. */
function renderConflictIndexSection(page, ui, helpers) {
  const { esc } = helpers;
  if (!page) return '';
  return `    <section id="conflict-dossier">
      <h2>${esc(page.title)}</h2>
      <p>${esc(page.summary)}</p>
      <p><a class="cta" href="${esc(page.slug)}/">${esc(ui.cdRead)}</a></p>
    </section>
`;
}

/** Full HTML for the dossier page. Helpers come from build.js (never re-implemented). */
function renderConflictPage(opts) {
  const { page, events, references, archives, meta, ui, lang, base, analytics, helpers } = opts;
  const { esc, renderText, renderCites, seoHead, renderEventRow, renderReference } = helpers;

  const route = `${page.slug}/`;
  const rows = laneEvents(page, events);
  const pageRefs = pageReferences(page, events, references);
  const refNum = new Map(pageRefs.map((r, i) => [r.id, i + 1]));

  const pageMeta = {
    ...meta,
    title: `${page.title} — ${meta.title}`,
    description: page.intro,
  };

  // The language switcher is written here rather than borrowed: the shared
  // one targets sibling-locale pages one level up, and this page lives one
  // directory deeper (/{lang}/{slug}/).
  const switcher = `<nav class="lang-switch" aria-label="${esc(ui.language)}">${
    ['en', 'es', 'pt'].map((l) => (l === lang
      ? `<span class="lang-current">${l.toUpperCase()}</span>`
      : `<a href="../../${l}/${esc(page.slug)}/" hreflang="${l}">${l.toUpperCase()}</a>`)).join('')
  }</nav>`;

  const sectionsHtml = (page.sections || []).map((s) => `    <section id="${esc(s.id)}">
      <h2>${esc(s.heading)}</h2>
${(s.paragraphs || []).map((p) => `      <p>${renderText(p)}</p>`).join('\n')}
${s.sources && s.sources.length ? `      <p class="section-cites">${renderCites(s.sources, refNum)}</p>\n` : ''}    </section>`).join('\n');

  const navSections = (page.sections || [])
    .map((s) => `      <a href="#${esc(s.id)}">${esc(s.heading)}</a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="${esc(meta.language || 'en')}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(pageMeta.title)}</title>
  <meta name="description" content="${esc(page.summary || '')}">
${analytics || ''}
  <link rel="stylesheet" href="../../styles.css">
${seoHead(pageMeta, base, route, lang)}
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      ${switcher}
      <h1>${esc(page.title)}</h1>
      <p class="subtitle">${esc(page.subtitle)}</p>
      <p class="lead">${renderText(page.intro)}${renderCites(page.sources, refNum)}</p>
      <p class="updated"><a href="../#conflict-dossier">${esc(ui.cdBack)}</a></p>
    </div>
  </header>${ui.disclaimer ? `\n  <div class="i18n-disclaimer" role="note">🌐 ${esc(ui.disclaimer)}</div>` : ''}

  <nav class="site-nav">
    <div class="wrap">
${navSections}
      <a href="#conflict-timeline">${esc(ui.cdTimelineHeading)}</a>
      <a href="#references">${esc(ui.references)}</a>
    </div>
  </nav>

  <main class="wrap">
${sectionsHtml}
    <section id="conflict-timeline">
      <h2>${esc(ui.cdTimelineHeading)}</h2>
      <p class="section-intro">${esc(page.note)}</p>
      <div class="table-scroll">
      <table class="meetings">
        <thead><tr><th>${esc(ui.thYear)}</th><th>${esc(ui.thDate)}</th><th>${esc(ui.thPlace)}</th><th>${esc(ui.thEvent)}</th></tr></thead>
        <tbody>
${rows.map((ev) => renderEventRow(ev, refNum, ui)).join('\n')}
        </tbody>
      </table>
      </div>
    </section>
    <section id="references">
      <h2>${esc(ui.referencesHeading)}</h2>
      <ol class="references">
${pageRefs.map((r, i) => renderReference(r, i + 1, archives, ui)).join('\n')}
      </ol>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <p>${ui.footer}</p>
    </div>
  </footer>
</body>
</html>
`;
}

module.exports = {
  getConflictPage, conflictRoutes, laneEvents, pageReferences,
  renderConflictIndexSection, renderConflictPage,
};
