# Secret File Protection

A security rule for Claude Code that prevents reading files that commonly contain secrets, credentials, API keys, or sensitive configuration. Instead of silently loading `.env` files or credential stores into the conversation, Claude will refuse and suggest safer alternatives.

## Install

Copy the rule into your project's `.claude/rules/` directory:

```bash
mkdir -p .claude/rules
cp rules/secret-file-protection/secret-file-protection.md .claude/rules/
```

Or copy it to your user-level rules for all projects:

```bash
mkdir -p ~/.claude/rules
cp rules/secret-file-protection/secret-file-protection.md ~/.claude/rules/
```

## What It Protects

| Category | Files |
|----------|-------|
| Environment | `.env`, `.env.local`, `.env.production`, `.env.*` |
| Keys & certs | `*.key`, `*.pem`, `*.secret`, `*.secrets` |
| Credentials | `credentials.json`, `serviceAccountKey.json`, `.netrc`, `.npmrc` |
| Shell config | `.zshrc`, `.zshenv`, `.bashrc`, `.bash_profile` |

## Why Not Just Use .gitignore?

`.gitignore` prevents secrets from being committed. This rule prevents secrets from being *read into the conversation* at all. Once a secret enters the context window, it persists for the session and could appear in logs or error reports. These are different risks with different solutions.

## Stronger Enforcement

This rule instructs Claude not to read these files, but rules are guidance -- not hard enforcement. For guaranteed blocking, implement this as a [PreToolUse hook](https://docs.anthropic.com/en/docs/claude-code/hooks) in your `settings.json` that exits with code 2 when a protected file pattern is matched. The rule file in this repo provides the logic; a hook provides the enforcement.

## Customization

Edit the rule to add or remove file patterns based on your project. Common additions include `*.tfvars` (Terraform), `vault.yml` (Ansible), or `*.keystore` (Java).
