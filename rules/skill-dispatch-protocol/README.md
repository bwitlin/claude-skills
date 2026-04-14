# Skill Dispatch Protocol

A routing rule for Claude Code that structures how Claude decides which skill to invoke when a user message matches one or more installed skills. Uses a three-tier system: auto-invoke clear matches, present options for ambiguous matches, and require confirmation for destructive actions.

Without this rule, Claude may mention a relevant skill without invoking it, invoke a destructive skill without asking, or silently pick one skill when several could apply. This rule makes the routing decision explicit and predictable.

## Install

Copy the rule into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp rules/skill-dispatch-protocol/skill-dispatch-protocol.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp rules/skill-dispatch-protocol/skill-dispatch-protocol.md ~/.claude/rules/
```

## The Three Tiers

| Tier | When | What happens |
|------|------|-------------|
| **A** | One clear match, non-destructive | Announce + invoke immediately |
| **B** | 2+ plausible matches | Present options, wait for user pick |
| **C** | Destructive or shipping action | Present for confirmation, wait for Y/N |

## When To Use This

This rule becomes valuable when you have 5+ skills installed. With only a few skills, routing is obvious. Once you're running a dozen skills across productivity, engineering, design, and shipping workflows, the ambiguity grows fast. This rule prevents Claude from guessing wrong or going silent when it should be acting.

## Customization

Edit the rule to adjust which skills count as "destructive" (Tier C). By default, the rule targets skills that push code, deploy, or modify shared state. You may want to add or remove skills from this category based on your workflow.
