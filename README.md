# claude-skills

Claude Code skills by Brian Witlin.

## /feedback

A structured self-assessment skill for Claude Code users. Analyzes your recent git history, memory files, and project state, then delivers an honest **5/5/5 report**: 5 things going well, 5 things not going well, 5 things to improve. Each finding is backed by specific evidence (commit hashes, file counts, timestamps), not vibes.

The skill tracks trends across sessions, so the second run is more useful than the first. It distinguishes between **literacy gaps** (you don't know the tool exists) and **discipline gaps** (you know but didn't use it), and prescribes different fixes for each.

### Install

```bash
# Add the marketplace and install the plugin
claude plugin marketplace add bwitlin/claude-skills
claude plugin install feedback@bwitlin-claude-skills
```

<details>
<summary>Manual install (alternative)</summary>

```bash
git clone https://github.com/bwitlin/claude-skills.git ~/.claude/local-plugins/claude-skills
mkdir -p ~/.claude/skills && ln -sf ~/.claude/local-plugins/claude-skills/skills/feedback ~/.claude/skills/feedback
```
</details>

> **Note:** The skill won't appear until your next Claude Code session. If `/feedback` doesn't work immediately, restart Claude Code.

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
- **Fresh documentation** -- pulls current Claude Code docs at analysis time so recommendations reflect the latest features, not stale training data. If a new hook, slash command, or workflow shipped last week that solves your pain point, the skill knows about it.

### Output

The report is displayed in chat and saved to `.context/feedback-sessions/` in your project directory for future trend tracking. After presenting findings, it asks for your reaction and saves your response alongside the report.

### Optional enhancements

The fresh documentation feature requires the Context7 MCP server. Without it, the skill still works but skips the doc-checking step and only recommends based on what it can observe in your project.

- **Context7 MCP** -- Powers the fresh documentation lookup. The skill queries current Claude Code docs before writing recommendations, so it can catch new features you might not know about. Install from [context7.com](https://context7.com).
- **gstack** -- If installed (`~/.gstack/`), the skill also scans checkpoint history for additional evidence. Install from [github.com/garrytan/gstack](https://github.com/garrytan/gstack).

## License

MIT
