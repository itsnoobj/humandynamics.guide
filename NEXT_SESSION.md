# Next Session: Build Spec

> Context and backlog for the AI agent to pick up and build from.

---

## What Exists (MVP — prototype only, being rebuilt properly)

| Asset | Location | Status |
|-------|----------|--------|
| Chapter template | `CHAPTER_TEMPLATE.md` | ✅ Locked |
| 110-chapter outline | `OUTLINE.md` | ✅ Locked |
| Visual style rules | `VISUAL_STYLE.md` | ✅ Locked |
| Audio approach | `AUDIO_APPROACH.md` | ✅ Locked |
| Game approach | `GAME_APPROACH.md` + `MARIO_GAME.md` | ✅ Locked |
| Tech design | `TECH_DESIGN.md` | ✅ Locked |
| Chapter 31 content | `chapters/part-02-other-people/31-*` (.md, .mp3, .svg, .game.json) | ✅ Done |
| Rough web prototype | `web/` (HTML/CSS/JS) | ⚠️ Throwaway — rebuild in Next.js |

---

## Screens to Build

### 1. Mario Runner Game (`/game`)

**Reference:** https://github.com/anndcodes/mario-game

Use this repo's approach for:
- Canvas-based side-scroller mechanics
- Sprite-based character and obstacles
- Collision detection
- Ground/platform rendering

**Our adaptation:**
- Use images/sprites from the reference for the Mario character, obstacles (pipes, blocks), ground tiles
- Keep our color scheme: dark background, minimal palette, gold accents for scores/stars
- Auto-runner: character runs automatically, player taps/space to jump
- On obstacle hit: brief interstitial (chapter title + situation) → navigate to chapter page
- On return from quiz: resume game with score updated

**Interstitial on hit:**
```
┌─────────────────────────────────────┐
│                                     │
│   ⚡ Resisting Change               │
│                                     │
│   "Your team won't adopt the new    │
│    process. You've shown them the   │
│    data three times."               │
│                                     │
│       [ Read & Solve → ]            │
│                                     │
└─────────────────────────────────────┘
```

**Key components:**
- `GameCanvas` — full-screen canvas, handles render loop
- `Player` — sprite, physics (gravity, jump)
- `Obstacle` — spawning, movement, collision box
- `GameHUD` — score display, distance
- `HitInterstitial` — overlay with chapter info + CTA
- `useGameLoop` — requestAnimationFrame hook
- `useCollision` — collision detection logic
- `useGameState` — state machine (start → running → hit → paused)

---

### 2. World Map (`/map`)

**Visual:** Mario World-style overworld map (dark background, dotted paths, level nodes)

**Elements:**
- Winding dotted white path connecting nodes
- Gold path for completed segments
- Nodes: gold (★ done), white with number (current, pulsing), grey with lock (locked)
- Bouncing indicator on current node
- Click node → navigate to chapter page
- Responsive: scrollable on mobile

**Key components:**
- `WorldMap` — SVG container, renders paths + nodes
- `MapNode` — individual level node (handles states: done/current/locked)
- `MapPath` — path segment between two nodes (gold vs white)
- `PlayerIndicator` — bouncing arrow/triangle on current
- `useProgress` — reads completion state, determines which nodes are unlocked

---

### 3. Chapter/Story Page (`/chapter/[id]`)

**Layout (top to bottom):**
1. Chapter visual (SVG illustration — full width)
2. Audio player (play/pause, progress bar, time)
3. Chapter title (large, bold)
4. Story sections with headers (The Situation, The Story, The Contrast, The Principle, Why It Happens, The Trap, The Move)
5. CTA button: "Test Your Understanding →"

**Key components:**
- `ChapterVisual` — loads SVG by chapter ID
- `AudioPlayer` — play/pause, seekable progress bar, time display
- `StoryView` — renders markdown/JSON sections with proper typography
- `StorySection` — individual section (header + paragraphs)
- `ChapterCTA` — bottom button to start quiz

**Design:**
- Clean, readable. IBM Plex Sans.
- Light/dark mode support
- Section headers: smaller, uppercase, muted — clearly distinct from body text but not overpowering
- Body text: 1rem, line-height 1.7, comfortable reading

---

### 4. Quiz Page (`/quiz/[id]`)

**Shell (shared across all templates):**
- Progress dots at top (which question you're on)
- Back button
- Template renders inside

**Templates (build 3 for now):**

#### Template A: Scenario Choice (primary)
- Situation text at top
- 3 options as tappable cards
- On select: correct = green border + feedback, wrong = red border + feedback + retry
- Next button appears after correct answer

#### Template B: Spot the Force
- A scenario/story snippet
- Question: "Which force is driving this?"
- Options: Force names (Ego, Fear, Identity, Incentives, etc.)
- Same correct/wrong/feedback mechanics

#### Template C: Card Flip
- Front: A common belief or statement
- Tap to flip
- Back: The actual principle (the correction)
- "Got it →" button to proceed

**Key components:**
- `QuizShell` — progress dots, navigation, wraps template
- `ScenarioChoice` — Template A
- `SpotTheForce` — Template B  
- `CardFlip` — Template C
- `QuizFeedback` — feedback message display (shared)
- `useQuizState` — tracks current question, answers, score

**Template selection is data-driven:**
```json
{
  "challenges": [
    { "type": "scenario-choice", "situation": "...", "options": [...] },
    { "type": "spot-the-force", "situation": "...", "options": [...] },
    { "type": "card-flip", "front": "...", "back": "..." }
  ]
}
```

---

### 5. Result/Completion Page (`/result/[id]`)

**Layout:**
- Gold star animation (appears with scale-in)
- Principle text (large, centered)
- Subtext (supporting explanation)
- Divider
- Reflection question (italic)
- CTA: "Continue Running →" (if from game) or "Back to Map ★" (if from map)

**Key components:**
- `ResultCard` — wrapper with animations
- `PrincipleReveal` — principle text with entrance animation
- `ReflectionPrompt` — italic question
- `ResultCTA` — context-aware button (game vs map return)

---

## JSON Schema for Content

### chapter.json
```json
{
  "id": "31",
  "part": 2,
  "section": "A",
  "title": "Why Do People Resist Change Even When It Benefits Them?",
  "forces": ["fear", "identity", "incentives"],
  "connections": ["7", "73", "78", "8"],
  "audio": "31.mp3",
  "visual": "31.svg",
  "sections": [
    { "type": "situation", "content": "You're rolling out..." },
    { "type": "story", "title": "The Story", "content": "Five monkeys..." },
    { "type": "contrast", "title": "The Contrast", "content": "In the 1990s, Kodak..." },
    { "type": "principle", "content": "People don't resist change. They resist loss." },
    { "type": "psychology", "title": "Why It Happens", "content": "Three forces..." },
    { "type": "trap", "title": "The Trap", "content": "If you push too hard..." },
    { "type": "move", "title": "The Move", "content": "1. Name the loss..." }
  ]
}
```

### quiz.json
```json
{
  "chapterId": "31",
  "challenges": [
    {
      "type": "scenario-choice",
      "situation": "Your team won't adopt the new process...",
      "options": [
        { "text": "Show even more data", "correct": false, "feedback": "..." },
        { "text": "Acknowledge what they're losing", "correct": true, "feedback": "..." },
        { "text": "Escalate to leadership", "correct": false, "feedback": "..." }
      ]
    },
    {
      "type": "spot-the-force",
      "situation": "Kodak engineers built a digital camera...",
      "question": "Which force primarily drove the resistance?",
      "options": [
        { "text": "Fear", "correct": false, "feedback": "..." },
        { "text": "Identity", "correct": true, "feedback": "..." },
        { "text": "Incentives", "correct": false, "feedback": "..." }
      ]
    },
    {
      "type": "card-flip",
      "front": "People resist change because they don't understand the benefits.",
      "back": "People don't resist change. They resist loss. The brain weighs losses 2x more than gains."
    }
  ],
  "principle": {
    "text": "People don't resist change. They resist loss.",
    "subtext": "Every change asks someone to give up familiarity, competence, or status."
  },
  "reflection": "What change am I currently resisting — and what's the loss I'm actually afraid of?"
}
```

---

## Immediate Backlog (this session)

| # | Task | Priority |
|---|------|----------|
| 1 | Scaffold Turborepo (Next.js + Fastify + shared-types) | P0 |
| 2 | Set up ESLint, Prettier, Husky, lint-staged, Vitest | P0 |
| 3 | Design tokens (CSS variables) + theme toggle + IBM Plex Sans | P0 |
| 4 | Shared components: Button, ProgressDots, ThemeToggle | P0 |
| 5 | Story page module (ChapterVisual, AudioPlayer, StoryView, StorySection) with tests | P0 |
| 6 | Quiz module: QuizShell + ScenarioChoice template with tests | P0 |
| 7 | Quiz module: SpotTheForce template | P1 |
| 8 | Quiz module: CardFlip template | P1 |
| 9 | Result page module (PrincipleReveal, ReflectionPrompt, ResultCTA) | P0 |
| 10 | Map module (WorldMap, MapNode, MapPath) — Mario-style | P1 |
| 11 | Game module — canvas runner with sprites from reference repo | P1 |
| 12 | Navigation wiring: game → interstitial → chapter → quiz → result → game/map | P0 |
| 13 | JSON content: convert chapter 31 markdown to schema-validated JSON | P0 |
| 14 | Zod schemas for chapter.json + quiz.json + build-time validation | P0 |
| 15 | Zustand store: progressStore (completed chapters, score) | P1 |

---

## Design Direction (for devil's advocate review)

Run a devil's advocate pass on each screen asking:
- Is this the simplest possible version that still delights?
- What would make someone screenshot this and share it?
- What's confusing on first visit with zero context?
- What's the mobile experience like on a small phone?
- Is the visual hierarchy clear? (What do eyes go to first?)
- Does the transition between screens feel smooth or jarring?

---

## Build Strategy

### Parallel Agents

Spin up multiple agents working in parallel on independent modules:

| Agent | Task | Branch |
|-------|------|--------|
| **Agent 1: Scaffold** | Turborepo + ESLint + Prettier + Husky + Vitest + tokens | `feat/scaffold` |
| **Agent 2: Story Module** | StoryView, AudioPlayer, ChapterVisual, StorySection + tests | `feat/story-module` |
| **Agent 3: Quiz Module** | QuizShell + 3 templates (ScenarioChoice, SpotTheForce, CardFlip) + tests | `feat/quiz-module` |
| **Agent 4: Game Module** | Canvas runner, sprites from reference repo, collision, interstitial | `feat/game-module` |
| **Agent 5: Map Module** | WorldMap, MapNode, MapPath, Mario-style visuals | `feat/map-module` |
| **Agent 6: Content** | Convert chapter 31 to validated JSON, Zod schemas, build-time validation | `feat/content-schema` |

**Dependencies:**
- Agent 1 (scaffold) must finish first — others depend on the project structure
- Agents 2-6 can run in parallel after scaffold is done
- Final integration: wire navigation + Zustand store + result page

### Git Workflow

- Initialize repo with `git init` on scaffold
- Each task = one focused commit with clear message
- Commit message format: `feat(module): description` / `test(module): description`
- Each agent works on its own feature branch
- Merge to `main` via squash once tests pass
- Every commit is a checkpoint — shows progress clearly

### Changelog

Maintained automatically from commit history. Each session's work is traceable through git log:

```bash
git log --oneline --since="2026-06-30"
# Shows exactly what was built in that session
```

---

## References

| What | Link/Location |
|------|---------------|
| Mario game reference (canvas + sprites) | https://github.com/anndcodes/mario-game |
| Mario game live demo | https://supermarioplay.com/ |
| Chapter 31 content | `chapters/part-02-other-people/31-*` |
| Current prototype (throwaway) | `web/index.html`, `web/game.html` |
| Visual style | `VISUAL_STYLE.md` |
| Audio approach | `AUDIO_APPROACH.md` |
| Full tech design | `TECH_DESIGN.md` |
