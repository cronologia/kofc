# Context — cronologia/kofc

## What this repo is

A source-referenced chronology of the **Knights of Columbus** (KofC), the
Catholic fraternal benefit society founded at St. Mary's Church, New Haven,
Connecticut (first meeting 2 October 1881; Connecticut charter 29 March 1882)
by Fr. — now Blessed — Michael J. McGivney. One of the Cronologia family of
projects; it follows the shared sourcing discipline in
`.claude/skills/sourcing-rules/SKILL.md`.

The project has a declared second focus alongside the institutional history:
**the conflict between the Order and organized anti-Catholicism in the United
States** — the fabricated "bogus oath" of 1912 and its judicial and
congressional debunking, the second Ku Klux Klan's campaigns of the 1920s,
the Oregon School Law fight ending in *Pierce v. Society of Sisters* (1925),
and the oath's later resurfacings (1928, 1960, and modern echoes). This
thread has its own swimlane (`anti-catholic-conflict`) so it is visible as a
storyline, not scattered.

## Domain background an agent needs

- **A fraternal benefit society** is a mutual-aid insurance organization with
  a lodge structure. The KofC's ceremonial "degrees" (three at founding, a
  fourth — "patriotic" — from 1900) are initiation ceremonies, not ranks of
  secrecy. The Fourth Degree is the one the fabricated oath claimed to expose.
- **The "bogus oath"**: a text pledging extermination of heretics, circulated
  from the 1912 Butler–Bonniwell congressional contest (PA 7th district)
  onward, attributed to the Fourth Degree. The House Committee on Elections
  No. 1 reproduced it as an exhibit and branded it "spurious" (Congressional
  Record, 15 Feb 1913, vol. 49 pt. 4 — the report later distributors cited as
  if it endorsed the text). Criminal-libel convictions followed in
  Philadelphia (1914), Waterville MN (1914) and Oklahoma (*Crane v. State*,
  1917); a Newfoundland trial (Feb 1913) produced an admission and apology.
  The Order's 1914 pamphlet *Knights of Columbus vs. Criminal Libel and
  Malicious Bigotry* reprints the records — partisan but documentary; always
  attribute what rests on it alone.
- **The second Klan** (refounded 1915) was anti-Catholic as well as
  white-supremacist (Jenkins, *Western Pennsylvania Historical Magazine*).
  Its Indianapolis weekly *The Fiery Cross* (digitized, Hoosier State
  Chronicles) kept the oath in circulation. Klan-source material is cited as
  evidence of Klan messaging, never for its claims.
- **Precision about who fought whom.** Carnegie, PA (25 Aug 1923) was town
  residents, largely Irish Catholics; South Bend (May 1924) was Notre Dame
  students. Neither was the Knights of Columbus as an organization, and the
  dataset says so in the event text. Do not let "Catholics vs. Klan" collapse
  into "KofC vs. Klan".
- **The Order's own responses**: the Commission on Religious Prejudices
  (1914–17, chaired by Patrick Henry Callahan); the $25,000 reward notices of
  1928; the Historical Commission's 1924 *Racial Contributions* series —
  W. E. B. Du Bois, *The Gift of Black Folk*; Cohen, *The Jews in the Making
  of America*; Schrader, *The Germans in the Making of America* (all three
  1924 imprints verified in Internet Archive scans).
- **Race and the Order**: southern councils' blackball exclusion of Black
  applicants is stated by the National Catholic Register and acknowledged
  obliquely in the Order's own account of the 1964 McDevitt reform ("to
  counter charges of racial discrimination"); BlackPast frames the 1909
  founding of the Knights of Peter Claver without reference to KofC
  exclusion. Record the framings; do not resolve them.
- **Mexico**: the Order's advocacy during the Calles persecution (Coolidge
  meeting 1926, FDR meeting 1935) and Pius XI's *Iniquis Afflictisque*
  (18 Nov 1926), which names the Knights — cite the encyclical from
  vatican.va, not paraphrases.
- **McGivney's cause**: Venerable 2008 (Guild says 15 March, the Order's
  timeline 16 March — recorded as a conflict), beatified 31 October 2020.
  A beatification judges the holiness of a person's life; it is an act about
  the man, not about the Order.

## Known source-access quirks (net-access ladder)

- kofc.org, fathermcgivney.org, columbiamagazine.org, columbiettes.com serve
  full content to raw HTML fetches though pages look JS-shelled.
- Browser User-Agent required (UA filter, not a block): vaticannews.va,
  ncregister.com, blackpast.org, time.com/archive (406 to plain curl).
- 403 to this environment (inconclusive, not dead): justia.com (both
  subdomains), oregonencyclopedia.org, patheos.com, catalog.hathitrust.org.
- Chronicling America: the old chroniclingamerica.loc.gov API path 404s; use
  `https://www.loc.gov/collections/chronicling-america/?q=…&fo=json` with a
  browser UA. Page images live under `https://www.loc.gov/resource/<lccn>/…`.

## Standing uncertainties (kept honest in the dataset)

- February 1882 naming: day disputed (Feb 2, Catholic Encyclopedia 1913 vs
  Feb 6, kofc.org).
- Origin locus of the bogus oath: Chester County PA (Time 1928) vs an Aurora,
  Missouri tract (Time 1960); authorship unknown per all sources.
- The "60 → fewer than five anti-Catholic publications" statistic, the WWI
  "nearly $30 million", the *Pierce* funding, the six martyr-members and the
  2016 genocide-declaration credit are all the Order's own claims, so far
  uncorroborated independently — attributed as such wherever used.
- Fr. Coyle's murder day (11 Aug 1921), the Sept 1923 California affirmance,
  and the exact creation date of the Commission on Religious Prejudices are
  not pinned to primary sources yet.
- Supreme Knight day-level term dates rest on Wikipedia's consolidated list.

## Current state (2026-08, bootstrap + Klan-collapse wave)

- 52 events, 10 figures, 8 organizations, 52 references; threads declared
  (4 lanes: institution, anti-catholic-conflict, church-relations,
  public-action); no approvalLadder (not an apparition subject).
- A dedicated dossier page, "The Knights and the Klan", at /{lang}/kkk/
  (conflict.js + the optional `conflictPage` data key): eight narrative
  sections citing the same references, plus a timeline derived from the
  anti-catholic-conflict lane. The collapse section states the historians'
  verdict — the Klan fell to its own scandals (Stephenson, 1925), and no
  scholarly account reached credits the Order or street confrontation.
- Three locales (en / es / pt); es and pt dictionaries are exact-key,
  hand-authored by the assistant, not human-reviewed
  (`_meta.humanReviewed: false`; the page banner says so).
