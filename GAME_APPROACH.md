# Game Approach

> Learn by doing. Every chapter becomes a playable level. Navigate between them like a Mario world map.

---

## Two Layers

| Layer | What it is | Analogy |
|-------|-----------|---------|
| **World Map** | Navigation between chapters | Mario overworld — walk between levels |
| **Level** | The interactive exercise inside a chapter | Mario level — challenges, choices, win/fail |

---

## Layer 1: World Map (Mario-style Navigation)

### How It Works

The reader navigates a visual world map. Each node is a chapter. Paths connect related chapters. Completing a level unlocks adjacent ones.

```
PART I: SELF
═══════════════════════════════════════════════

    ★ ─── ★ ─── ● ─── ● ─── ○
    │           │
    ★ ─── ● ─── ●           ○ ─── ○
              │
              ● ─── ○ ─── ○

    ★ = completed (gold star)
    ● = unlocked (available to play)
    ○ = locked (greyed out)
    ─ = path (connected concepts)
```

### Rules

- **Start anywhere** within unlocked nodes (not strictly linear)
- **Completing a level** unlocks adjacent nodes on the map
- **Parts are worlds** — Part I is World 1, Part II is World 2, etc.
- **Boss levels** at the end of each Part — combine principles from that section
- **Shortcut paths** connect chapters across Parts (the "Connections" from each chapter)

### Visual Design

- Top-down view, hand-drawn style (matches our visual identity)
- Stick figure "you" walks along paths
- Nodes pulse gently when available
- Completed nodes show the gold star (same accent color as visuals)
- Locked nodes are faded/greyed with a small lock icon

### Progression

| Milestone | Reward |
|-----------|--------|
| Complete a level | Unlock adjacent chapters + earn the principle as a "power-up" |
| Complete a section (e.g., all Identity chapters) | Section badge |
| Complete a Part | World badge + boss level unlocks |
| Complete a boss level | Access to next Part |

---

## Layer 2: Inside a Level (Chapter as Game)

### Level Structure (5 phases)

```
┌─────────────────────────────────────────────┐
│  1. HOOK         "You're in this situation"  │
│  2. STORY        Narrative plays out         │
│  3. CHALLENGE    Make choices, face traps    │
│  4. PRINCIPLE    Reveal what you learned     │
│  5. REFLECT      Open question to carry      │
└─────────────────────────────────────────────┘
```

### Phase Details

#### 1. Hook (1 screen)
The situation — presented as "this is happening to you right now."
No interaction, just scene-setting.

#### 2. Story (3-5 swipes)
The story unfolds in visual cards. Each card = one beat of the narrative.
Passive — user swipes through.

#### 3. Challenge (2-4 decision points)
Interactive. User faces choices. Each choice has consequences.

```
┌──────────────────────────┐
│ Your team resists the    │
│ new tool. You...         │
│                          │
│ [A] Present more data    │
│ [B] Name what they lose  │
│ [C] Set a hard deadline  │
└──────────────────────────┘
        │
   ┌────┴─────┐
   │          │
 Wrong      Right
   │          │
   ▼          ▼
┌──────┐  ┌──────┐
│ TRAP │  │ NEXT │
│ feed │  │ step │
│ back │  │      │
└──────┘  └──────┘
   │
   ▼
 Retry
```

**Wrong choices:**
- Show what went wrong (the trap)
- Brief feedback: "You argued with emotion using reason."
- Return to choice (no punishment, just learning)

**Right choices:**
- Advance to next decision point
- Brief reinforcement: "Naming the loss opens the door."

#### 4. Principle (1 screen)
The payoff. The named principle appears — bold, clear, quotable.
Feels earned because you just experienced it through choices.

#### 5. Reflect (1 screen)
One question. No answer required. Just something to sit with.
"What change am I currently resisting — and what's the loss I'm afraid of?"

---

## Challenge Templates

Different chapters use different interaction types:

| Template | How it works | Best for |
|----------|-------------|----------|
| **Scenario Choice** | Situation → 3 options → right/wrong feedback | Most chapters — "what would you do?" |
| **Spot the Force** | Read a scenario → identify which force (ego, fear, status...) is driving it | Understanding Others (Part II) |
| **Card Flip** | Front: common belief. Tap to flip. Back: the actual principle | Quick principles, mental models |
| **Drag & Match** | Match situations to correct moves/principles | Review/reinforcement |
| **Sequence** | Put steps in the right order | "The Move" sections — actionable steps |
| **Before/After** | Two outcomes shown. Pick which one applied the principle | Contrasting stories |
| **Progressive Story** | Multi-step scenario where each choice shapes the next scene | Complex chapters (ethics, conflict) |

---

## Data Format

Each chapter's game is defined in JSON alongside the markdown:

```json
{
  "chapter": 31,
  "title": "Why Do People Resist Change Even When It Benefits Them?",
  "world": 2,
  "section": "A",
  "unlocks": [32, 73, 78],
  "boss": false,
  
  "hook": {
    "text": "You've rolled out something objectively better. A new tool, a simpler process. The logic is airtight. And yet — people drag their feet."
  },

  "story_beats": [
    { "text": "Five monkeys in a cage. A banana at the top of a ladder.", "visual": "cage-ladder-banana" },
    { "text": "Every time one climbs, all five get sprayed with cold water.", "visual": "water-spray" },
    { "text": "Soon, no monkey climbs. Then one is replaced.", "visual": "new-monkey" },
    { "text": "The new one reaches for the banana. The others pull it down.", "visual": "pulling-down" },
    { "text": "One by one, all are replaced. No monkey has ever been sprayed. None will climb. None know why.", "visual": "all-new-no-climb" }
  ],

  "challenges": [
    {
      "type": "scenario_choice",
      "situation": "Your team won't adopt the new process. You've shown them the data three times.",
      "options": [
        {
          "text": "Show them even more data — eventually logic wins",
          "correct": false,
          "feedback": "You're arguing with emotion using reason. That's the trap — logic doesn't address what they're actually feeling."
        },
        {
          "text": "Acknowledge what they're giving up: 'I know this means re-learning something you're already good at'",
          "correct": true,
          "feedback": "Naming the loss opens the door. Unacknowledged loss becomes underground resistance."
        },
        {
          "text": "Mandate the switch — set a deadline and move on",
          "correct": false,
          "feedback": "This can work, but forced change hardens resistance into identity. They become 'people who don't go along with management.'"
        }
      ]
    },
    {
      "type": "scenario_choice",
      "situation": "They're listening now. You've acknowledged the loss. What's next?",
      "options": [
        {
          "text": "Great — announce full migration starting Monday",
          "correct": false,
          "feedback": "Too much, too fast. You lowered defenses, then triggered identity threat again. The step needs to be tiny."
        },
        {
          "text": "Ask one person to try it for one task this week",
          "correct": true,
          "feedback": "Small steps stay below the identity-threat threshold. One person succeeding becomes proof for everyone else."
        },
        {
          "text": "Send a detailed comparison document",
          "correct": false,
          "feedback": "Still leading with logic. They don't need more information — they need a safe first step."
        }
      ]
    },
    {
      "type": "spot_the_force",
      "situation": "Kodak engineers built a digital camera in the 1990s. Leadership buried it. They filed for bankruptcy in 2012.",
      "question": "Which force was primarily driving the resistance?",
      "options": [
        { "text": "Incentives", "correct": false, "feedback": "Partly — but the deeper issue was that their whole identity was built around film." },
        { "text": "Identity", "correct": true, "feedback": "Exactly. Digital wasn't just a new product — it was a threat to who they were. Their expertise, their status, their daily routines." },
        { "text": "Scarcity", "correct": false, "feedback": "They weren't protecting scarce resources — they were protecting a self-image." }
      ]
    }
  ],

  "principle": {
    "text": "People don't resist change. They resist loss.",
    "subtext": "Every change asks someone to give up familiarity, competence, or status. The brain weighs losses twice as heavily as gains."
  },

  "reflection": {
    "question": "What change am I currently resisting — and what's the loss I'm actually afraid of?"
  }
}
```

---

## File Structure

```
chapters/
  part-02-other-people/
    31-why-do-people-resist-change.md        ← article
    31-why-do-people-resist-change.mp3       ← podcast
    31-why-do-people-resist-change.svg       ← visual
    31-why-do-people-resist-change.game.json ← game data
```

---

## Tech (future — when building the app/web)

| Component | Options |
|-----------|---------|
| World map | Canvas/SVG with node graph, or simple CSS grid with paths |
| Level gameplay | Swipe-based cards (React Native / web) |
| Animations | Lottie or CSS transitions |
| Progress tracking | Local storage or simple backend |
| Engine | No game engine needed — it's a story-choice UI, not physics |

---

## Design Principles

1. **No punishment** — wrong answers give feedback and retry. Learning, not testing.
2. **Earn the principle** — the reveal comes AFTER you've struggled with the choice. It feels earned.
3. **Short sessions** — one level = 3-5 minutes. Completable in a bathroom break.
4. **The map creates curiosity** — seeing locked nodes makes you want to unlock them.
5. **Principles as power-ups** — once learned, you "carry" them. Boss levels ask you to combine multiple principles.
6. **Progress is visible** — the world map fills with gold stars. Satisfying.
