# Glorious Destiny Advisory (GDA) — Site Build Plan

**Brand:** Glorious Destiny Advisory · **Authority:** Sista Grace Ajayi · **Affiliation:** WFG (compliance-first)  
**Model:** Same narrative arc as Infinite Wealth Academy — *emotional → story → education → authority → CTA*  
**Stack (scaffolded):** Astro 5 + Tailwind 3, static output, ready for Vercel/Netlify/GitHub Pages.

---

## Color system (chosen)

| Role        | Token        | Hex       | Use |
|------------|--------------|-----------|-----|
| Authority  | `ink`        | `#0B0B0F` | Header, hero, closing bands |
| Depth      | `charcoal`   | `#14141A` | Footer, cards on dark |
| Wealth     | `gold`       | `#C4A352` | CTAs, accents, highlights |
| Deep gold  | `gold-deep`  | `#9A7B30` | Links on light backgrounds |
| Canvas     | `ivory`      | `#FAF8F3` | Page body, light sections |
| Soft wash  | `sand`       | `#EFEBE4` | Alternating sections |
| Copy       | `body`       | `#2C2C34` | Primary text |
| Muted      | `muted`      | `#6E6E78` | Supporting text |

**Typography:** `Playfair Display` (display / legacy feel) + `DM Sans` (clean modern UI).  
**Rationale:** Black-adjacent ink + antique gold reads *faithful, premium, and calm* without looking like a generic “gold gradient crypto” template. Cream/ivory keeps long-form education readable.

---

## Funnel architecture (non-negotiable)

```
Traffic (ads / social / WhatsApp / referrals)
    → Free Training (email capture) OR Book (direct intent)
    → Thank You + nurture email
    → Book consultation
    → Application (mentorship filter) when appropriate
    → Client onboarding (off-site / CRM)
```

**Principle:** Under-build pages, over-build *paths*. Every major section should have one obvious next step.

---

## Phase 0 — Launch readiness (this week)

1. **Replace placeholders** in `src/config.json`: real email, phone, `calendlyUrl` (or TidyCal / WFG-approved scheduler).
2. **Portrait:** add `public/people/` image; swap homepage authority placeholder for `<Image>` or `<img>` with aspect ratio + subtle gold ring (match Infinite Wealth style).
3. **Wire forms**
   - **Free training:** Formspree, Basin, ConvertKit form action, or serverless API → redirect to `/thank-you`.
   - **Contact / Apply:** same pattern; store in Airtable/Notion if you want lightweight CRM.
4. **Legal:** Replace `privacy` + `terms` stubs with counsel-reviewed copy; paste **full WFG disclosure** block from compliance on `/legal`.
5. **Analytics:** Plausible or GA4 + conversion events (training submit, book click, apply submit).
6. **Domain + hosting:** Point DNS → host; set `site` in `astro.config.mjs`.

---

## Phase 1 — Lean public site (already scaffolded)

| Route | Purpose |
|-------|---------|
| `/` | Primary conversion page (full story arc + CTAs) |
| `/about` | Trust + mission + credentials |
| `/programs` | Three entry points + CTAs |
| `/book` | Scheduler embed (conversion endpoint) |
| `/free-training` | Lead magnet registration |
| `/thank-you` | Post-signup confirmation + next step |
| `/apply` | Mentorship qualification (premium filter) |
| `/contact` | Alternate entry + form |
| `/testimonials` | Expand social proof as you collect stories |
| `/resources` | Blog / video hub (phase 2 content) |
| `/legal`, `/privacy`, `/terms` | Compliance |

**Copy tone guardrails (WFG):** Education-first; no guaranteed returns; no income claims; clear *licensed financial professional with WFG*; independent entity language in footer (already mirrored on `/legal`).

---

## Phase 2 — Authority & nurture

- **Content collections:** Astro Content for `/resources` articles (categories: foundation, protection, leadership, legacy).
- **Video library:** YouTube embeds or private Vimeo; one pillar “start here” playlist.
- **Email sequences:** 3–5 email welcome series after free training (pure education + single soft CTA to book).
- **SEO:** Title/description per page; Open Graph images; local schema if applicable.

---

## Phase 3 — Optional expansion

- **Community page:** “Glorious Destiny Circle” — rules of engagement, how to join, expectations.
- **Events:** Workshops / seminars with registration.
- **Member-only area:** Only if you have ops bandwidth (gated content, login).

---

## QA checklist before paid traffic

- [ ] All CTAs go to a live destination (no `#` submit in production).
- [ ] Mobile nav: consider hamburger if links wrap awkwardly on small screens.
- [ ] Lighthouse pass (performance + a11y contrast on gold buttons).
- [ ] Spell-check legal names; WFG disclosure matches home state rules.
- [ ] Test thank-you flow end-to-end from free training.

---

## Repo location note

Project folder: `Documents/Websites_Projets/glorious-destiny-advisory/`.  
If you prefer a `Websites_Projects` folder name, move the directory and reopen the workspace—no code changes required.

---

## Immediate commands

```bash
cd glorious-destiny-advisory
npm install
npm run dev
```

Initialize remote when ready:

```bash
git init
git add .
git commit -m "Initial scaffold: Glorious Destiny Advisory Astro site"
```

Then create an empty GitHub repo and `git remote add origin …` + push.
