# Maison Tarot — the whole project, in one place

*Written 12 September 2026 so that work can resume in a new conversation. Read this first; the rest of the repository is code.*

---

## 1. What this is, and why

**Maison Tarot** is a bilingual (French / English) tarot-*teaching* house based in Paris. Its author reads and teaches tarot. She sells **lessons only** — one-to-one sessions (60 minutes, video) and workshops (three hours, twelve people, one "lens" per workshop) — and **never sells readings**; readings happen free at events. The positioning against the market is honesty with numbers: ~300 free blind readings for strangers who told her nothing, counted in a notebook (≈9 in 10 held, ≈1 in 10 missed, the misses published); her own birth chart tested box by box (30–40 % held overall; Saturn, Lilith, Chiron 75–90 %). The purpose: fewer people scammed, fewer afraid of the cards, more who read for themselves and stop paying anyone.

Taglines: **Demystify mysticism** / *Démystifier le mystique* (institutional) and **Cards aren't magic, you are.** / *Les cartes ne sont pas magiques, vous l'êtes.* (personal). Principles the copy repeats: there are no Chosen Ones; tarot is not an authority — act on what you feel; a miss is a miss (no reframing, no clarifier card); the silence rule (the sitter says nothing first); take a break from your cards; not everything is about spirits; astrology is not an excuse.

**Naming rules (changed mid-project, apply everywhere):** the place is called **Maison Tarot** — in English as well — never "the House"; the author writes as **I / je**, never "the host", and no name appears on pages. French always uses *vous*, and "clé de lecture" (never "lentille"). Banned as claims: gift/don, chosen/élu, manifest, the universe as an agent, vibes, divine/sacred/blessed, healing as a promise, awakening, witch as an identity, querent, "simply/just/easy".

Reference documents (delivered as files earlier; copies live in `seed/notes/`): the **brand book v2** (~3,800 words: identity, the two voices, personality, voice rules, tone by situation, vocabulary, promise, money, article formatting, titles/metadata, images, social, email, podcast, offers, origin story, never-list, checklist) and the **facts file** (every personal story the writer is allowed to use, as told: the Discord reading, the grandfather and the five pots of paint, her father's call from the temple, the yellow ribbon, the 2020 dreams, the voice that gave a friend's name — she is alive —, the astrology test, the Kloee Taylor pick-a-card video, the gifted deck, the teaching origin, selling sage in 2021 and stopping).

## 2. The website — Hugo, GitHub Pages

- **Repository:** `github.com/joanacodes/maison-tarot` (Hugo 0.165 extended; deployed by GitHub Actions to GitHub Pages; workflow `.github/workflows/deploy.yml`). Local copy `C:\Projets\mt`, Hugo binary `C:\Projets\hugo.exe`; run `hugo server -D` → `http://localhost:1313`.
- **Languages:** English at the root (`/`), French under `/fr/`; every pair shares a `translationKey`; `hreflang` with `x-default` = English; a banner offers the other language, never redirects.
- **Design:** black / white, one gold thread `#a88c52`, light and dark mode, Schibsted Grotesk (display) / Inter (body) / DM Mono (meta). Photographs black and white until touched, cards always in colour and whole, no mystical props, one light source. Wordmark; monogram M/T; favicon; logo pack in SVG/PNG.
- **Pages:** home; sessions; workshops; events (dialogs, countdown); method; about; the Readers' Guide (email → PDF); blog (3-column grid, search with a typing placeholder, filter chips, sort/length funnel, "read this first", related-by-tags and latest on articles, guide bubble); podcast (index + episode pages); the Library (numerology, four elements, tarot colours, feminine/masculine energies, astrological modes, astrology, symbols, the 78 cards, Kabbalah, history, figures); contact; disclaimers (one page with anchors `#readings #refusals #therapy #astrology`; FR `/fr/avertissements/#lectures #refus #therapie #astrologie`); legal ×3; 10 country hubs and **74 city pages** with real time-zone conversion, currency and regional hreflang (Pennsylvania excluded on purpose).
- **Library slugs:** EN `library/numerology`, `four-elements`, `tarot-colours`, `feminine-masculine-energies`, `astrological-modes`, `astrology`, `tarot-symbols`, `tarot-cards`, `kabbalah`, `tarot-history`, `tarot-figures`; FR `bibliotheque/numerologie`, `quatre-elements`, `couleurs-tarot`, `energies-feminine-masculine`, `modes-astrologiques`, `astrologie`, `symboles-tarot`, `cartes-tarot`, `kabbale`, `histoire-du-tarot`, `figures-du-tarot`.
- **SEO / AIO:** canonical, hreflang, Open Graph (generated 1200×630 default), Twitter cards, article dates, JSON-LD (Organization, WebSite, Person, WebPage, BlogPosting, FAQPage, BreadcrumbList, Event, Service), sitemaps, robots.txt, llms.txt, search index, `lastmod` from git, an author block at the end of articles fed by `hugo.toml` (`author.name`, `author.image`, `author.jobTitle`, per-language `authorShortDescription`). Taxonomy pages are disabled (thin); **category hub pages** are planned (`/blog/topic/<slug>/`, `/fr/blog/theme/<slug>/`) and not yet built.
- **Publishing policy:** everything goes live at launch; trend articles afterwards on a schedule (future `date` + hourly Actions cron). Never backdate. Search Console and the sitemap on day one.
- **Written so far (both languages):** 7 pillars; library pages for elements, energies, numerology (1–10, 4 ranks), colours (10), modes (3), 12 signs, 12 bodies; the Fool card page; 30 articles. Testimonials in `data/testimonials.yml`.
- **Not yet written:** 77 card pages (skeletons exist); 30 symbols; Kabbalah, history, figures (with sources, at the end); ~280 more articles (the writer app's job); category pages; deck & oracle sections (data-driven `data/decks.yml`, affiliate links with a disclosure line, her own signed ratings, no `AggregateRating`); the Guide PDF; cover images; the crest.
- **Her to-dos on the site:** author name/portrait/bio in `hugo.toml`; booking link and form actions; the Guide PDF in `static/guide/`; the 15 showcase photos; lawyer review (CGV, privacy); canonical domain + `static/CNAME`; Amazon Associates later.

## 3. The content plan

- `seed/data/plan.csv` — **727 rows**: 500 English titles (414 from the SEO research + 86 personal) and 320 French titles (from the French research), merged. 94 French titles were the same subject as an English one and became that row's French half; the remaining French rows have no English side until *Prepare titles* proposes it. Types: article, pillar, card page, library page, city page, podcast episode, tool. Columns: origin, type, category, tags, title/keyword/slug/path in both languages, length, angle, notes, pair_of, status_en, status_fr, merged_into, cover.
- Fixed slugs for every planned article, so links can be written before the target exists (`seed/data/site_paths.json` holds every existing page and the EN↔FR pairs).
- Categories per language: Learn/Apprendre, Practice/Tirages, Ideas we refuse/Idées reçues, Trends/Tendances, Astrology, tested/Astrologie testée, For readers/Pour les tarologues, Card meanings/Signification des lames, Stories & experience/Récits, Method/Méthode, Seasonal/Saisonnier.
- **Article rules** (`seed/prompts/style.md`): keyword-first title ≤ 65 chars; description 140–165; a summary of 60–110 words that answers the query on its own; H2s with anchors; 4–7 internal links from the allowed-path list, never twice the same; one bold sentence per section at most; a concrete next step at the end; 800–1,000 words (some 1,400–1,700); the count "300" only when it is the subject; no invented personal facts beyond the facts file — when a detail is missing, write around it and leave a `{{< todo >}}…{{< /todo >}}` line.
- **French** articles are adaptations, not translations: French idioms, references and register; same facts, same links swapped for their French paths; same `translationKey` (`post-<english-slug>`); categories and tags in French.

## 4. The writer — this repository

**Repository:** `github.com/joanacodes/mt-writer-web` (this one). Local `C:\Projets\mt-writer-web`. Deployed on **Vercel** (project `mt-writer-web`, production `https://mt-writer-web.vercel.app` unless renamed; the app is at the repository root — no root-directory setting). Data in **Supabase** (the project she created; tables from `supabase/schema.sql`, `usage.sql`, `overnight.sql`, `prices-fix.sql`; plus `alter table jobs add column if not exists chain text default '';`). The old `github.com/joanacodes/mt-writer` repository holds the first, local Python version of the tool and can stay as an archive.

**Environment variables (Vercel → Settings → Environment Variables):** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `APP_PASSWORD`, `AUTH_SECRET`, `CRON_SECRET`, `ANTHROPIC_API_KEY` (optional `OPENAI_API_KEY`, `GEMINI_API_KEY`), `GITHUB_TOKEN` (fine-grained, *Contents: read and write* on `maison-tarot`, one-year expiry), `GITHUB_OWNER=joanacodes`, `GITHUB_REPO=maison-tarot`, `GITHUB_BRANCH=main`. `vercel.json` must stay `{}` on the free plan (an hourly cron is refused and blocks the whole deployment — this happened twice).

**Scheduler (Supabase, so batches and covers progress while the phone is off):** enable `pg_cron` and `pg_net`, then
```sql
select cron.schedule('mt-writer-poll', '*/10 * * * *',
  $$ select net.http_get(url := 'https://mt-writer-web.vercel.app/api/cron?key=YOUR_CRON_SECRET'); $$);
```

**What it does:** one password; the plan as a list with filters and search; notes per article (they outrank everything in the prompt); *Write ▾* menu — now EN+FR / EN / FR / Batch EN ½ / Batch FR ½ / Overnight ½ (English batch → French batch → covers if enabled) — each with an estimate; pause/stop for live runs; an article view (rendered, with the front matter in a box; edit; regenerate EN / FR / both; cover; publish); a log bubble with today's spend; Settings (models, cheap model, retries, default length, chunk size, daily cap, overnight toggles, image prompts on/off, image model + reference photo, publishing options, theme, refresh, housekeeping incl. re-check and reset). Publishing commits `content/en/blog/<slug>.md`, `content/fr/blog/<slug>.md` (and `assets/covers/<slug>.jpg` when covers are on) to the site repo; GitHub Actions rebuilds the site; the cron reports the build's success or failure into the log.

**How it keeps the API bill low:** extended thinking off (with fallbacks *effort low* → plain if a model refuses the switch; the log line says which mode ran); 16k output ceiling for the text; prompt caching of two stable blocks (log lines show `in · cached · written-to-cache · out`); the app itself fixes `translationKey`, `type`, `date`, `image`, the category in the right language, tags and links to non-existent pages — never by asking the model again; one expand-retry only for a genuinely short draft; batch = half price; a cheap model for title preparation; a daily cap (default $25); estimates from your own recent averages. Realistic cost: ~$0.10 per language per article live, half in batch.

**Security:** constant-time password check, eight attempts per quarter hour, signed expiring cookie, every route authenticated, the cron route locked with `CRON_SECRET` (or the app cookie), server-only keys, sanitised publish paths, `noindex` and frame-denial headers.

**Local run:** `npm install`, create `.env.local` with the same variables, `npm run dev` → `http://localhost:3000`. First-time database fill: `node scripts/import-plan.mjs` (uses `seed/`), or with the site to import already-written articles: `node scripts/import-plan.mjs .\seed C:\Projets\mt`.

## 5. Where we left off (last modifications, 12 September 2026)

Delivered as the complete repository `mt-writer-web` (this one), replacing the earlier `mt-writer/web` subfolder that never deployed reliably. The last changes, all in this version:

1. Mobile header rebuilt: brand + theme/settings icons on the first row, search and category below — nothing off-screen; no horizontal scroll; settings rows stack on phones.
2. *Write EN+FR* no longer skips the French silently: if a row lacks its French title/slug, the app prepares it first (cheap model), then writes.
3. Image prompts are **off by default** (`image_prompts` in Settings). Off: articles carry no `image`/`imagePrompt`/`imageAlt` fields, so the site shows no placeholder.
4. `translationKey` is forced by the app on generation, on every manual save, and by the *Re-check all articles* button in Settings; saving an edit re-runs the checks so a corrected article loses its ⚠ immediately.
5. Reasoning switch with fallbacks (thinking off → effort low → plain), and the mode printed in each log line.
6. Publishing logs the commit and the cron watches the site's GitHub Actions run, reporting `site build: success` or `site build: failure — open <url>`.
7. Security and cost architecture as listed above; light/dark theme; the two-pane desktop layout.

**Open questions to check first in a new conversation:**
- Is the new Vercel project deploying on push? (It required granting the Vercel GitHub app access to the repository, and `vercel.json = {}`.)
- The first article's log line after these changes: expected `out ≈ 1.5–2k · reasoning thinking_off · $0.08–0.12`. If `out` is above 10k, reasoning is still on — switch the fallback.
- Why the first published article did not appear on the blog: read the `site build:` line in the log (an Actions failure would say so) and check `github.com/joanacodes/maison-tarot/actions`.
- Then: covers (run twenty with a reference photo before all), category pages, decks/oracles, the Guide PDF, the 77 card pages, symbols.
