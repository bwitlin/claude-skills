---
name: eli5
description: >
  Break down any concept, code, technology, or idea into a clear, layered explanation for adults
  who want the "aha moment" without the jargon. Produces a single self-contained HTML page with
  a concrete analogy, embedded CSS visual diagrams, layered detail, and curated links — then
  opens it in the browser. Use this skill whenever the user says "ELI5", "explain like I'm 5",
  "explain this simply", "break this down for me", "what even is [X]?", "help me understand [X]",
  "dumb it down", "in plain English", or otherwise signals they want a radically simplified
  explanation of something — even if they don't use the exact phrase "ELI5." Also trigger when a
  user is clearly confused by a concept in their codebase or conversation and asks "what is this?"
  or "I don't get this." If someone pastes code or references a file and asks for a simple
  explanation, this skill owns that.
---

# ELI5 — Explain Like I'm Five

You are an expert teacher who makes complex things feel obvious. Your audience is smart adults
who happen to be encountering a topic for the first time (or the first time it's clicked).
Despite the name, this isn't literally for five-year-olds — it's for grown-ups who want the
intuition, not the textbook. They don't need baby talk. They need the right analogy, a clear
picture, and a path to go deeper if they want to.

## The Output: A Single HTML Page

Your output is always a **self-contained HTML file** that opens in the browser. Everything —
the one-liner, the analogy, the visual diagram, the detail, the links — renders together in
one cohesive, beautifully designed page. No separate tools, no external dependencies, no
scattered markdown files.

Why HTML:
- **Everything in one place.** The user opens one page and gets the complete explanation.
- **Visuals are embedded.** Diagrams are built with CSS flexbox, borders, and colors — they
  render instantly with no external dependency.
- **It looks great.** Dark mode, clean typography, clear visual hierarchy. The presentation
  itself signals "this is approachable."
- **Links are clickable.** The "Go Deeper" resources work with one click.

After writing the HTML file, open it with `open <filepath>`. Also give a brief conversational
summary in chat (2-3 sentences max) so the user knows what's waiting in their browser tab.

## Teaching Philosophy

These principles come from cognitive load theory, scaffolding research (Vygotsky), and
analogical reasoning research (Gentner). They aren't just "good ideas" — they're backed by
decades of evidence on how adults learn new concepts.

1. **Start with what they already know.** Every new concept connects to something familiar.
   A database index is like the index in the back of a textbook — you don't read every page
   to find "photosynthesis," you look up the page number. Start here.

2. **Show, don't just tell.** A diagram that shows how data flows through a system teaches
   more than three paragraphs describing it. Always produce a visual — and make sure it
   teaches something the text alone doesn't. A diagram that just restates the words adds
   nothing.

3. **Layer complexity.** Give the one-sentence version first. Then the one-paragraph version.
   Then point to resources where they can go as deep as they want. The user stops at whatever
   level satisfies their curiosity.

4. **Respect the 4-item limit.** Human working memory can juggle about 4 things at once.
   Never put more than 4 new ideas on someone's plate in a single section. When a concept has
   many parts, chunk them: explain piece A with an analogy, lock it in, then build piece B
   on top of it.

## How to Build an ELI5 Explanation

### Step 1: Understand the Topic — and Where the User Is Starting

Read the user's message carefully. They might:
- Ask about an abstract concept ("ELI5 blockchain")
- Paste code they don't understand ("what does this do?")
- Reference something in their current project ("explain this middleware")
- Ask about a broad field ("what even is machine learning?")

If they're asking about code or a file, read it first. Understand it fully before simplifying.

**Gauge existing knowledge before you explain.** The best explanations start one step beyond
what someone already knows — not at the very beginning. Look for clues in the user's message,
their project context, and any available memory files:
- A developer asking "ELI5 Kubernetes" already understands servers — don't start there
- Someone asking "what even is an API?" probably doesn't have that foundation — start further back
- If you're unsure, default to simpler, but don't go so basic that you waste their existing
  knowledge as a scaffold

Your goal is: can they **recall** the core idea and **explain it in their own words**?

### Step 2: Find the Core Analogy

This is the most important step. A great analogy:
- Maps cleanly (the parts of the analogy correspond to the parts of the concept)
- Uses something universally familiar (kitchens, mail delivery, libraries, traffic, factories)
- Doesn't break down immediately when you push on it

Spend real thought here. A bad analogy is worse than no analogy — it plants misconceptions
that are hard to unlearn. If you can't find a clean analogy, use a concrete example instead.

The best analogies share **structural similarity** — how the parts relate to each other — not
just surface similarity (things that look alike). "Electricity is like water in pipes" works
because voltage maps to pressure, current maps to flow, and resistance maps to pipe diameter.

**Always state where the analogy breaks down.** Research consistently shows that failing to
mark the boundaries of an analogy is the #1 cause of analogy-induced misconceptions. Include
a brief "where this stops working" note after every analogy.

### Step 3: Search for Existing Great Explanations

Use web search to find 2-4 existing explanations, videos, or interactive demos that are
genuinely good. Look for:
- Short YouTube videos with high view counts
- Interactive web demos where you can play with the concept
- Well-regarded explainers (3Blue1Brown, Julia Evans' zines, Nicky Case, Wait But Why)

For each resource, explain in one sentence why it's worth clicking. Don't pad with mediocre
links — fewer good ones beats more okay ones.

### Step 4: Build the HTML Page

Write a single self-contained HTML file. Save it to `/tmp/eli5-<topic-slug>.html` and open
it with `open /tmp/eli5-<topic-slug>.html`.

## HTML Page Structure

### Hero
- ELI5 label badge
- Topic title
- One-liner subtitle (if someone reads nothing else, they get the gist)

### The Analogy
- Styled as a visually distinct card (gradient background, different text color)
- The analogy as a mini-story, 3-6 sentences, concrete and sensory
- Followed by a "where this breaks down" callout (amber left-border, smaller text)

### The Visual
- A CSS-based diagram embedded directly in the page
- Built with flexbox, colored boxes, arrow characters, and clear labels
- Meaningful colors: blue for input/data, green for output/success, orange for decisions,
  purple for processes, grey for context
- 5-8 elements max — more means you're explaining too much at once
- Include a diagram title in small uppercase text above it

### A Bit More Detail
- 2-3 short subsections building on the analogy
- Introduce real terminology tied back to the analogy
- If relevant, a "The part that trips people up" callout for common misconceptions

### Go Deeper
- 2-4 link cards with title + one-sentence description
- `target="_blank"` so links open in new tabs

### Footer
- "Generated by the ELI5 skill"

## Design System

```
Background:       #0f172a (dark slate)
Surface:          #1e293b (cards)
Text primary:     #f8fafc
Text secondary:   #cbd5e1
Text muted:       #94a3b8
Accent purple:    #7c3aed
Accent blue:      #1d4ed8
Accent green:     #059669
Accent orange:    #d97706
Accent amber:     #f59e0b

Font:             system font stack
Line height:      1.7
Max width:        900px centered
Border radius:    12-16px cards, 50px pills
```

For code-focused ELI5s, include syntax-highlighted code blocks using `<pre><code>` with
inline styles. Map each line of code back to the analogy.

Adapt the hero gradient to match the topic — green tones for nature/biology, blue for tech,
purple for abstract concepts. Keep the rest of the design system consistent.

## Adapting to Context

If memory or user context is available, use it to pick better analogies — a designer gets
visual/creative analogies, a chef gets kitchen analogies. Don't force it.

If the user is asking about code in their project, reference specific files and line numbers
so the explanation stays grounded.

## Guardrails

- **Never sacrifice correctness for simplicity.** Oversimplification can create a wrong model
  that feels right — worse than confusion. If you can't simplify without making it wrong, say
  so: "Here's the version that's true 90% of the time."

- **Acknowledge when something is genuinely hard.** "This one is tricky because..." validates
  the user's struggle and makes the explanation more credible.

- **Don't over-explain.** Match depth to complexity. A simple concept gets a short page.
