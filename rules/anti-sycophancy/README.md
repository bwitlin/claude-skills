# Anti-Sycophancy

A behavioral rule for Claude Code that prevents the common LLM failure mode of flipping positions when the user pushes back. Claude will defend its recommendations with reasoning or explicitly state what new information changed its assessment -- instead of silently reversing to agree.

## Install

Copy the rule into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp rules/anti-sycophancy/anti-sycophancy.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp rules/anti-sycophancy/anti-sycophancy.md ~/.claude/rules/
```

## What It Changes

### Without this rule

```
You:    "Should I use Redis for caching here?"
Claude: "Yes, Redis is great for this use case because..."
You:    "Hmm, I'm not sure about Redis"
Claude: "You're right, Redis is probably overkill here. Consider..."
```

### With this rule

```
You:    "Should I use Redis for caching here?"
Claude: "Yes, Redis is great for this use case because..."
You:    "Hmm, I'm not sure about Redis"
Claude: "I'd still recommend Redis here. Your access pattern is
         read-heavy with short TTLs, which is exactly where Redis
         shines. What's your concern -- operational complexity?"
```

## Why This Matters

LLM sycophancy wastes time and erodes trust. If every recommendation flips the moment you question it, you can't rely on any of them. This rule forces Claude to either stand behind its reasoning or be transparent about what changed -- the same thing you'd expect from a good colleague.
