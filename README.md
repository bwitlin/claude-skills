# claude-skills

Claude Code skills by Brian Witlin.

## /feedback

A structured self-assessment skill for Claude Code users. Analyzes your recent git history, memory files, and project state, then delivers an honest **5/5/5 report**: 5 things going well, 5 things not going well, 5 things to improve. Each finding is backed by specific evidence (commit hashes, file counts, timestamps), not vibes.

The skill tracks trends across sessions, so the second run is more useful than the first. It distinguishes between **literacy gaps** (you don't know the tool exists) and **discipline gaps** (you know but didn't use it), and prescribes different fixes for each.

### Install

```bash
claude plugin add bwitlin/claude-skills
```

### Usage

```
/feedback          # Last 48 hours (default)
/feedback 24h      # Last 24 hours
/feedback 7d       # Last 7 days
/feedback 2w       # Last 2 weeks
```

### What it looks for

- **Git history** -- commit patterns, categories (feat/fix/chore), late-night work
- **Memory files** -- new memories created in the review window
- **Project state** -- TASKS.md, incident-log.md, uncommitted changes
- **Previous feedback sessions** -- trend comparison (new, improving, stable, regressing)

### Output

The report is displayed in chat and saved to `.context/feedback-sessions/` in your project directory for future trend tracking. After presenting findings, it asks for your reaction and saves your response alongside the report.

### Optional enhancements

These are not required but improve the quality of recommendations:

- **Context7 MCP** -- If connected, the skill pulls current Claude Code documentation to catch features you might not know about. Install from [context7.com](https://context7.com).
- **gstack** -- If installed (`~/.gstack/`), the skill also scans checkpoint history for additional evidence. Install from [github.com/garrytan/gstack](https://github.com/garrytan/gstack).

## License

MIT
