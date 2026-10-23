# Add project-security-review to your projects

This package is independent of Cyber Bear. It contains instructions, not an installed scanner or a background enforcement service. No project or personal settings were changed by creating it.

## Inside a codebase

Copy the complete `project-security-review` folder into the appropriate location in your chosen codebase:

| Assistant | Resulting file inside your codebase |
| --- | --- |
| Codex | `.agents/skills/project-security-review/SKILL.md` |
| Claude Code | `.claude/skills/project-security-review/SKILL.md` |

If you use both tools, copy it into both locations and keep the copies in sync. Preserve any existing same-named skill; compare and merge deliberately rather than replacing it. Commit these files if you want teammates to receive them. The `agents/openai.yaml` file provides Codex metadata; other hosts can ignore it.

For coding sessions, append the following instruction to your existing `AGENTS.md` for Codex and `CLAUDE.md` for Claude Code. Preserve everything already there. You can instead give the instruction at the beginning of each coding chat:

> Use the project-security-review skill during coding and after each completed code change, before reporting the work ready. Run available secret and dependency checks, review the changed code and affected trust boundaries, verify findings within the authorised local environment, and report failed, skipped, or unavailable checks. Preserve project permissions and approval requirements.

Explicit invocation:

- Codex: `Use $project-security-review while implementing this change and review each completed change before finishing.`
- Claude Code: `/project-security-review` followed by your coding request, or ask it in plain language to use the skill throughout the task.

Start a new session after copying the files and confirm the skill appears in the host's skill selector or ask the assistant to read it. Automatic selection is enabled, but skills are model instructions: they do not guarantee a check runs after every edit. The standing instruction above makes the intended coding workflow explicit. Deterministic enforcement would require separately authorised hooks or CI, which this package does not add.

## Personal installation for all codebases

Instead of project copies, use these personal locations on each machine:

- Codex: `~/.agents/skills/project-security-review/SKILL.md`
- Claude Code: `~/.claude/skills/project-security-review/SKILL.md`

Copy the whole skill folder, not just its contents into the skills root. Avoid unnecessary duplicate personal and project installations. Personal installation makes the skill available across local projects; the standing coding instruction can still be supplied per session or appended to existing host-specific personal instructions. Local installation does not automatically propagate to cloud environments or other machines.

## Grok and ordinary chat

Paste `PORTABLE-PROMPT.txt` into the beginning of the coding conversation, then supply your task and relevant code. This also works as a fallback in Claude or Codex chat. If your Grok-based coding host supports skill files, load this same `SKILL.md` through that host's documented mechanism; no Grok-specific skill directory is assumed.

For chat without repository or terminal access, supply relevant changed code, server-side guards, synthetic tests, and redacted scanner results. The assistant must distinguish supplied evidence from checks it performed. It cannot scan your local files just because the prompt mentions scanners.

## Verify the installation

Ask: "Use project-security-review for this change. Confirm which skill file you loaded and which scanners, history, tests, and independent verification are actually available."

Check that the assistant identifies the intended file, reviews real changed code, and explicitly reports unavailable checks. Installation alone does not install Gitleaks, Trivy, or any other tool. Have missing tools configured separately if desired.

## Sources

Inspired by the user-supplied transcript for https://www.youtube.com/watch?v=O9N6D4iTYpM. This is an original provider-neutral adaptation, not an official Cloudflare skill or a reproduction of the video's benchmarks.

Installation locations checked on 23 October 2026:
- Codex: https://developers.openai.com/codex/skills (redirects to https://learn.chatgpt.com/docs/build-skills).
- Claude Code: https://code.claude.com/docs/en/skills.

## Mavi Finans project installation

Installed in this repository at `.agents/skills/project-security-review/SKILL.md`. The original nested package was flattened; its skill instructions, Codex metadata, portable prompt, and setup/validation documents were preserved. Root `AGENTS.md` supplies the standing coding instruction above. `.dockerignore` excludes `.agents/` from website images.

Invoke it with `Use $project-security-review to audit this website`, or `Use $project-security-review while implementing this change, and review the result before finishing`. It is available from both the repository root and `apps/web-main`. A new coding session loads the new root guidance; if a skill selector is stale, restart the session.

The installed workflow is instruction-based and requires no application credentials or new production service. Gitleaks 8.30.1 and Trivy 0.75.0 were already present. The bundled skill validator was run successfully with cached PyYAML in an isolated uv environment; no project runtime dependency or global Python environment was changed.
