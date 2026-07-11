#!/bin/bash
# Blocks task completion (exit 2) unless the self-check is complete.
# Runs on Stop and SubagentStop.

# Q&A session: no commits ahead of main + clean working tree → nothing to police.
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
AHEAD=0
if git rev-parse --verify "origin/main" >/dev/null 2>&1; then
  AHEAD=$(git rev-list --count "origin/main..HEAD" 2>/dev/null || echo "0")
elif git rev-parse --verify "main" >/dev/null 2>&1; then
  AHEAD=$(git rev-list --count "main..HEAD" 2>/dev/null || echo "0")
fi

if [ "$DIRTY" = "0" ] && [ "$AHEAD" = "0" ]; then
  exit 0
fi

# Three-reviewer floor: agents must never be deleted.
for agent in security-reviewer code-reviewer scale-reviewer; do
  if [ ! -f ".claude/agents/$agent.md" ]; then
    printf 'ERROR: .claude/agents/%s.md is missing — the three-reviewer floor cannot be removed.\n' "$agent" >&2
    exit 2
  fi
done

# PR body must exist with a complete Self-check.
PR_BODY=".claude/pr-body.md"
if [ ! -f "$PR_BODY" ]; then
  printf 'ERROR: .claude/pr-body.md not found — write it before stopping.\n' >&2
  exit 2
fi

if ! grep -q '## Self-check' "$PR_BODY"; then
  printf "ERROR: .claude/pr-body.md must contain a '## Self-check' section.\n" >&2
  exit 2
fi

UNCHECKED=$(grep -E '^- \[ \]' "$PR_BODY" || true)
if [ -n "$UNCHECKED" ]; then
  printf 'ERROR: Unchecked self-check items:\n%s\n' "$UNCHECKED" >&2
  exit 2
fi

# Reviewer verdicts must have been updated within the last 24 hours.
NOW=$(date +%s)
TASK_AGE=86400
for reviewer in security-reviewer code-reviewer scale-reviewer; do
  VERDICT=".claude/review/$reviewer.md"
  if [ ! -f "$VERDICT" ]; then
    printf 'ERROR: .claude/review/%s.md not found — run the reviewer before stopping.\n' "$reviewer" >&2
    exit 2
  fi
  MTIME=$(stat -c %Y "$VERDICT" 2>/dev/null || stat -f %m "$VERDICT" 2>/dev/null || echo "0")
  AGE=$((NOW - MTIME))
  if [ "$AGE" -gt "$TASK_AGE" ]; then
    printf 'ERROR: .claude/review/%s.md was not updated this session — re-run the reviewer.\n' "$reviewer" >&2
    exit 2
  fi
done

# Memory must have been updated this session OR pr-body states "no new lesson".
MEMORY_UPDATED=false
for mem_file in MEMORY.md .claude/agents/*.memory.md docs/CLAUDE.md src/CLAUDE.md supabase/CLAUDE.md; do
  if [ -f "$mem_file" ]; then
    MTIME=$(stat -c %Y "$mem_file" 2>/dev/null || stat -f %m "$mem_file" 2>/dev/null || echo "0")
    AGE=$((NOW - MTIME))
    if [ "$AGE" -le "$TASK_AGE" ]; then
      MEMORY_UPDATED=true
      break
    fi
  fi
done

if ! $MEMORY_UPDATED && ! grep -qi 'no new lesson' "$PR_BODY"; then
  printf "ERROR: Update a memory file (MEMORY.md, a CLAUDE.md, or an agent .memory.md) or note 'no new lesson' in .claude/pr-body.md.\n" >&2
  exit 2
fi

exit 0
