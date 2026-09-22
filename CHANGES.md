# Version 1.7.0 — Install your academy & wizard wardrobe

- Installable PWA with a standalone window, root-relative manifest, 192/512-pixel maskable PNG icons, iPad home-screen metadata, and offline app-shell caching for local play. All files remain at repository root.
- Installation help is available before sign-in and at Front Desk → Settings & save → Install & app updates. Android uses the native browser installation prompt when offered; iPad instructions use Safari’s Share menu.
- Service worker caches only this academy’s static files, never Firebase/authentication traffic. A new release waits for explicit Save & reload update or for all app windows to close. Explicit update saves locally first. Cache names are scoped to the site, so another installed copy’s cache is not deleted.
- Tap any active wizard’s Focus, Robe, or Charm slot to open matching items. Select a tile for current-versus-selected item stats, spell and rune requirements, affixes, and resulting whole-wizard stats. Equip directly and return to the wizard without going through the Strongroom.
- Other wizards’ equipment is visible for comparison but cannot be taken silently. Expedition and status restrictions remain enforced. Deep-storage items must be withdrawn first. Candidate lists retain compact inventory tiles and pagination.

# Version 1.6.0 — Moments that matter

- Persistent Highlights tray on the academy grounds: visible level-up announcements, aggregated offline level journeys, stat gains, and rune-tier unlocks. Keeps forty recent moments; marking read never grants rewards.
- Equipment receives a full discovery card on the dungeon victory screen and in Highlights, including rarity, rolled quality, actual stats, spell, provenance, and inspection/equipment access. Rare and extraordinary discoveries receive an announcement.
- Rebalanced future equipment rarity: at floor 1, ordinary equipment drops are 70% Common, 24% Uncommon, 5% Rare, 0.9% Ultra Rare, 0.09% Legendary, and 0.01% Mythic. These are conditional equipment odds, not per-enemy chances. Depth and bosses improve the distribution. Existing items and unbounded statistical rolls are unchanged.
- New Dueling Club in the Practice Hall: twelve fixed challengers, four earned titles, animated warded arena, equipment-driven practice projections, opponent scouting, best times, rematches, one-time gold/XP/Prestige prizes, career statistics and archived results. Opponent mechanics include barriers, poison, mana drain, echoes, and enrage.
- Practice copies begin at full HP/mana with supplied practice rune charges. Your real wizard, supplies, and equipment are safe even after a loss. Bouts pause in hidden tabs and resume from saved state. Replays never repay first-win prizes.
- Optional tutorial mission introduces the club. Rare-drop audio now classifies the latest discovery rather than any legendary found earlier that year.

# Version 1.5.0 — A living academy, a guided beginning

- Distinct equipment spell silhouettes: flames, shards, lightning, leaves, crescents, stars, sigils, skulls, healing crosses, and wards.
- Job-specific activity animations on the grounds and longer work-station pauses between walks.
- Eleven guided starting missions plus three optional follow-ups, direct room navigation, a mission journal, and persistent one-time rewards.
- Static room highlights and an optional hideable guide; reduced-motion support retained.
- Combat rules, production rates, previous saves, and the academy’s room layout retained.
- New required root files: room-life.js and tutorial.js.

# Version 1.4.1 — Emergency admissions

- Free, immediate basic recruits restore enrollment to five active wizards.
- Available from Admissions, Rift league/lineup, and the dungeon gate when short-handed.
- Level-1 recruits with modest stats and no equipment/Prestige boost; regular applicants remain available.
- Repairs vacant/deceased starter slots, preserves active starters, and assigns unique jerseys.
- Does not resurrect fallen wizards, reverse forfeits, or recruit above five active wizards.

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
