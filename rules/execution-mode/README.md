# Execution Mode

A workflow rule for Claude Code that switches Claude into a streamlined, action-first mode during multi-step tasks. One action per response, no lectures, no education — just the next thing to do.

## Install

Copy the rule into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp rules/execution-mode/execution-mode.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp rules/execution-mode/execution-mode.md ~/.claude/rules/
```

## What It Changes

### Without this rule

```
You:    "Fix the broken CSS on the settings page"
Claude: "The CSS issue could be caused by several things.
         Let me explain how the cascade works in this context.
         There are three possible approaches:
         1. Override the specificity...
         2. Use !important (not recommended because...)
         3. Restructure the component hierarchy..."
```

### With this rule

```
You:    "Fix the broken CSS on the settings page"
Claude: "Found it — z-index conflict on line 47. Fixed.
         Reload to verify."
```

## Why This Matters

Claude defaults to teaching mode — explaining the why, listing alternatives, offering context. That's valuable when you're exploring or learning. But during execution (deploying, debugging, running a review), it creates friction. You have to extract the one action from paragraphs of explanation, every single response.

This rule makes Claude match your mode. Exploring? Teach me. Executing? Just do the thing.

## Frustration Detection

The rule includes built-in frustration detection. When your responses get shorter, more emphatic, or more direct, Claude strips its response to the minimum and gives one action. It adapts to your energy rather than maintaining the same verbose baseline regardless of context.
