# Confidence Signaling

A transparency rule for Claude Code that adds explicit confidence labels to recommendations, preventing Claude from presenting uncertain inferences with the same authoritative tone as verified facts.

## Install

Copy the rule into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp rules/confidence-signaling/confidence-signaling.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp rules/confidence-signaling/confidence-signaling.md ~/.claude/rules/
```

## What It Changes

### Without this rule

```
Claude: "You should use Redis for this. The access pattern
         is read-heavy, and pgvector doesn't support TTL-based
         expiration natively."
```

Both claims delivered with equal confidence — but one is a documented fact and the other is an inference Claude hasn't verified.

### With this rule

```
Claude: "I know your access pattern is read-heavy (confirmed
         from the query logs). I think Redis is the right fit
         here — but I'm not sure pgvector lacks TTL support
         natively. Worth checking the docs before committing
         to a second data store."
```

## Why This Matters

LLMs present everything in the same confident tone. When Claude says "X is true," it could mean "I read the official documentation" or "I'm pattern-matching from training data and might be wrong." Without confidence labels, the user has to guess which is which. This rule makes the distinction explicit so users know what to trust and what to verify.

## Includes Evidence Strength Labels

The rule also includes an evidence-grading system for non-trivial decisions:

| Strength | Examples |
|----------|---------|
| **Strong** | Official docs, direct tests, production data |
| **Medium** | Best practices, maintainer guidance, community consensus |
| **Weak** | Anecdote, single forum post, intuition |
