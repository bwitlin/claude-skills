---
name: skill-battle
description: |
  Run multiple skills on the same task in parallel and compare outputs side by side.
  A creative pitch room -- give it a brief, and it finds skills (local + trusted community repos)
  to work on it independently, then presents all outputs for comparison. Use when asked to
  "skill battle", "compare skills", "run multiple skills", "pitch room", "get different takes",
  "split test this", "give me options", or any request to see how different skills handle the
  same task. Great for generating variants for split testing -- headlines, email copy, ad
  creative. Best for subjective work where different perspectives add real value. Not useful
  for tasks with one right answer (bug fixes, migrations, config changes). Always use this
  skill instead of manually running skills one at a time when the user wants to compare outputs.
allowed-tools:
  - Agent
  - Bash
  - Read
  - Write
  - Glob
  - Grep
---

# Skill Battle

You are running a skill battle -- a creative pitch room where multiple skills independently
work on the same task, and the user compares the outputs to pick the best approach.

The process has seven phases: capture the task, find candidate skills, check external ones
for trust and risk, present options, run them in parallel, show results, and clean up.
The user has approval gates at key points -- nothing runs without their say-so.

## Phase 1: Task Capture

Extract the task from the conversation or the user's invocation argument.

If the task is clear from context:
- State it back: "Here's what I'll send to each skill: **[task statement]**. Want to adjust anything?"
- Wait for confirmation before proceeding.

If the task is ambiguous:
- Ask one clarifying question focused on the deliverable: "What's the output you want? (e.g., email copy, creative brief, landing page headline)"
- Don't over-interview. One question, then move.

The task statement should be self-contained -- each subagent will receive it without the surrounding
conversation context, so include any relevant details (audience, tone, constraints, product info).

## Phase 2: Skill Discovery

Search two sources in parallel:

### Local skills

Scan for installed skills:
```bash
# Find all SKILL.md files in common skill locations
find ~/.claude/skills/ -name "SKILL.md" 2>/dev/null
find ~/.claude/local-plugins/ -name "SKILL.md" 2>/dev/null
find ~/.claude/installed-plugins/ -name "SKILL.md" 2>/dev/null
```

For each skill found, read the `description` field from the YAML frontmatter. Keep skills
whose description suggests they could handle the user's task. Be generous in matching --
if a skill is even plausibly relevant, include it. The user will make the final call.

Skip skills that are clearly infrastructure/tooling (linters, deploy scripts, git hooks)
unless the task is specifically about those domains.

### External skills

Search these curated community repositories for additional candidates:

1. **awesome-claude-code** -- curated list of skills, plugins, and agent orchestrators
2. **awesome-claude-skills** -- 1,300+ community-contributed skills
3. **superpowers** -- 20+ agentic skills for advanced development
4. **claude-plugins-official** -- Anthropic-managed verified plugins

Use GitHub search to find skills in these repos:
```bash
# Search for skills related to the task in curated repos
gh search repos "claude skill [task-related keywords]" --limit 10
# Also search within known curated list repos for relevant entries
gh api repos/{owner}/{repo}/contents/ --jq '.[].name'
```

For external candidates, read the SKILL.md or README to understand what the skill does.
Collect the repo owner/name for trust assessment in Phase 3.

If no external candidates look relevant, that's fine -- say so and proceed with local only.

## Phase 3: Trust & Risk Assessment

This phase applies to **external skills only**. Installed skills skip this -- they're already
on the user's system.

### Trust signals

For each external candidate, gather these signals via `gh api`:

```bash
# Get repo metadata in one call
gh api repos/{owner}/{repo} --jq '{
  stars: .stargazers_count,
  pushed: .pushed_at,
  license: .license.spdx_id,
  owner_type: .owner.type,
  open_issues: .open_issues_count,
  description: .description
}'
```

### Minimum quality bar

Silently exclude any external skill that fails ANY of these:
- **Origin:** Must appear in one of the curated repos above OR have >= 100 stars
- **Recency:** Must have been updated within the last 6 months
- **License:** Must have an open-source license (MIT, Apache-2.0, etc.)

If a skill fails the bar, don't mention it. The user doesn't need to see every rejected option.

### Risk assessment

Read the external skill's SKILL.md and/or README. Evaluate these dimensions:

| Dimension | Low risk | Medium risk | High risk |
|-----------|----------|-------------|-----------|
| Structure | SKILL.md only (prompt instructions) | Has helper scripts in scripts/ | Has install scripts, build steps |
| File writes | No file operations | Writes to its own workspace | Writes to user directories |
| Dependencies | None | Uses standard tools (Bash, Read) | Installs npm/pip packages |
| Network | No external calls | Reads from public APIs | Sends data to external services |
| Git state | No git operations | Reads git history | Commits, pushes, or modifies branches |
| Config | No config changes | Reads config files | Modifies settings, env vars, system files |
| Tool requirements | Standard Claude Code tools | Needs specific MCP servers | Needs paid APIs or credentials |

Assign an overall risk level:
- **Low** -- prompt-only or uses standard tools, no file writes outside workspace, no network calls
- **Medium** -- has scripts or makes network calls, but nothing destructive. Flag what it does.
- **High** -- installs packages, modifies config, or sends data externally. Requires explicit user acknowledgment.

Summarize the risk in one line per skill. Be specific: "Low -- prompt-only, no scripts" is more
useful than just "Low."

## Phase 4: Candidate Presentation

Present all qualifying candidates (local + external that passed the quality bar) in a single table:

```
Candidates for this battle:

| # | Skill | Source | Trust | What it brings | Risk |
|---|-------|--------|-------|---------------|------|
| 1 | content-creation | Installed | -- | Marketing-optimized copy | -- |
| 2 | brand-voice:enforce | Installed | -- | Brand-consistent voice | -- |
| 3 | copywriter-pro | awesome-claude-skills -> @jdoe/copywriter-pro | ★ 340 · 5d ago · MIT | Direct response copy | Low -- prompt-only |
| 4 | seo-brief | awesome-claude-code -> @acme/seo-tools | ★ 1.2k · 2w ago · MIT | SEO-optimized briefs | Medium -- has scripts, calls API |

Which skills should enter the battle? (Pick numbers, e.g., "1, 3, 4" or "all")
```

Rules for the table:
- Installed skills show "--" for Trust and Risk columns (already on the system)
- External skills show: stars + last update + license in Trust, one-line risk summary in Risk
- "What it brings" should differentiate -- explain what makes this skill's approach different, not just restate its name
- If only local skills are available: "No external skills met the quality bar for this task. Here are your installed options:"
- Present 2-8 candidates total. If you find more, narrow to the most differentiated set.

Wait for the user to pick before proceeding.

## Phase 5: Install & Execution Plan

### Install external skills (if selected)

For each selected external skill:
1. State what you're about to install and from where
2. Wait for user confirmation
3. Clone/download the skill to a temporary location
4. Verify the SKILL.md exists and is readable

```bash
# Example install to temp location
git clone --depth 1 https://github.com/{owner}/{repo}.git /tmp/skill-battle-install/{skill-name}
```

### Present the execution plan

Before launching anything, show exactly what will happen:

```
Battle plan:

| Skill | Gets this task | Output saved to |
|-------|---------------|-----------------|
| content-creation | [task statement] | skill-battle-workspace/content-creation/output.md |
| copywriter-pro | [task statement] | skill-battle-workspace/copywriter-pro/output.md |
| seo-brief | [task statement] | skill-battle-workspace/seo-brief/output.md |

Each skill runs independently -- they can't see each other's work.
Ready to launch?
```

Wait for the user to approve.

## Phase 6: Parallel Execution

Create the workspace directory, then launch all selected skills as parallel subagents in a
single message (one Agent tool call per skill):

```bash
mkdir -p skill-battle-workspace/{skill-name}/
```

Each subagent prompt should follow this template:

```
You are completing a task using a specific skill. Read the skill instructions first,
then execute the task. Save your final output to the specified path.

Skill path: {path-to-SKILL.md}
Task: {task statement from Phase 1}
Output path: skill-battle-workspace/{skill-name}/output.md

Instructions:
1. Read the SKILL.md at the skill path above
2. Follow its instructions to complete the task
3. Write your final deliverable to the output path
4. Focus on quality -- this output will be compared against other skills' outputs
```

For installed skills, point to their installed path. For external skills, point to the
temp install location.

Launch ALL subagents in a single message so they run in parallel. Do not wait for one
to finish before starting the next.

While waiting for results, you can tell the user: "All skills are running in parallel.
I'll present the results once they're all done."

## Phase 7: Results & Cleanup

### Present results

Once all subagents complete:

1. Read all output files from the workspace
2. Present a summary comparison:

```
Battle results:

| Skill | Approach | Standout strength |
|-------|----------|-------------------|
| content-creation | [1-line summary of their approach] | [what this one did best] |
| copywriter-pro | [1-line summary] | [what this one did best] |
| seo-brief | [1-line summary] | [what this one did best] |
```

3. Offer to show each full output: "Want to read the full output from any of these? (e.g., 'show me 1 and 3')"

4. Help the user decide:
   - If the user likes parts of multiple outputs: offer to synthesize the best elements
   - If one output is clearly strongest: say so, but let the user decide
   - If the user wants to iterate: offer to re-run a specific skill with adjusted instructions
   - If the user is split testing (A/B testing headlines, email variants, ad copy): present outputs as named variants (Variant A, Variant B, etc.) ready to plug into their testing tool

### Cleanup

If any external skills were installed for this battle, present a per-skill cleanup menu:

```
You installed 2 external skills for this battle:

| Skill | Performance | Recommendation |
|-------|------------|----------------|
| copywriter-pro | ★ Strongest output | Keep -- earned its place |
| seo-brief | Solid but 3rd | Remove -- local skills covered this |

Keep or remove each? (e.g., "keep 1, remove 2" or "remove all")
```

Rules:
- Flag the standout performer with ★ if an external skill produced the best output
- Suggest keeping winners, removing the rest -- but the user decides per-skill
- If the user says "remove all" or "keep all," respect that
- Uninstall removed skills: `rm -rf /tmp/skill-battle-install/{skill-name}`
- Clean up the workspace: `rm -rf skill-battle-workspace/`
- Confirm cleanup: "Cleaned up. [Kept: copywriter-pro. Removed: seo-brief. Workspace cleared.]"

If no external skills were installed, skip cleanup and just remove the workspace.

## Important notes

**Token cost awareness:** Each skill in the battle is a full subagent run. Before launching,
if the user selected 4+ skills, mention: "Heads up -- running N skills in parallel means N
separate runs. That's more tokens than a single skill. Good to go?"

**Subagent isolation:** Each subagent runs independently. They cannot see each other's work
or the main conversation beyond the task statement. This is by design -- you want unbiased,
independent takes.

**Scope check:** If the task has one objectively correct answer (fix a bug, run a migration,
format a config file), gently redirect: "Skill battles work best for subjective tasks where
different perspectives add value. For this task, I'd recommend just using [specific skill]
directly. Want to do that instead?"

**No auto-ranking:** Do not declare a "winner" unless one output is clearly and obviously
superior. Subjective work is subjective -- present the differences and let the user judge.
Your job is to surface what makes each output distinct, not to pick favorites.
