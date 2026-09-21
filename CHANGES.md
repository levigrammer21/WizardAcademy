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
