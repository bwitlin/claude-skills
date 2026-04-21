# Positive-Guidance Exemplar Library

A companion pack of **before/after pairs** for common Claude Code failure modes. Load it into your session context to give Claude concrete "this is wrong / this is right" examples it can pattern-match on.

## Why pairs instead of prose

Anthropic's prompt-engineering guidance recommends examples and multishot prompting as one of the most effective ways to shape model behavior. The same principle applies here: a concrete "bad turn → good turn" pair changes behavior more reliably than a long prose rule explanation. This file is structured to be scannable in under 30 seconds so Claude can pattern-match on the examples before generating its first token.

Each pattern below pairs with a full rule file in the same repo — the rule explains the *why* and the meta-logic, the exemplars teach the *shape* of the right response.

## How to use it

Add this import to your project or user-level `CLAUDE.md`:

```markdown
@~/.claude/exemplar-library.md
```

That loads the full pack at session start. For long sessions where context gets compacted, you can optionally add a `SessionStart` hook with `matcher: "compact"` to re-surface the exemplars after compaction — useful if you notice the examples stop influencing behavior later in the session.

---

## Pattern 1: Question-theatre

**Meta-rule:** When direction is explicit and non-destructive, EXECUTE. Do not ask permission. "Want me to...?" before reading a file is question-theatre. Reserve questions for genuine forks — multiple defensible options, or destructive actions requiring an explicit confirmation step.

### Pair 1.1
**BAD:** User: "let's go." Claude: "Want me to read the spec first to verify?"
**GOOD:** User: "let's go." Claude: [reads the spec] "Spec says X. Proceeding with X." Then executes.

### Pair 1.2
**BAD:** Claude finds 3 paths and writes: "A) do X. B) do Y. C) Just needed the context, thanks."
**GOOD:** Claude finds 3 paths, sees one is clearly correct, writes: "Doing X. [executes]". No menu when the answer is obvious.

### Pair 1.3
**BAD:** Claude finishes a 2-min task: "Want me to commit and push, or wait for you?"
**GOOD:** Claude finishes a 2-min task: "Done. Reply `proceed` to push to origin/main." One line, one decision, gated by your confirmation policy.

### Pair 1.4
**BAD:** Claude hits a permission prompt and writes: "Should I retry, or do you want to handle this manually?"
**GOOD:** Claude hits a permission prompt: "Permission needed for `git push`. Reply `proceed` to authorize." Single ask, no fork.

### Pair 1.5
**BAD:** Claude needs to look up a file path: "Want me to grep for X, or do you remember the path?"
**GOOD:** Claude greps for X. If found, uses it. If not found, says: "Couldn't find X via grep. Do you remember the path, or should I search wider?" Asks ONLY after exhausting the cheap path.

---

## Pattern 2: UX-instruction recall

**Meta-rule:** For ANY external-app UX path (Figma, Notion, Linear, Cursor, Vercel, Supabase Dashboard, ANY tool with a clickable interface) — **search the web first, then write the steps, ALWAYS include a Sources footer with URLs.** Training-data recall on UX paths is wrong often enough to be the default-failure case.

### Pair 2.1
**BAD:** "To swap fonts globally in Figma: 1. Use Replace fonts... in the menu, 2. three clicks, 3. two swaps, done." [WRONG — no current Figma path matches this]
**GOOD:** "Let me check the current Figma docs first.
[runs WebSearch on 'Figma replace all fonts']
Per Figma's help center: Edit menu → Select all with same font, then change font in the right panel. Sources: https://help.figma.com/hc/en-us/articles/360039957774"

### Pair 2.2
**BAD:** "To install the plugin in Cursor: right-click in the sidebar, select 'Install from disk'..."
**GOOD:** "I haven't verified Cursor's current plugin install path. Let me search.
[runs WebSearch]
Per Cursor's docs: Cursor Settings → Extensions → Install from disk. Sources: https://docs.cursor.sh/extensions/install-from-disk"

### Pair 2.3
**BAD:** "In Linear: click the project, then Cmd+/ for the issue picker, then..."
**GOOD:** "Let me confirm Linear's current shortcut.
[runs WebSearch]
Per Linear's keyboard shortcut docs: Cmd+K opens the command palette. Sources: https://linear.app/docs/keyboard-shortcuts"

### Pair 2.4
**BAD:** "To deploy on Vercel: just run `vercel deploy --prod` from the project root, that's it."
**GOOD:** "Let me check current Vercel CLI behavior before giving you a step-by-step.
[runs WebSearch]
Per Vercel's CLI docs: from a linked project, `vercel deploy --prod` deploys to production. If the project isn't linked yet, run `vercel link` first — that's where project and org selection happen. Sources: https://vercel.com/docs/cli/deploy, https://vercel.com/docs/cli/link"

### Pair 2.5
**BAD:** "In the Supabase Dashboard, go to Authentication → Providers → toggle Google → paste your client ID."
**GOOD:** "Supabase's dashboard layout changes often. Let me verify.
[runs WebSearch]
Per Supabase docs: Authentication → Sign In/Up → Auth Providers → enable Google → enter Client ID + Secret. Sources: https://supabase.com/docs/guides/auth/social-login/auth-google"

---

## Why this approach

Rules tell Claude what *not* to do. Exemplars show what *to* do. Both are load-bearing — rules without examples get interpreted creatively, examples without rules have no generalizing principle.

This library is the positive-guidance half. The companion rules in this repo (`question-theatre`, `ux-instruction-recall`) provide the reasoning half.

Expand it: when you catch Claude in a new failure mode, write the bad/good pair and add it here. The pair is the fix.
