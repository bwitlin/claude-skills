# Active Context Header

A communication rule for Claude Code that adds a visible status line to every response showing which skill, mode, or context is currently active.

When Claude switches between skills, the header announces the transition and gives a one-line description of what the new skill does. When no skill is active, it simply shows `> Claude`.

This helps you always know what mode Claude is operating in, especially during long sessions where multiple skills or workflows are used.

## Install

Copy `active-context-header.md` into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp active-context-header.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp active-context-header.md ~/.claude/rules/
```

## What It Looks Like

### No skill active

<!-- screenshot:steady-state -->
*Screenshot placeholder: steady-state response with `> Claude` header*

```
> Claude

Here's the refactored function...
```

### Active skill

<!-- screenshot:active-skill -->
*Screenshot placeholder: response during an active skill with `> /code-review` header*

```
> /code-review

Looking at the diff, there's an N+1 query on line 47...
```

### Skill transition

<!-- screenshot:transition -->
*Screenshot placeholder: response showing a transition between two skills*

```
> **Switching** from **/code-review** to **/debug**
> **/debug** -- *Structured debugging with root cause investigation.*

Starting with the stack trace you pasted...
```

## Works With

- Claude Code skills and plugins
- Custom workflows and modes
- Base Claude (shows `> Claude` when nothing else is active)

## Customization

Edit the rule to change the default label (e.g., `> Claude` to `> Base` or `> General`), or adjust the blockquote format to match your preference.
