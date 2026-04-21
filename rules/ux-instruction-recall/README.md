# UX-Instruction Recall

A behavioral rule that forces Claude to search current docs before writing menu paths, keyboard shortcuts, or settings instructions for any external SaaS tool (Figma, Notion, Linear, Cursor, Vercel, Supabase Dashboard, etc.). Training-data recall for UX paths is wrong often enough to be the default-failure case.

## What it changes

### Without this rule

```
You:    "How do I change the global font in Figma?"
Claude: "Go to Edit → Replace fonts, then select the one you want."
You:    [opens Figma, no such menu exists]
        "That menu doesn't exist."
```

### With this rule

```
You:    "How do I change the global font in Figma?"
Claude: "Let me check the current Figma docs first.
         [runs WebSearch on 'Figma replace all fonts']

         Per Figma's help center: Edit menu → Select all with same font,
         then change font in the right panel.

         Sources: https://help.figma.com/hc/en-us/articles/360039957774"
```

## Why this matters

SaaS tools redesign constantly. Menus move, shortcuts change, settings get renamed. A confident-sounding instruction from memory wastes hours when the user follows it and nothing is where Claude said it would be. Current docs are one search away and the citation proves it.

## The test

Before writing any "click X → click Y → select Z" for a third-party app, ask yourself: *"Did I just search for this, or am I pattern-matching from memory?"*

If from memory — search first. Every time.

## Install

Project-level:

```bash
mkdir -p .claude/rules
cp rules/ux-instruction-recall/ux-instruction-recall.md .claude/rules/
```

User-level (all projects):

```bash
mkdir -p ~/.claude/rules
cp rules/ux-instruction-recall/ux-instruction-recall.md ~/.claude/rules/
```

## Pairs with

- [`exemplar-library`](../exemplar-library/) — 5 concrete before/after pairs across Figma, Cursor, Linear, Vercel, and Supabase

## License

MIT
