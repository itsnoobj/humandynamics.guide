# Changelog

## Session 2 — 2026-06-30

### Features

- **Landing page** — rotating "Stories to navigate [X]" hero, game-world background images (dark/light), preview cards with blob borders, dotted click-hand icons, sample mission curiosity hook
- **World/Region/Mission hierarchy** — 3-level drill-down navigation with landscape maps at every level
- **World Select** — SVG landscape map with terrain icons (lake, houses, mountain, maze, etc.) for 10 worlds
- **Region Map** — squiggly paths, nature decorations (trees, rocks, river), emoji landmarks, draggable/pannable
- **Mission Map** — serpentine layout, terrain elements, recommended node indicator (✨)
- **5 Quiz Templates** — ScenarioChoice, SpotTheForce, CardFlip, DragMatch (reorder with arrows), BeforeAfter (compare scenarios)
- **Dev quiz route** — `/dev/quiz` shows all 5 templates with sample data (dev-only)
- **Game improvements** — multiple cloud sizes, parallax hills, birds, 2 new obstacle types (crate, spike), combo spawns
- **Game start screen** — redesigned as game title with running figure, obstacle preview, "TAP TO RUN"
- **Hit interstitial** — dramatic fullscreen takeover (not a box), "OBSTACLE HIT!" with glow, "ACCEPT THE CHALLENGE →"
- **Result page** — open book icon, "OBSTACLE CLEARED", stats row, reflection card, both game + map CTAs
- **Obstacle cleared animation** — shows on game resume with ✓ and chapter title
- **Path unlocked animation** — shows on map return with golden key
- **Audio player** — proper play/pause SVG icon buttons (not text)
- **Theme toggle** — visible on all pages, dark default
- **Quiz generator tool** — `tools/generate-quiz.mjs` auto-generates LLM prompt from mission JSON
- **Map auto-generation** — adding missions to hierarchy.json automatically extends the map (tested)

### Fixes

- Jump height reduced (was flying off screen)
- Game respects dark/light theme
- Progress store wired (map updates on completion)
- Game return navigation chain (game → chapter → quiz → result → game)
- No rounded corners anywhere (sharp, per style)
- All gold buttons use dark text for WCAG contrast
- Audio player 44px tap target
- Quiz wrong-answer feedback stays (no auto-erase)
- Map readable on mobile (horizontal scroll)
- Hit interstitial text visible in both themes (hardcoded colors on dark overlay)
- Background images blend with page in both modes

### Tests Added

- Landing page: 8 tests
- QuizShell (template switching): 5 tests
- SpotTheForce: 5 tests
- DragMatch: 6 tests
- BeforeAfter: 6 tests
- WorldMap: 3 tests + generateMapLayout: 5 tests
- GameCanvas: 2 tests
- ObstacleCleared: 3 tests
- PathUnlocked: 3 tests
- RegionMap: 4 tests

**Total: 22 test files, 115 tests passing**

### Docs Added

- `CREATING_TEMPLATES.md` — how to create new quiz templates
- `ADDING_CHAPTERS.md` — how to add new missions
- `HIERARCHY.md` — World/Region/Mission structure
- `ASSUMPTIONS.md` — decisions made overnight

---

## Session 1 — 2026-06-29

### Features

- **Project concept** — "A Field Guide to Being Human" — situation-first wisdom reference
- **Chapter template** — 9-element structure (Situation, Story, Contrast, Principle, Psychology, Trap, Move, Reflection, Connections)
- **110-chapter outline** — organized into 10 Parts
- **Chapter 31 written** — "Why Do People Resist Change?" (monkey experiment story)
- **Audio podcast generation** — `chapter_to_podcast.py` using Kokoro-82M TTS (two voices: narrator + storyteller)
- **SVG illustration** — stick figure visual for chapter 31 (generated with Rough.js)
- **Game approach** — Mario-style runner + quiz-on-hit design
- **Web prototype** — HTML/CSS/JS MVP (map → chapter → quiz → result)

### Docs Created

- `README.md` — project philosophy, 10 forces, structure
- `CHAPTER_TEMPLATE.md` — writing guidelines, story quality rules
- `OUTLINE.md` — 110 chapters with questions, forces, story sources
- `AUDIO_APPROACH.md` — voice design, structure, tech
- `VISUAL_STYLE.md` — 10 rules for illustrations
- `GAME_APPROACH.md` — quiz templates, Mario map, challenge types
- `MARIO_GAME.md` — side-scroller game design
- `TECH_DESIGN.md` — full architecture (Next.js, Fastify, Zustand, Turborepo)
- `NEXT_SESSION.md` — build spec for AI agent pickup

---

## Summary

| Metric                | Count                                                                 |
| --------------------- | --------------------------------------------------------------------- |
| Total commits         | 84                                                                    |
| Test files            | 22                                                                    |
| Tests passing         | 115                                                                   |
| Quiz templates        | 5                                                                     |
| Worlds defined        | 10                                                                    |
| Missions outlined     | 110                                                                   |
| Missions with content | 1 (chapter 31)                                                        |
| Pages built           | 7 (landing, worlds, region, mission map, chapter, quiz, result, game) |
| Docs                  | 10                                                                    |
