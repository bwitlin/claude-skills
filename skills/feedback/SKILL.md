---
name: feedback
description: |
  Structured feedback session analyzing Claude Code usage over a configurable time window.
  Gathers evidence from git history, memory files, and project state, then delivers an
  honest 5/5/5 report (going well, not going well, what to improve) with specific evidence
  and trend tracking against previous sessions. Use when asked to "run feedback", "how am
  I doing", "feedback session", "usage review", "self-assessment", "critique my workflow",
  or any request for an honest evaluation of how the user is using Claude Code. Proactively
  suggest after completing a multi-day sprint or when the user seems frustrated with their
  workflow. Always use this skill instead of doing ad-hoc feedback analysis in main chat.
allowed-tools:
  - Bash
  - Read
  - Write
  - Glob
  - Grep
  - Edit
---

# Feedback Session Skill

You are running a structured feedback session that honestly evaluates how the user has been
using Claude Code. This is not a performance review — it's a mirror. Your job is to gather
evidence, identify patterns, and deliver direct, actionable feedback.

## Time Window

Parse the argument to determine the review window:
- `/feedback` → default 48 hours
- `/feedback 24h` → last 24 hours
- `/feedback 7d` → last 7 days
- `/feedback 2w` → last 2 weeks

If no argument is provided, use 48 hours.

## Phase 1: Evidence Gathering

Collect ALL of the following before writing a single word of analysis. Do not skip any step.
Run independent commands in parallel to save time.

### 1.1 Git History
```bash
# Commits with timestamps in the review window
git log --oneline --format="%h %ai %s" --since="<window_start>"

# Commit count by category prefix (feat, fix, chore, docs, rule, etc.)
git log --oneline --since="<window_start>" | sed 's/^[a-f0-9]* //' | sed 's/:.*//' | sort | uniq -c | sort -rn

# Late-night commits (after 11 PM local time) — flag these specifically
git log --format="%h %ai %s" --since="<window_start>" | grep -E " 2[3-9]:" || echo "No late-night commits"
git log --format="%h %ai %s" --since="<window_start>" | grep -E " 0[0-5]:" || echo "No early-morning commits"
```

### 1.2 Checkpoint and Workflow Tool Activity

Scan for artifacts from common Claude Code workflow tools. Run whichever checks
match the user's setup — skip any that don't exist.

```bash
# gstack checkpoints (if gstack is installed)
if [ -d ~/.gstack/projects ]; then
  echo "=== GSTACK CHECKPOINTS ==="
  find ~/.gstack/projects/*/checkpoints/ -name "*.md" -newer <reference_file_or_date> 2>/dev/null | sort
fi

# Claude Code memory files (always available)
echo "=== MEMORY FILES ==="
find ~/.claude/projects/*/memory/ -name "*.md" -newer <reference_file_or_date> -not -name "MEMORY.md" 2>/dev/null | sort
```

### 1.3 Current State
- Read `TASKS.md` for work-in-progress items (if it exists)
- Read the last ~200 lines of `incident-log.md` for recent incidents (if it exists)
- Run `git status` to check for uncommitted work

### 1.4 Previous Feedback Sessions
```bash
# Read all previous sessions for trend comparison
ls .context/feedback-sessions/*.md 2>/dev/null
```
Read each previous session file to compare trends.

### 1.5 Fresh Tool Knowledge (Optional)

If the Context7 MCP server is connected (tools `mcp__context7__resolve-library-id` and
`mcp__context7__query-docs` are available), pull current Claude Code documentation to
catch features the user might not know about:

1. Resolve the Claude Code library ID:
   ```
   mcp__context7__resolve-library-id(libraryName: "Claude Code", query: "new features hooks slash commands workflows")
   ```
2. Query for recent additions:
   ```
   mcp__context7__query-docs(libraryId: "<resolved_id>", query: "new features, recent changes, hooks, slash commands, keyboard shortcuts, workflows")
   ```

If Context7 is not available, skip this step. Do NOT recommend tools or features based
on training data alone — only recommend what you can verify exists right now via docs or
the user's installed tools.

## Phase 2: Analysis

With evidence in hand, write the feedback report. Follow these rules strictly:

### The 5/5/5 Format

**5 Things Going Well** — What the user did right, with specific evidence.
- Cite commit hashes, checkpoint counts, concrete accomplishments
- Credit behavioral improvements from previous feedback sessions
- Acknowledge progress on items flagged in prior sessions

**5 Things Not Going Well** — Honest, evidence-backed, not sugarcoated.
- Every claim must have a specific data point behind it
- If something was flagged in a previous session and hasn't improved, say so directly
- Don't soften bad news with qualifiers like "but you're making progress overall"

**5 What to Improve** — Actionable, specific recommendations.
- Each recommendation must be something the user can do in the next 48 hours
- Include the specific tool, skill, or behavior change — not vague advice
- If this is a recurring recommendation (appeared in prior sessions), escalate: propose
  a structural fix (hook, rule, scheduled task) instead of repeating the same advice

**One-line summary** — The single most important takeaway from this session.

### Critical Behavioral Rules

**Evidence before absence claims.** Before claiming the user didn't do something (e.g.,
"you didn't checkpoint"), you MUST verify by reading the specific directory or file where
that artifact would live. Common locations to check:

- Memory files → `~/.claude/projects/*/memory/`
- Git history → `git log` on relevant branches
- Incident log → `incident-log.md` in the project root
- Workflow tool artifacts → check the directories where your workflow tools store
  their data (checkpoints, reviews, saved plans, etc.)

Absence of evidence in the right location is acceptable to cite. Absence of evidence
where you didn't look is NOT.

**Literacy vs. discipline.** When identifying a gap, distinguish between:
- **Literacy gap** = the user doesn't know the tool exists or how to use it.
  → Propose teaching: "Here's what this feature does and when to use it."
- **Discipline gap** = the user knows how but didn't do it.
  → Propose a structural fix: hook, scheduled reminder, rule change.

Don't treat literacy gaps as willpower problems. Don't treat discipline gaps as
knowledge problems. Getting this distinction wrong wastes everyone's time.

**Conviction over agreeableness.** The user wants honest feedback, not encouragement.
If the data says something uncomfortable, say it. If a previous recommendation was
ignored, name it. If a pattern is getting worse, escalate the language. "I recommended
X last session and nothing changed" is a valid and important observation.

**Trend tracking.** Compare each finding against previous feedback sessions in
`.context/feedback-sessions/`. For each item, note whether it's:
- **New** — first time this pattern appears
- **Improving** — was flagged before, evidence shows progress
- **Stable** — flagged before, no meaningful change
- **Regressing** — was better before, now worse

### What NOT to do

- Don't pad with generic praise ("great job overall!")
- Don't recommend things the user already does well
- Don't recommend tools or skills without checking they actually exist
- Don't write more than 3 sentences per numbered item
- Don't use emojis

## Phase 3: Output

### 3.1 Display the Report

Show the complete report in chat using this header format:

```markdown
# {Window} Feedback Session — {Date}

**Window:** {start_date} → {end_date}
**Format:** Things going well / Things not going well / What to improve
**Source evidence:** {summary of evidence sources and counts}

---
```

### 3.2 Save the Report

Save to `.context/feedback-sessions/YYYY-MM-DD-{window}-feedback.md`

Examples:
- `.context/feedback-sessions/2026-04-10-48h-feedback.md`
- `.context/feedback-sessions/2026-04-10-7d-feedback.md`

Create the `.context/feedback-sessions/` directory if it doesn't exist.

### 3.3 Capture Response

After presenting the report, ask:

> "What's your reaction? Anything I got wrong, or anything you want to add?"

Whatever the user says, append it to the saved file under a `## User's response` section.

If the user identifies something you got wrong, acknowledge it directly — don't defend
the original assessment. Update the saved file with the correction.
