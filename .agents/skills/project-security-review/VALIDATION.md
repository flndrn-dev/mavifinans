# Validation — 23 October 2026

- YAML frontmatter and Codex metadata parsed successfully using Ruby YAML.safe_load; name, nonempty description, and enabled implicit invocation checked.
- Exact comparison passed: portable prompt includes the entire skill workflow unchanged.
- Bundled quick_validate.py could not run: both available Python environments lacked PyYAML. No dependencies were installed. The YAML parse above is an alternative structural check, not a claim that the bundled validator passed.
- Skill folder and name match; required SKILL.md exists, and the content has no unfinished scaffold placeholders.

## Manual scenario review

These are instruction-level walkthroughs by the author, not executed application tests, independent agent evaluations, or measured host behavior.

| Scenario | Expected decision supported by instructions |
| --- | --- |
| Cross-tenant read: logged-in tenant A supplies tenant B record ID; handler has no ownership filter and policy is absent | Trace the reachable path and check database guards; report static confirmation if complete, or suspected if policy is missing from supplied context. Use synthetic tenant A/B negative and permitted tests when authorised. Do not imply runtime proof without executing it. |
| Safe-code decoy: input passed as a bound query parameter | Trace parameterisation; dismiss injection rather than flagging user input or a query function alone. |
| Scanners unavailable | Continue code review, name unavailable checks, do not install tools automatically or claim scanner success. |
| No Git repository | Review session-changed or supplied files, state history unavailable, do not initialise Git. |
| Grok chat without tools | Review supplied material, request minimum missing server/policy context, label pasted scanner results as supplied evidence; do not claim local execution or independent agents. |

No live Codex/Claude/Grok installation or automatic invocation was tested. No application was scanned or modified. This package is not security certification and cannot guarantee enforcement after every edit.

## Verified Mavi Finans installation — 23 October 2026

The preceding sections record the package author's original validation. These checks were actually executed after installing it in this repository:

- All five supplied files were byte-verified immediately after the move. `SKILL.md`, the portable prompt, and `agents/openai.yaml` retain their original contents; project installation results were subsequently appended to these setup/validation documents.
- The official skill-creator `quick_validate.py` reported **Skill is valid!**, using `uv run --offline --with pyyaml python` and the bundled validator. The initial system-Python attempt lacked PyYAML; the isolated cached environment resolved that validation dependency.
- Ruby `YAML.safe_load` checked the metadata, default prompt, description length and enabled implicit invocation policy.
- The installed Codex app-server `skills/list` API, with `forceReload: true`, returned exactly this skill at the installed path with `enabled: true` and `scope: repo`, for both the project root and `apps/web-main`. The shared-daemon proxy check timed out; a temporary standalone stdio server completed the same read-only discovery successfully. No AI thread or turn was started.
- Gitleaks 8.30.1 found no secrets in the five-file skill or a snapshot of 106 tracked/untracked non-ignored repository files. Ignored local credentials, installed dependencies, build outputs and separate-app archives were excluded from the working-tree snapshot.
- Gitleaks scanned all nine locally available commits using `--log-opts=--all` and full redaction. The repository is shallow, so older/unfetched history was unavailable. Its single historical candidate was reproduced on an identifier-only Python function call containing no string or byte literals, and dismissed as a false positive. No ignore/suppression was added.
- Trivy 0.75.0 completed an offline vulnerability scan of the actual pnpm lockfile using its existing database, updated 2026-10-22 19:14:47 UTC. It reported 218 advisory records: 8 critical, 102 high, 99 medium, 9 low. These are version matches across the lockfile, including dependencies not shipped in the website. Matching the current local standalone build inventory narrowed this to 37 records, including five critical Next.js version matches; this is not proof of five exploitable website vulnerabilities.
- `npm test` passed all three existing validation tests. An isolated VM test of the actual Function handler and validators passed authentication, malformed/oversized input, immutable retry and same-email quota checks. It also confirmed that rotating email values bypasses the application-level quotas. Database/storage were in-memory doubles; no network, production credentials or real records were used.
- An independent read-only verifier traced the public submission path and checked the five critical Next.js advisories against maintainer sources and website configuration. Several advisory prerequisites are absent. No production exploit was attempted.

The installation is validated. The invoked website security review found existing application/dependency concerns; installing a skill does not remediate them or certify the website. Detailed findings and redacted scanner artifacts were kept locally under `/private/tmp/mavi-security-*`, not added to the public repository. Deployment OS/package state, live database grants, external perimeter controls, unprovided history and remaining advisory reachability were not exhaustively verified.
