---
name: git-pr
description: "Create pull requests that follow the repository's PR template, with labels, reviewers and CI readiness."
source: community
allowed-tools: "*"
user-invocable: true
---

# Git PR Manager

Create, enhance, and manage pull requests with proper descriptions, labels, and review assignments.

## STEP 1: ANALYZE BRANCH

Examine the current branch:

- Find the base branch: the one the user named, otherwise the repository's default (`gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`)
- List all commits in the branch
- Summarize the changes by file and type
- Check if CI/tests pass
- Verify the branch is pushed to remote

## STEP 2: FIND THE PR TEMPLATE

`gh pr create --body` and `--body-file` ignore the repository's PR template, so read it yourself before writing the description. Look in the repository root, `.github/` and `docs/` for `pull_request_template.md` (any letter case), and in a `PULL_REQUEST_TEMPLATE/` folder in those places for several templates:

```bash
git ls-files | grep -iE '^(\.github/|docs/)?pull_request_template(\.md|/[^/]+\.md)$'
```

- **One template:** use it.
- **Several templates** (a `PULL_REQUEST_TEMPLATE/` folder): pick the one that matches the change (bug fix, feature, release). Ask the user only when none clearly fits.
- **None in the repository:** GitHub falls back to the organization's default in its `.github` repository, in the same three places. Check each, for example `gh api -H "Accept: application/vnd.github.raw" repos/<owner>/.github/contents/.github/pull_request_template.md`. A 404 everywhere means there is none.
- **No template anywhere:** use the fallback description in STEP 3.

Also read the bodies of two or three recently merged PRs (`gh pr list --state merged -L 3 --json title,body`) to match the team's tone and title style.

## STEP 3: WRITE THE PR

### Title
- Under 70 characters
- Descriptive of the change (not the branch name)
- Follow the title style of recent PRs; use `type: description` only when the repository has no style of its own

### Description

**With a template, the template is the structure.** Keep its headings in its order and fill every one from the actual changes.

- Follow the instructions in its HTML comments, then delete the comments.
- Remove a section only when the template marks it optional and there is nothing to say. Never add your own sections in place of the template's.
- Tick a checkbox only for something that was really done. Leave the rest unticked, and add a short reason where it helps the reviewer.
- Never invent test results, screenshots or ticket links. Say plainly what was not checked.

**Screenshots.** When the template asks for them and the change is visible, capture them with the screenshot tools you have (the app's browser, the running app). `gh` cannot upload images, so commit them to the branch, in the folder the template names, and link them pinned to the commit so they survive the branch being deleted: `https://github.com/<owner>/<repo>/blob/<commit sha>/<path>?raw=true`. If you cannot capture one, say why in that section rather than leaving it empty.

**Linked tickets.** When the template asks for tickets in a tracker you have tools for, search it for the ones this work belongs to and link those. If none fits, follow what the template says for that case, and ask the user only when the template requires a ticket. Never guess an id.

**Without a template**, use:

```markdown
## Summary
Brief description of what this PR does and why.

## Changes
- Bullet list of specific changes

## Testing
- How to test these changes
- What edge cases to verify

## Screenshots
(if applicable)
```

### Metadata
- Labels (bug, feature, enhancement, documentation)
- Reviewers (based on code ownership or file history)
- Milestone or project (if applicable)
- Issue links (closes #123)

## STEP 4: PRE-SUBMIT CHECKLIST

Verify:
- [ ] All commits are clean and well-described
- [ ] No debug code or console.logs left behind
- [ ] Tests pass
- [ ] No unrelated changes included
- [ ] Branch is up to date with base
- [ ] Documentation updated if needed
- [ ] The description follows the template, if there is one

## STEP 5: CREATE

Write the description to a temporary file and pass it with `--body-file`, which keeps markdown, backticks and quotes intact:

```bash
gh pr create --base <base> --title "<title>" --body-file /tmp/pr-body.md
```

## STEP 6: REPORT

Provide:
- PR URL
- Which template was followed, or that there was none
- Reviewers requested
- Any issues or warnings found during analysis
