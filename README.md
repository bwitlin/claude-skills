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
- **Fresh documentation** (optional, requires [Context7 MCP](https://context7.com)) -- when available, pulls current Claude Code docs at analysis time so recommendations reflect the latest features, not stale training data

### Output

The report is displayed in chat and saved to `.context/feedback-sessions/` in your project directory for future trend tracking. After presenting findings, it asks for your reaction and saves your response alongside the report.

### Optional enhancements

The fresh documentation feature requires the Context7 MCP server. Without it, the skill still works but skips the doc-checking step and only recommends based on what it can observe in your project.

- **Context7 MCP** -- Powers the fresh documentation lookup. The skill queries current Claude Code docs before writing recommendations, so it can catch new features you might not know about. Install from [context7.com](https://context7.com).
- **gstack** -- If installed (`~/.gstack/`), the skill also scans checkpoint history for additional evidence. Install from [github.com/garrytan/gstack](https://github.com/garrytan/gstack).

## /skill-battle

A creative pitch room for Claude Code. Give it a task, and it finds multiple skills -- yours and ones from trusted community repos -- to tackle it independently in parallel. You compare outputs side by side and pick the best parts.

Think of it like briefing three different agencies on the same project. You get three different takes. You decide what ships.

Also useful for **split testing** -- generate multiple variants of headlines, email copy, or ad creative, then plug the best ones into your testing tool.

### Install

```bash
# Add the marketplace and install the plugin
claude plugin marketplace add bwitlin/claude-skills
claude plugin install skill-battle@bwitlin-claude-skills
```

<details>
<summary>Manual install (alternative)</summary>

```bash
git clone https://github.com/bwitlin/claude-skills.git ~/.claude/local-plugins/claude-skills
mkdir -p ~/.claude/skills && ln -sf ~/.claude/local-plugins/claude-skills/skills/skill-battle ~/.claude/skills/skill-battle
```
</details>

> **Note:** The skill won't appear until your next Claude Code session. If `/skill-battle` doesn't work immediately, restart Claude Code.

### Usage

```
/skill-battle Write a creative brief for our new product launch
/skill-battle Draft 3 variants of cold outreach emails
/skill-battle Create landing page headline options for split testing
```

### What it does

1. **Captures your task** from the conversation or your prompt
2. **Discovers skills** -- scans your installed skills and searches trusted community repos (awesome-claude-code, awesome-claude-skills, superpowers, claude-plugins-official)
3. **Checks trust and risk** for external skills -- star count, last update, license, plus a doc review for scripts, file writes, network calls, and config changes
4. **You pick your fighters** -- choose which skills enter the battle
5. **Runs them all in parallel** -- each skill tackles the task independently
6. **Compares outputs** side by side with a summary of each skill's approach
7. **Cleans up** -- external skills installed for the battle can be kept or removed, per skill

### Before you use this

Skill-battle is fun and it works. Here are the things worth knowing before you go deep:

**Use it for the right stuff.** This is built for subjective work where different angles help: copy, briefs, strategy, outreach, positioning, split test variants. If there's one right answer (bug fix, migration, config change), just use the right skill directly.

**Each skill costs a full run.** Running 4 skills means 4x the tokens. For a creative brief, that's a few dollars well spent. For every task in your day, your bill will feel it.

**External skills are code from the internet.** Skill-battle checks star count, recency, and license. It reads the docs and flags what the skill does (scripts, file writes, API calls, config changes). You see the risk level before you install anything. But you are the last gate. If something looks off, don't install it.

**Clean up after yourself.** After a battle, the skill asks which external installs to keep and which to remove. The best performer is flagged. Keep the winners, remove the rest. Don't let skills pile up.

### Requirements

- Claude Code (CLI or Desktop)
- `gh` CLI for external skill trust assessment -- [install here](https://cli.github.com/)
- Subagent support (for parallel execution)

## License

MIT
