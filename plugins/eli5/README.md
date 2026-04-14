# /eli5

Explain Like I'm Five -- but not literally. Takes any concept and produces a single, self-contained HTML page that breaks it down with a concrete analogy, embedded CSS diagrams, layered detail, and curated links to go deeper. Opens in your browser.

The teaching approach is grounded in real pedagogy -- cognitive load theory, Gentner's structure mapping, and Vygotsky's scaffolding. Every analogy includes a "where this breaks down" note.

## Install

```bash
claude plugin marketplace add bwitlin/claude-skills
claude plugin install eli5@bwitlin-claude-skills
```

## Usage

```
/eli5 What is a blockchain and why do people care?
/eli5 explain machine learning to me
ELI5 what does async/await actually do?
What even is Kubernetes?     # triggers automatically
```

## What you get

A dark-mode HTML page with:

- **One-liner** -- the gist in a single sentence
- **Core analogy** -- a mini-story using something you already understand, with a "where this breaks down" note
- **Embedded visual** -- a CSS diagram showing structure or flow
- **More detail** -- real terminology tied back to the analogy, plus a misconception callout
- **Go deeper** -- 2-4 curated links with reasons why each is worth clicking

## Example outputs

| Photosynthesis | The Singularity |
|:-:|:-:|
| [View](../../examples/eli5-photosynthesis.html) | [View](../../examples/eli5-singularity.html) |

## License

MIT
