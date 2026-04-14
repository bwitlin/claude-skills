# Contributing

Thanks for your interest in contributing to claude-skills. This guide covers how to add a new skill, rule, or improvement.

## Adding a skill

### 1. Create the plugin directory

```
plugins/
  your-skill-name/
    .claude-plugin/
      plugin.json
    skills/
      your-skill-name/
        SKILL.md
    README.md
```

### 2. Write plugin.json

```json
{
  "name": "your-skill-name",
  "description": "One-line description of what the skill does",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

### 3. Write SKILL.md

This is the skill itself. It needs YAML frontmatter at the top:

```yaml
---
name: your-skill-name
description: >
  When and how Claude should invoke this skill. Be specific about trigger
  phrases and use cases.
---
```

The body is the prompt that Claude follows when the skill is invoked. Write it as clear instructions.

### 4. Write a plugin README.md

A standalone README inside your plugin directory. Include:
- What the skill does (1-2 paragraphs)
- Install command: `claude plugin install your-skill-name@bwitlin-claude-skills`
- Usage examples
- Any requirements or dependencies
- License (MIT)

### 5. Register in marketplace.json

Add an entry to `.claude-plugin/marketplace.json`:

```json
{
  "name": "your-skill-name",
  "source": "./plugins/your-skill-name",
  "description": "Same one-liner from plugin.json",
  "version": "1.0.0",
  "keywords": ["relevant", "search", "terms"],
  "category": "productivity"
}
```

Categories used so far: `productivity`, `education`.

### 6. Update the root README

- Add a row to the Skills table
- Add a detail section with usage, examples, and any requirements
- Update the skills count badge

### 7. Update CHANGELOG.md

Add an entry under a new version describing what you added.

## Adding a rule

Rules can't be distributed via the plugin system yet. Place them in `rules/`:

```
rules/
  your-rule-name/
    your-rule-name.md
    README.md
```

The README should include manual install instructions (copy to `.claude/rules/` or `~/.claude/rules/`). Add a row to the Rules table in the root README.

## Quality expectations

- **Each skill should do one thing well.** If it does three things, it might be three skills.
- **Write the SKILL.md as if you're briefing a smart colleague.** Clear instructions, specific trigger phrases, concrete examples.
- **Include usage examples in the README.** Show the slash command with real arguments.
- **Test it.** Run the skill in Claude Code before submitting. If it doesn't work on first try, fix it.
- **No external dependencies unless necessary.** If a skill needs an MCP server or CLI tool, document it clearly and make it optional where possible.

## Submitting

1. Fork the repo
2. Create a branch (`feat/your-skill-name`)
3. Follow the structure above
4. Open a PR with a description of what the skill does and why it's useful

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
