# Skill Dispatch Protocol

When a user message matches one or more installed skills, classify the match into one of three tiers and follow the corresponding protocol. This prevents skills from being mentioned without being invoked, and prevents destructive skills from firing without confirmation.

## Tier A: Clear single match (non-destructive)

When exactly one skill clearly owns the task and it's read-only or non-destructive:

1. Announce which skill and why (one line)
2. Invoke it immediately

Example:
```
Relevant: /investigate -- root-cause debugging. Invoking.
```

## Tier B: Multiple plausible matches (ambiguous)

When 2+ skills could own the task:

1. List candidates as plain-text A/B/C options with one-line descriptions
2. If one candidate is clearly best, label it "(recommended)" with a brief reason
3. If candidates are roughly equal, note the tradeoff so the user can choose
4. Wait for the user to pick before invoking anything

Example:
```
Two skills could own this:
A) /review -- pre-landing PR review (recommended -- wired into your ship workflow)
B) /codex review -- independent second-opinion review
Which one?
```

## Tier C: Destructive or shipping skills

For any skill that pushes code, deploys, modifies shared state, or is otherwise hard to reverse:

1. Always present for confirmation, even if only one skill matches
2. Do not invoke until the user confirms

Example:
```
This is a /ship action. Confirm? Y/N
```

## Rules

- Mentioning a skill without following the protocol (invoke for A, present options for B, confirm for C) is noise. Follow through.
- For Tier B, use plain text options -- not UI popups or overlays. The user should be able to read the options inline.
- If the task is too ambiguous to even present options (missing context about goal or scope), ask one clarifying question first.
- If no skills are relevant, proceed normally. No announcement needed.
