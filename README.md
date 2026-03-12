# Claude Code

![](https://img.shields.io/badge/Node.js-18%2B-brightgreen?style=flat-square) [![npm]](https://www.npmjs.com/package/@anthropic-ai/claude-code)

[npm]: https://img.shields.io/npm/v/@anthropic-ai/claude-code.svg?style=flat-square

Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows -- all through natural language commands. Use it in your terminal, IDE, or tag @claude on Github.

**Learn more in the [official documentation](https://code.claude.com/docs/en/overview)**.

<img src="./demo.gif" />

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org)
- **An Anthropic API key** — [Get one here](https://console.anthropic.com)
- **OS:** macOS 10.15+, Linux, or Windows 10/11

## API Key Setup

Set your API key as an environment variable before running Claude Code:

**MacOS/Linux:**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

To persist it, add the line above to your `~/.bashrc`, `~/.zshrc`, or equivalent shell config file.

**Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY="sk-ant-..."
```

To persist it on Windows, run:
```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY","sk-ant-...","User")
```

> [!TIP]
> You can also create a `.env` file in your project root with `ANTHROPIC_API_KEY=sk-ant-...` and Claude Code will pick it up automatically.

## Get started
> [!NOTE]
> Installation via npm is deprecated. Use one of the recommended methods below.

For more installation options, uninstall steps, and troubleshooting, see the [setup documentation](https://code.claude.com/docs/en/setup).

1. Install Claude Code:

    **MacOS/Linux (Recommended):**
    ```bash
    curl -fsSL https://claude.ai/install.sh | bash
    ```

    **Homebrew (MacOS/Linux):**
    ```bash
    brew install --cask claude-code
    ```

    **Windows (Recommended):**
    ```powershell
    irm https://claude.ai/install.ps1 | iex
    ```

    **WinGet (Windows):**
    ```powershell
    winget install Anthropic.ClaudeCode
    ```

    **NPM (Deprecated):**
    ```bash
    npm install -g @anthropic-ai/claude-code
    ```

2. Navigate to your project directory and run `claude`.

## IDE Integration

Claude Code integrates directly with popular editors, letting you run it from an embedded terminal with full access to your project context.

### VS Code / VS Code-based editors (Cursor, Windsurf)

1. Open the integrated terminal (`Ctrl+`` ` or **Terminal → New Terminal**)
2. Run `claude` — Claude Code will automatically detect the open file and workspace

For the best experience, install the **Claude Code extension** from the VS Code Marketplace, which adds inline diff views and accepts/rejects directly in the editor.

### JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.)

1. Open the built-in terminal (**View → Tool Windows → Terminal**)
2. Run `claude`

### Neovim / Vim

Run Claude Code in a split terminal:

```vim
:split | terminal claude
```

Or use a terminal multiplexer like `tmux` alongside your editor session.

### General tips

- Run `claude` from your **project root** so it can index your full codebase
- Use `claude --print` to get a one-shot response without entering interactive mode
- Pass a file directly: `claude "explain this file" src/index.ts`

## Plugins

This repository includes several Claude Code plugins that extend functionality with custom commands and agents. See the [plugins directory](./plugins/README.md) for detailed documentation on available plugins.

## Reporting Bugs

We welcome your feedback. Use the `/bug` command to report issues directly within Claude Code, or file a [GitHub issue](https://github.com/anthropics/claude-code/issues).

## Connect on Discord

Join the [Claude Developers Discord](https://anthropic.com/discord) to connect with other developers using Claude Code. Get help, share feedback, and discuss your projects with the community.

## Data collection, usage, and retention

When you use Claude Code, we collect feedback, which includes usage data (such as code acceptance or rejections), associated conversation data, and user feedback submitted via the `/bug` command.

### How we use your data

See our [data usage policies](https://code.claude.com/docs/en/data-usage).

### Privacy safeguards

We have implemented several safeguards to protect your data, including limited retention periods for sensitive information, restricted access to user session data, and clear policies against using feedback for model training.

For full details, please review our [Commercial Terms of Service](https://www.anthropic.com/legal/commercial-terms) and [Privacy Policy](https://www.anthropic.com/legal/privacy).
