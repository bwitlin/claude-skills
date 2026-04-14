# Active Context Header

Every response must begin with a context status line before any other text. This line uses blockquote style and tells the user which skill, mode, or context is currently active.

## Format

- No skill or mode active: `> Claude`
- Active skill or mode: `> /skill-name`
- Transition between skills: `> **Switching** from **/skill-a** to **/skill-b**`

The status line appears first, on its own line, before the response body. Just the name, nothing extra.

## Transition Annotations

On skill transitions only, include a second blockquote line with the skill name bolded and an italic description of what it does. This does NOT appear on every message, only when switching:

`> **/skill-name** -- *One-sentence description of what the skill does.*`

## Examples

Transition:

```
> **Switching** from **/code-review** to **/debug**
> **/debug** -- *Structured debugging with root cause investigation.*
```

Steady state (no skill active):

```
> Claude
```

Active skill (no transition):

```
> /code-review
```
