# Mario Game — Side-Scroller Entry Point

> Play first. Learn when you hit obstacles. Wisdom through interruption.

---

## Concept

A side-scrolling runner game (like Super Mario) where the player's stick figure runs through a world. Obstacles appear — when you hit one, a chapter opens. Complete the chapter's quiz to continue. Progress = distance run = chapters unlocked.

Two entry modes coexist:

| Mode | For whom | How it works |
|------|----------|--------------|
| **Mario Game** | New/casual users, explorers | Play → hit obstacle → learn → continue |
| **Direct Map** | Returning users, problem-solvers | Pick your problem → read/listen → quiz |

---

## Game Design

### Core Loop

```
Run → Jump → Hit Obstacle → Chapter Opens → Quiz → Continue Running
                                                        ↓
                                              Score increases
                                              New obstacle types appear
```

### Visual Style

- **Same design principles** as everything else: black/white/gold, minimal
- **Dark background** (night sky or minimal landscape)
- **White stick figure** player
- **White/grey obstacles** (blocks, pipes, walls — simple geometric shapes)
- **Gold star** appears when you clear a chapter
- **Clean, no pixel art** — our style is hand-drawn/minimal, not retro 8-bit

### Player

- Stick figure (circle head, line body, V-legs)
- Auto-runs right
- Player controls: **Jump** (tap/spacebar/click)
- Simple physics: gravity, jump arc
- No lives/deaths — hitting an obstacle pauses the game, opens the chapter

### Obstacles → Chapters

Each obstacle type maps to a chapter category:

| Obstacle | Visual | Triggers |
|----------|--------|----------|
| **Wall** | Vertical block | Part I — Self (identity, ego) |
| **Pit** | Gap in ground | Part II — Others (trust, incentives) |
| **Falling block** | Dropping from above | Part III — Teams (alignment, conflict) |
| **Moving barrier** | Sliding left/right | Part VI — Decision Making |
| **Boss gate** | Large decorated barrier | End-of-Part boss level |

### Difficulty Progression

- **Start**: obstacles spaced far apart, only walls
- **As you progress**: obstacles closer together, mixed types, faster speed
- **Boss every ~10 obstacles**: multi-question quiz combining principles

### What Happens When You Hit

1. Game pauses with a smooth transition
2. Chapter card slides up (same chapter view: visual + story + audio + quiz)
3. Complete the quiz → gold star animation → game resumes
4. Skip? Can't. But wrong answers give feedback and retry (no punishment, same as quiz flow)

---

## Technical Approach

### Stack

- **HTML5 Canvas** for the game
- **RequestAnimationFrame** for game loop
- **Same web app** — game is one more view alongside map/chapter/quiz
- No game engine needed — it's a simple runner

### Architecture

```
index.html
├── Game View (canvas)
├── Map View (SVG — existing)
├── Chapter View (existing)
├── Quiz View (existing)
└── Completion View (existing)
```

### Key Components

```javascript
// Game state
{ running, paused, speed, distance, score, obstaclesHit[] }

// Player
{ x, y, vy, jumping, width, height }

// Obstacles
[{ type, x, y, width, height, chapterId, triggered }]

// Game loop
update() → check collisions → render()

// On collision
pauseGame() → showChapter(obstacle.chapterId) → onQuizComplete() → resumeGame()
```

### Controls

| Input | Action |
|-------|--------|
| Spacebar | Jump |
| Tap (mobile) | Jump |
| Click (anywhere) | Jump |

### Responsive

- Canvas resizes to viewport
- Touch-friendly (tap to jump)
- Same chapter/quiz UI on mobile as desktop

---

## Screens

### 1. Start Screen
```
┌─────────────────────────────────┐
│                                 │
│   A Field Guide to Being Human  │
│                                 │
│       [stick figure running]    │
│                                 │
│      Tap to Start               │
│                                 │
│   or  [Go to Map →]            │
└─────────────────────────────────┘
```

### 2. Running
```
┌─────────────────────────────────┐
│  Score: 3 ★★★                   │
│                                 │
│                    ┌──┐         │
│         o          │  │         │
│        /|\    →    │  │         │
│        / \         └──┘         │
│  ══════════════════════════════  │
└─────────────────────────────────┘
```

### 3. Obstacle Hit (transition)
```
┌─────────────────────────────────┐
│                                 │
│   Chapter opens (slides up)     │
│   Same chapter view as map mode │
│                                 │
└─────────────────────────────────┘
```

---

## Chapter Assignment

Obstacles are **semi-random** — chapters appear in a shuffled order within each Part. So:

- First few obstacles = Part I chapters (Self)
- Next batch = Part II (Others)
- Etc.

This gives a loose curriculum feel without being rigidly sequential. Each run is slightly different.

---

## Scoring

| Action | Points |
|--------|--------|
| Clear a chapter quiz | +1 ★ |
| Run distance (per 100m equivalent) | +1 point |
| Complete a Part (all chapters in it) | Badge |
| Perfect quiz (first try, all correct) | Gold ★ |

---

## Phase Plan

| Phase | What | Effort |
|-------|------|--------|
| **1** | Basic runner — stick figure, ground, jump, single obstacle type | 1 session |
| **2** | Collision → chapter popup → quiz → resume flow | 1 session |
| **3** | Multiple obstacle types, speed progression, scoring | 1 session |
| **4** | Start screen, game-over/win states, mobile polish | 1 session |
| **5** | Connect to chapter data (load from JSON), persist progress | 1 session |

---

## References

- https://github.com/anndcodes/mario-game (canvas runner reference)
- https://supermarioplay.com/ (full Mario feel)
- Chrome dino game (simplest reference for auto-runner mechanics)

---

## What Exists Now (MVP)

- ✅ World map navigation (direct access to chapters)
- ✅ Chapter view (visual + story + audio)
- ✅ Quiz with feedback
- ✅ Completion flow (principle reveal + reflection)
- ✅ Light/dark mode
- ⬜ Mario side-scroller game (next build)
