# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is the official public repository for Claude Code — a documentation, examples, and plugins repo. It contains no application source code or build system. The Claude Code binary itself is closed-source and distributed separately.

## Structure

- **`plugins/`** — 13 official plugins, each with commands, agents, skills, and hooks
- **`examples/`** — Reference hook implementations and settings configurations
- **`scripts/`** — GitHub issue/PR automation scripts (TypeScript + shell)
- **`.devcontainer/`** — Docker dev environment with network isolation via iptables
- **`.github/workflows/`** — CI/CD for issue triage and deduplication using Claude

## Plugin Architecture

Each plugin lives in `plugins/<name>/` and follows this structure:

```
plugins/<name>/
├── .claude-plugin/plugin.json   # Plugin manifest (name, version, description)
├── commands/                    # Slash commands (SKILL.md files)
├── agents/                      # Autonomous agents (SKILL.md files)
├── skills/                      # Reusable skills (SKILL.md files)
└── hooks/                       # Event hooks (PreToolUse, PostToolUse, Stop, SessionStart)
```

All skill/command/agent files use SKILL.md with YAML frontmatter. Key frontmatter fields: `name`, `description`, `argument-hint`, `disable-model-invocation`, `allowed-tools`, `context`, `agent`.

The plugin marketplace registry is at `.claude-plugin/marketplace.json`.

## Settings Examples

`examples/settings/` contains three reference `settings.json` configurations:
- `settings-lax.json` — minimal restrictions
- `settings-strict.json` — enterprise-grade, maximum restrictions
- `settings-bash-sandbox.json` — sandboxed bash execution

## DevContainer

The devcontainer (`node:20` base) runs Claude Code in an isolated environment with:
- Network sandboxing via `init-firewall.sh` (iptables/ipset whitelisting)
- ZSH + Powerlevel10k shell
- GitHub CLI (`gh`) pre-installed
- Persistent volumes for bash history and Claude config at `/home/node/.claude`

Useful for running Claude Code with `--dangerously-skip-permissions` in a safe context.

## Scripts

Scripts in `scripts/` are GitHub automation tools (TypeScript) run via GitHub Actions workflows in `.github/workflows/`. They handle issue deduplication, triage, lifecycle management, and PR automation — all Claude-powered.

## Key Plugins

| Plugin | Primary Command/Use |
|--------|-------------------|
| `feature-dev` | `/feature-dev` — 7-phase feature workflow with parallel agents |
| `code-review` | `/code-review` — multi-agent PR review with confidence scoring |
| `plugin-dev` | `/plugin-dev:create-plugin` — guided 8-phase plugin creation |
| `commit-commands` | `/commit`, `/commit-push-pr` — git workflow automation |
| `hookify` | Generate hooks from conversation analysis |
| `pr-review-toolkit` | 6 specialized PR review agents |
| `security-guidance` | PreToolUse hook for security pattern warnings |
| `ralph-wiggum` | Iterative autonomous loop execution |
