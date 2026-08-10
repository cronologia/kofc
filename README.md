# kofc — the Knights of Columbus, a chronology

An open, source-referenced chronology of the **Knights of Columbus**, the
Catholic fraternal benefit society founded in New Haven, Connecticut, in
1881–82 by Bl. Michael J. McGivney — its institutional history, its relations
with the popes, its public campaigns, and the documented conflict between the
Order and organized anti-Catholicism in the United States. Part of the
[cronologia](https://github.com/cronologia) family.

Published site: <https://cronologia.github.io/kofc/> (en / es / pt).

## Posture

Two threads carry most of the editorial risk, and each has a stated rule:

- **The "bogus oath" is documented as a fabrication.** The text circulated
  from 1912 as the Knights' Fourth Degree oath was found **spurious** by a
  committee of the U.S. House of Representatives (Congressional Record,
  15 February 1913), and publishers who circulated it were convicted of
  criminal libel (Philadelphia 1914; Waterville, Minnesota 1914; *Crane v.
  State*, Oklahoma 1917). The dataset cites the acts — the House record, the
  court decisions, the period newspapers — and never reproduces the slur as if
  it were a disputed document. Its resurfacings (the Klan press of the 1920s,
  the presidential campaigns of 1928 and 1960) are documented from
  contemporary sources.
- **Attribution over assertion, on all sides.** The Order's self-crediting
  claims (WWI fund totals, credit for the 1954 "under God" law, the *Pierce*
  litigation funding, the six martyr-members) are recorded as the Order's own
  account where no independent source corroborates them. Characterizations of
  the Ku Klux Klan are those of the cited historians and period documents —
  including the Klan's own weekly, cited as evidence of its messaging and
  never for its claims. Where Catholics fought the Klan but the Knights as an
  organization did not (Carnegie 1923, South Bend 1924), the dataset says so
  explicitly.
- The race-exclusion thread — the founding context of the **Knights of Peter
  Claver** (1909) and the Order's own 1964 admission reform — is recorded as
  competing attributed framings, not adjudicated.

Single-source dates are flagged (`dateVerified: false`, rendered with a `?`),
with a `dateNote` naming the disagreement where sources conflict.

## How it works

`data/chronology.json` is the source of truth. A zero-dependency Node script
compiles it into static HTML (`docs/`, served by GitHub Pages) in English
(authoritative), Spanish and Portuguese; the es/pt strings live in
`data/i18n/` as committed, hand-authored dictionaries.

```
node scripts/validate-data.js   # schema + citation check
node build.js                   # regenerate docs/
node --test                     # invariants, i18n completeness, renderers
```

Every data change must pass all three and commit the regenerated `docs/`
together with the data. See `AGENTS.md` and `context.md` before editing.

## License and corrections

Data and code are MIT licensed. Corrections against primary sources are
welcome as issues or pull requests.
