# /skill-battle

A creative pitch room for Claude Code. Give it a task, and it finds multiple skills -- yours and ones from trusted community repos -- to tackle it independently in parallel. You compare outputs side by side and pick the best parts.

Also useful for **split testing** -- generate multiple variants of headlines, email copy, or ad creative, then plug the best ones into your testing tool.

## Install

```bash
claude plugin marketplace add bwitlin/claude-skills
claude plugin install skill-battle@bwitlin-claude-skills
```

## Usage

```
/skill-battle Write a creative brief for our new product launch
/skill-battle Draft 3 variants of cold outreach emails
/skill-battle Create landing page headline options for split testing
```

## What it does

1. **Captures your task** from the conversation or your prompt
2. **Discovers skills** -- scans your installed skills and searches trusted community repos
3. **Checks trust and risk** for external skills -- star count, last update, license, plus a doc review
4. **You pick your fighters** -- choose which skills enter the battle
5. **Runs them all in parallel** -- each skill tackles the task independently
6. **Compares outputs** side by side with a summary of each skill's approach
7. **Cleans up** -- external skills installed for the battle can be kept or removed

## Requirements

- Claude Code (CLI or Desktop)
- `gh` CLI for external skill trust assessment -- [install here](https://cli.github.com/)
- Subagent support (for parallel execution)

## License

MIT
