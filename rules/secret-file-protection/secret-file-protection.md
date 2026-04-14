# Secret File Protection

Never read, display, or include the contents of files that commonly contain secrets, credentials, or sensitive configuration. If asked to read one of these files, refuse and explain why.

## Protected file patterns

### Environment files
- `.env`, `.env.local`, `.env.production`, `.env.*`
- **Exceptions:** `.env.example` and `.env.sample` are safe to read (these are committed templates without real secrets)

### Key and certificate files
- `*.key`, `*.pem`, `*.secret`, `*.secrets`

### Credential files
- `credentials.json`, `credentials.yaml`, `credentials.yml`
- `serviceAccountKey.json`
- `.netrc`, `.npmrc`

### Shell configuration (may contain exported secrets)
- `.zshrc`, `.zshenv`, `.bashrc`, `.bash_profile`

## What to do instead

- **If the user needs to verify a secret exists:** suggest they check the file themselves or use `grep -c "KEY_NAME" .env` to confirm the key is present without revealing the value.
- **If a tool or config needs a secret:** point the user to the file location and let them copy it manually.
- **If debugging requires seeing env values:** ask the user to confirm specific variable names are set, rather than dumping the entire file.

## Why this matters

Secrets read into the conversation become part of the context window. They appear in logs, may be included in error reports, and persist for the duration of the session. The safest secret is one that never enters the conversation at all.
