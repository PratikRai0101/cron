# AGENT_MIGRATION_GUIDE.md — Monolith

> How to seamlessly migrate between coding agents during Monolith development.

---

## Why This Matters

You will likely use multiple AI coding agents during Monolith's lifecycle:
- **Kimi K2.6** (me) for initial setup, design, and spec-driven implementation
- **Claude Code** for complex refactoring and architecture decisions
- **Gemini CLI** for exploratory variations and media generation
- **Cursor Agent** for day-to-day feature implementation
- **Human developers** (you or a team) for critical logic

**The goal**: Any agent (or human) picking up this project should have 100% context within 2 minutes of reading files. No lost work. No repeated explanations.

---

## How Context is Preserved

### 1. AGENTS.md (Single Source of Truth)

**Location**: `monolith-design/AGENTS.md`

This is a **living document** updated after every session. It contains:
- What's been done ✅
- What's in progress 🔄
- What's planned 📋
- Architecture decisions
- Tech stack
- Design system quick reference
- Feature gates
- Environment variables
- How to run the project

**Rule**: Any agent MUST read this file first before touching any code.

### 2. Conventional Commits

All commits follow the conventional format:
```
feat: add Grid screen with contribution grid component
fix: correct momentum ring SVG stroke calculation
docs: update PRD with crew privacy rules
refactor: extract GridCell into separate component
test: add unit tests for grid intensity calculation
```

This makes `git log` readable by any agent for instant context on what happened.

### 3. Reference Screens

**Location**: `redesign/fresh/mockup.html`

Pixel-perfect mocks of every screen. When switching agents:
1. Agent reads `AGENTS.md` for context
2. Agent opens `redesign/fresh/mockup.html` for visual target
3. Agent implements in React Native to match exactly

No ambiguity about "what should this look like?"

### 4. Design Documents

**Location**: `monolith-design/`

Complete planning documents that don't change during implementation:
- `redesign/fresh/DIRECTION.md` — Approved visual system (immutable during dev)
- `PRD.md` — Product requirements (immutable unless pivoting)
- `GAMIFICATION.md` — Progression mechanics
- `SAAS_PLAN.md` — Pricing & monetization
- `SOCIAL_FEATURES.md` — Social module specs

### 5. Approved Mockups

**Location**: `redesign/fresh/mockup.html`

When you need to generate new screens or variations, match these mockups exactly so the result stays consistent with the shipped design.

---

## Migration Checklist

When switching from Agent A to Agent B, follow this exact sequence:

### Step 1: Commit All Work
```bash
git add -A
git commit -m "checkpoint: [brief description of current state]"
git push
```

### Step 2: Update AGENTS.md
Add a section at the bottom:
```markdown
## Last Updated
**Date**: [today]
**Agent**: [Agent Name]
**Session**: [What was done]
**Next Session**: [What should be done next]
**Blockers**: [Any issues to resolve]
```

### Step 3: Switch to New Agent

**For Claude Code:**
```bash
# In the project directory
claude
# Claude will read the directory. Tell it:
"Read monolith-design/AGENTS.md first, then continue implementation."
```

**For Gemini CLI:**
```bash
gemini
# Tell it:
"Read monolith-design/AGENTS.md for full project context, then read the files in apps/mobile/src/ to understand current progress."
```

**For Cursor Agent:**
```
Open the project in Cursor.
Use Ctrl+K (or Cmd+K) to open the agent.
Paste: "Read monolith-design/AGENTS.md first. This is a living document with all project context."
```

**For Human Developer:**
```
1. git clone git@github.com:PratikRai0101/cron.git
2. Read monolith-design/AGENTS.md
3. Read the relevant files in apps/mobile/src/
4. Open `redesign/fresh/mockup.html` to see visual targets
5. Start coding
```

### Step 4: Agent Reads Context

The new agent should read in this order:
1. `monolith-design/AGENTS.md` (2 min) — Full project context
2. `apps/mobile/src/types/models.ts` (30 sec) — Data structures
3. `apps/mobile/src/theme/config.js` (30 sec) — Color tokens
4. `redesign/fresh/mockup.html` (1 min) — Visual target
6. Existing code in the area they're working on (2 min)

**Total context load time: ~7 minutes**

### Step 5: Agent Continues Work

The agent now has full context and can:
- Implement new screens
- Fix bugs
- Refactor code
- Add features
- Generate tests

**Important**: The agent should update `AGENTS.md` after their session before handing off again.

---

## Context Files Hierarchy

When a new agent joins, they should read files in this priority order:

```
Priority 1 (Must Read):
├── monolith-design/AGENTS.md              ← START HERE

Priority 2 (Should Read):
├── redesign/fresh/DIRECTION.md            ← Visual system
├── monolith-design/PRD.md                 ← Product requirements
├── apps/mobile/src/types/models.ts        ← Data structures

Priority 3 (Read as Needed):
├── apps/mobile/src/theme/config.js        ← Color tokens
├── apps/mobile/src/stores/*.ts            ← State management
├── redesign/fresh/mockup.html             ← Visual targets
├── monolith-design/GAMIFICATION.md        ← Game mechanics
├── monolith-design/SAAS_PLAN.md           ← Pricing
├── supabase/migrations/001_initial_schema.sql  ← DB schema

Priority 4 (Reference):
├── monolith-design/SOCIAL_FEATURES.md     ← Social specs
├── redesign/fresh/mockup.html              ← Visual targets
```

---

## Agent-Specific Notes

### Switching TO Claude Code
**Strengths**: Excellent at refactoring, architecture, complex logic
**Weaknesses**: May get creative with design tokens (watch for color drift)

**Tip**: Explicitly tell Claude "Follow redesign/fresh/DIRECTION.md exactly. Do not change colors or fonts."

### Switching TO Gemini CLI
**Strengths**: Creative variations, media generation, exploratory design
**Weaknesses**: Less disciplined with token adherence

**Tip**: Use Gemini for generating new screen variations or marketing assets. Use Kimi/Claude for implementation.

### Switching TO Cursor Agent
**Strengths**: Fast iteration, good at following existing patterns
**Weaknesses**: May miss architectural nuances

**Tip**: Cursor works best when you point it at specific files. "Implement the Profile screen following the pattern in Grid screen."

### Switching TO Human Developer
**Strengths**: Deep understanding, long-term context, business logic
**Weaknesses**: Slower than AI for boilerplate

**Tip**: Use humans for architecture decisions, complex business logic, and reviewing AI-generated code.

---

## Preserving Context Across Sessions

### If You're the Same User, Different Day
1. Read `AGENTS.md` to remind yourself where you left off
2. Check `git log` for recent commits
3. Open the last reference screen you were working on
4. Continue

### If You're a Different User (Team Member)
1. Clone the repo
2. Read `AGENTS.md` completely
3. Read `redesign/fresh/DIRECTION.md` for visual context
4. Open reference screens in browser to see the app
5. Run `npm run mobile` to see the current state
6. Start coding

### If You're an AI Agent
1. Read `AGENTS.md` (mandatory)
2. Read relevant planning docs
3. Read existing code in the area you're modifying
4. Match existing patterns exactly
5. Update `AGENTS.md` when done
6. Commit and push

---

## What NOT to Do

❌ **Don't start coding without reading AGENTS.md first**  
You'll duplicate work or contradict existing decisions.

❌ **Don't change the design system without updating `redesign/fresh/DIRECTION.md`**  
Visual consistency will break.

❌ **Don't commit without updating AGENTS.md**  
The next agent won't know what you did.

❌ **Don't use different tech without discussion**  
The stack is intentional (Expo, Zustand, Supabase, etc.).

❌ **Don't ignore reference screens**  
They're the pixel-perfect target. Match them exactly.

---

## Quick Commands for Any Agent

```bash
# Check project status
cat monolith-design/AGENTS.md | head -50

# See recent commits
git log --oneline -10

# See what files changed recently
git diff --name-only HEAD~5 HEAD

# Check if mobile app runs
cd apps/mobile && npx expo start

# Check TypeScript errors
npm run type-check

# Check linting
npm run lint
```

---

## Summary

**The Monolith project is designed for seamless agent handoffs.**

Every piece of context is documented, committed, and version-controlled. Any agent (AI or human) can pick up where the last one left off with ~7 minutes of reading.

**The golden rule**: Update `AGENTS.md` after every session. It's the project's memory.

---

**Last Updated**: 2025-05-13
**By**: Kimi K2.6 (OpenCode)
**Next**: Any agent can continue from here
