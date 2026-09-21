# Version 1.4.0 — The academy finds its voice

- Original procedural magical audio for UI, rooms, production, recruitment, equipment, upgrades, loot, and level-ups.
- Family-based spell launch sounds plus impact-synchronized damage, criticals, healing, shields, summons, deaths, and battle results.
- Rift pass, goal, save/interception, and whistle cues timed to broadcast possessions.
- Quiet room ambience and gentle academy music.
- Quick mute in the header; master/effects/ambience/music controls in Front Desk settings.
- Gesture-based audio startup, hidden-tab cleanup, voice limits, and repeated-cue throttling. No offline sound backlog.
- Add sound.js by uploading the complete root-only archive. Existing saves remain compatible.

# Version 1.3.1 — Compact Strongroom

- Four-column equipment tiles, approximately eight items in the former two-card area.
- Tap any tile for full inspection, comparison, equipment controls, and provenance.
- Retained filters, sorting, pagination, equipped/locked markers, and back navigation to the inventory.
- No changes to loot generation, spells, balance, or saves.

# Version 1.3.0 — One recipe, one team

- Inscribe buttons beside each rune family; choose tier and select wizards with their current jobs visible.
- Production is pooled per recipe/tier: combined worker speed drives one batch, one timer, and one progress bar.
- Rune Chamber, brewing, research, and office production show only their own teams. Dorms remain the full academy overview.
- Training, Rift practice, and recovery use room-local assignments and the same worker picker.
- Existing partial work migrates once; shared progress survives reassignment, offline time, and reloads.
- Blocked production banks one batch only. Production credit is distributed among contributing workers.
- New required root file: workers.js. Upload the complete archive.

# Version 1.2.0 — Matchday at the academy

- Prominent Arcane Rift strip: season W–L, league rank, opponent, countdown, and latest broadcast access.
- Smooth persistent pitch with numbered dots, passes, shots, saves/interceptions, possession commentary, and score updates at resolution.
- Assign unique active-wizard jerseys 0–99 from Lineup & tactics or individual profiles. New match snapshots preserve historical uniforms.
- Match Theatre can begin the next scheduled recording as it resolves; playback never changes saved rewards or results.
- Fixed next-match information after playoff elimination and season completion.
- Retained the 30-active-wizard capacity, existing save compatibility, combat, and all work progress improvements.
- Added root modules jerseys.js and rift-motion.js. Upload all files.

# Version 1.1.1 — Work you can watch

- Live per-wizard tasks with smooth progress, remaining time, output/cost, and repeat-cycle duration.
- Applied to production, training, Rift practice, recovery, clerical work, research, and scheduled patrols; also visible in the roster and wizard profiles.
- Explicit supply/level requirements, reserve status, and expedition pauses.
- Room selectors now retain a wizard’s actual assignment instead of incorrectly displaying Rest for jobs in other rooms.
- Display and simulation share production rate formulas. Assignment changes settle elapsed work first; changing inscription tier resets its batch.
- Combat, academy layout, saves, and production balance retained. Add tasks.js alongside all other root files.
- Validation: all existing regressions plus five new task tests passed. Real browser/touch verification remains unavailable.

# Version 1.1.0 — The living dungeon

- Replaced combat cards as the main battlefield with an animated, decorated dungeon arena; retained the academy layout and jewel palette.
- Five floor themes, moving wizard/monster characters, front/middle/back formation, and persistent visible summons.
- Family-colored traveling spell projectiles, healing paths between allies, melee summon strikes, shield runes, and local summon explosions.
- Impact-timed damage/healing numbers, critical and absorbed labels, smooth health bars, corpses, status rings, and boss phase announcements.
- No screen flashes, hit flashes, screen shake, or repeated panel fades. Retained calmer playback and added reduced-motion support to the arena.
- Presentation events remain outside saves and cannot consume game RNG. Existing saves and exact combat outcomes are preserved.
- New required root modules: arena.js and combat-events.js. Upload the complete archive contents.

Validation: 16 simulation tests, 24 panel checks, 6 arena regressions, and exact state equivalence against the previous combat code over 40 seeded encounters. Native Canvas renders inspected at 340px and 720px. Browser layout, touch behavior, and physical devices were not verified here.

# Version 1.0.1

- Bold violet, sapphire, teal, emerald, rose, and gold palette; original layout and dimensions retained.
- Combat updates health, mana, statuses, and logs in place instead of rebuilding the panel four times per second.
- Disabled combat entry fades. No new flashing or pulsing effects.
- Normal playback is half the previous normal speed. Relaxed is half that again; Fast equals the previous normal speed. Removed 4x.
- Original combat balance, offline farming, production, and annual calendar retained.
- Existing academies and encounters remain compatible. No save reset.

Validation: 16 simulation regressions and 24 DOM-stub panel checks. Physical device and live browser visual verification remain unavailable in this environment.
