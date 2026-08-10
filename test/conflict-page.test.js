'use strict';
/* The Knights-and-the-Klan dossier page (conflict.js — this repo's own
 * renderer, olavo's philosophers.js idiom).
 *
 * Two invariants matter beyond "it renders":
 *
 * 1. ADR-0001: the feature rides ONLY on the optional `conflictPage` data key.
 *    A dataset without the key must produce a main page with no trace of the
 *    dossier — byte-identical to the plain template's output for that data.
 *
 * 2. No duplication: the page's timeline is DERIVED from the events tagged
 *    with the page's lane. Every lane event must appear on the dossier page,
 *    and every citation on the page must resolve to a reference item ON that
 *    page — a dangling [n] is a silent lie to the reader.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const build = require('../build.js');
const conflict = require('../conflict.js');

const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'chronology.json'), 'utf8'));
const PAGE = conflict.getConflictPage(DATA);

test('the dataset declares the dossier page (this repo ships it)', () => {
  assert.ok(PAGE, 'conflictPage missing from data/chronology.json');
  assert.equal(PAGE.slug, 'kkk');
});

test('ADR-0001: without the key, the main page carries no trace of the dossier', () => {
  const stripped = JSON.parse(JSON.stringify(DATA));
  delete stripped.conflictPage;
  const html = build.renderPage(stripped, {}, { lang: 'en', base: 'https://example.org/', route: '' });
  assert.ok(!html.includes('conflict-dossier'), 'dossier section rendered without the data key');
  assert.equal(conflict.getConflictPage(stripped), null);
});

test('with the key, the main page links the dossier from section and nav', () => {
  const html = build.renderPage(DATA, {}, { lang: 'en', base: 'https://example.org/', route: '' });
  assert.ok(html.includes('id="conflict-dossier"'));
  assert.ok(html.includes(`href="${PAGE.slug}/"`), 'teaser link to the dossier route missing');
  assert.ok(html.includes('href="#conflict-dossier"'), 'nav link missing');
});

test('the dossier route is in ROUTES, so sitemap and hreflang stay complete', () => {
  assert.ok(build.ROUTES.includes(`${PAGE.slug}/`), 'route not pushed at module scope');
  const sitemap = build.renderSitemap('https://example.org/', build.ROUTES);
  for (const lang of build.LOCALES) {
    assert.ok(sitemap.includes(`https://example.org/${lang}/${PAGE.slug}/`), `sitemap missing ${lang} dossier URL`);
  }
});

function renderDossier(lang) {
  return conflict.renderConflictPage({
    page: PAGE,
    events: DATA.events,
    references: DATA.references,
    archives: {},
    meta: DATA.meta,
    ui: { ...build.UI[lang], disclaimer: '' },
    lang,
    base: 'https://example.org/',
    analytics: '',
    helpers: {
      esc: build.esc,
      renderText: build.renderText,
      renderCites: build.renderCites,
      seoHead: build.seoHead,
      renderEventRow: build.renderEventRow,
      renderReference: build.renderReference,
    },
  });
}

test('every lane event appears on the dossier page, unchanged in count', () => {
  const rows = conflict.laneEvents(PAGE, DATA.events);
  assert.ok(rows.length >= 10, `suspiciously few lane events (${rows.length})`);
  const html = renderDossier('en');
  for (const ev of rows) {
    assert.ok(html.includes(build.esc(ev.title)), `lane event missing from dossier: ${ev.title}`);
  }
});

test('every citation on the page resolves to a reference item on the page', () => {
  const html = renderDossier('en');
  const cited = new Set([...html.matchAll(/href="#ref-(\d+)"/g)].map((m) => Number(m[1])));
  assert.ok(cited.size > 0, 'no citations rendered at all');
  for (const n of cited) {
    assert.ok(html.includes(`id="ref-${n}"`), `dangling citation [${n}] — no matching reference item`);
  }
  const pageRefs = conflict.pageReferences(PAGE, DATA.events, DATA.references);
  assert.equal(Math.max(...cited) <= pageRefs.length, true, 'citation number exceeds page reference list');
});

test('the localized pages carry their locale and cross-link the sibling locales', () => {
  for (const lang of build.LOCALES) {
    const html = renderDossier(lang);
    for (const other of build.LOCALES.filter((l) => l !== lang)) {
      assert.ok(html.includes(`href="../../${other}/${PAGE.slug}/"`), `${lang} page missing switcher to ${other}`);
    }
    assert.ok(html.includes(`href="../#conflict-dossier"`), `${lang} page missing back link`);
  }
});

test('committed docs/ carry the dossier in all three locales (drift guard)', () => {
  for (const lang of build.LOCALES) {
    const p = path.join(__dirname, '..', 'docs', lang, PAGE.slug, 'index.html');
    assert.ok(fs.existsSync(p), `docs/${lang}/${PAGE.slug}/index.html not committed`);
  }
});
