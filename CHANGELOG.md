# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2026-04-15

### Changed
- `active-context-header` rule -- expanded from a simple skill label into a structured status line with explicit task states. The header now follows the grammar `> <Subject> in project <ProjectName> <verb phrase>` and uses five state templates (IN PROGRESS, COMPLETED + NEXT, PIVOT, WAITING, BLOCKED). Task phrases are capped at 8 words. Project name is derived from task context (not session root) so cross-project drift is visible. Skill transitions now use a three-line blockquote (switch line, skill description, narrative). Users on the previous version should re-copy `rules/active-context-header/active-context-header.md` to adopt the new format.

## [1.3.0] - 2026-04-14

### Added
- `confidence-signaling` rule -- explicit "I know" / "I think" / "I'm not sure" labels with evidence strength grading
- `execution-mode` rule -- action-first mode during workflows with frustration detection and walk-away tags

## [1.2.0] - 2026-04-14

### Added
- `anti-sycophancy` rule -- prevents Claude from flipping positions when challenged, requires defending reasoning or explaining what changed
- `skill-dispatch-protocol` rule -- three-tier routing for skill invocation (auto-invoke clear matches, present options for ambiguous, confirm destructive)
- `secret-file-protection` rule -- blocks reading .env, credential, key, and shell config files that contain secrets

## [1.1.0] - 2026-04-14

### Added
- `/eli5` skill -- explain any concept as a self-contained HTML page with analogies, CSS diagrams, and curated links
- `/skill-battle` skill -- run multiple skills on the same task in parallel and compare outputs side by side
- `active-context-header` rule -- visible status line showing which skill or mode is active
- Per-plugin README files for marketplace aggregators
- Rules section in README with manual install instructions
- `.gitignore` for eval result artifacts

### Changed
- Restructured repo to per-plugin pattern (`plugins/skill-name/`) for marketplace compatibility
- Updated marketplace.json with `$schema` and `metadata.description`
- Added `author` field to all plugin.json files
- Improved README with value-oriented description and rules documentation

## [1.0.1] - 2026-04-13

### Fixed
- Scoped feedback skill to current project (was reading cross-project git history)
- Clarified Context7 MCP as optional dependency
- Corrected install instructions in README

### Added
- `marketplace.json` for plugin marketplace support

## [1.0.0] - 2026-04-10

### Added
- `/feedback` skill -- structured 5/5/5 self-assessment with evidence-backed findings and trend tracking across sessions
- Fresh documentation lookup via optional Context7 MCP integration
