# UX-Instruction Recall

When writing steps for any external application with a clickable interface — Figma, Notion, Linear, Cursor, Vercel, Supabase Dashboard, any SaaS tool — **search the web first, cite sources, and write the steps from current docs.** Training-data recall for UX paths is wrong often enough to be the default-failure case.

## What this prevents

SaaS tools redesign their UIs constantly. Menus move, keyboard shortcuts change, settings get renamed. Claude's training data is a snapshot in time, so any remembered UX path is suspect the moment it's written. The failure looks like:

- "To swap fonts in Figma: Edit → Replace Fonts..." (no such menu exists)
- "In Cursor: right-click in the sidebar and select Install from disk..." (wrong flow)
- "Go to Settings → Authentication → Providers in Supabase..." (submenu names have shifted)

These sound confident and look right. They waste hours when the user follows them and nothing is where Claude said it would be.

## How to apply

**Any time you're about to describe clicks, menu paths, keyboard shortcuts, or settings panels in a third-party app:**

1. **Search first.** Run a web search for the current documented path.
2. **Cite the source.** Quote the docs, don't paraphrase from memory.
3. **Include a Sources footer** with the URL(s) you used. The user should be able to verify.
4. **If the search returns nothing authoritative:** say so. "I couldn't find current docs on this — here's what I remember, but verify before trusting it."

## The test

Before writing any "click X → click Y → select Z" instruction, ask yourself: *"Did I just search for this, or am I pattern-matching from memory?"*

If from memory — search first. Every time.

## Companion

For concrete before/after examples of this pattern, see [`exemplar-library`](../exemplar-library/) Pattern 2.
