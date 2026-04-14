# /feedback

Structured self-assessment skill for Claude Code. Reads your git history, memory files, checkpoints, and project state, then delivers an honest **5/5/5 report**: 5 things going well, 5 things not going well, 5 things to improve. Every finding cites specific evidence -- commit hashes, file counts, timestamps.

Tracks trends across sessions. Every finding is labeled: **new**, **improving**, **stable**, or **regressing**. Items that don't improve get escalated -- not repeated. After 3 rounds of the same advice, the skill stops suggesting willpower and starts proposing hooks, scheduled tasks, or rule changes.

## Install

```bash
claude plugin marketplace add bwitlin/claude-skills
claude plugin install feedback@bwitlin-claude-skills
```

## Usage

```
/feedback          # Last 48 hours (default)
/feedback 24h      # Last 24 hours
/feedback 7d       # Last 7 days
/feedback 2w       # Last 2 weeks
```

## What it looks for

- **Git history** -- commit patterns, categories (feat/fix/chore), late-night work
- **Checkpoints** -- session boundary discipline, handoff quality
- **Memory files** -- new memories created in the review window
- **Project state** -- TASKS.md, incident-log.md, uncommitted changes
- **Previous feedback sessions** -- trend comparison across every prior run

## Optional enhancements

- [Context7 MCP](https://context7.com) -- powers fresh documentation lookup so recommendations reflect current Claude Code features
- [gstack](https://github.com/garrytan/gstack) -- scans checkpoint history and skill changelog for additional evidence

## License

MIT
