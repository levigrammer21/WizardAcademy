# Validation — version 1.4.0

## Executed and passed

16 deterministic simulation tests (`node tests.mjs`):

1. Zero active wizards at founding; starting capacity five; opening creates applicants.
2. Unique identities and capacity enforcement.
3. Twelve-hour offline cap, no duplicated elapsed rewards, clock rollback ignored, production advances.
4. Unknown floors cannot be automated; a cleared new floor stops.
5. Every boss attempt requires one seal, with no repeated charge for an in-progress fight.
6. Equipment-granted summons consume matching charges and mana.
7. A wipe permanently kills the party; recovery restores the original equipment IDs without resurrection.
8. All 32 schools complete 14 regular games; playoffs yield 236 total matches per season; exactly six schools move between the four leagues while each retains eight teams.
9. Split offline catch-up and uninterrupted catch-up produce identical league tables.
10. Retirement, faculty removal on natural death, and permanent wizard archives.
11. 100,000 statistical samples exercise the positive outlier tail and finite values without max-roll fields.
12. A 101-year simulation retains complete season archives while keeping live state approximately 232 KB (without a player’s growing active inventory).
13. Generating 450 items leaves 180 active and 270 safely shelved, with all 450 provenance records retained.
14. Academy match wins and championships count teams once, not once per participating wizard.
15. A serialized/resumed real-time combat encounter yields the same final outcome and rewards.

Also executed: module syntax checks and a reproducible DOM-stub rendering smoke check (`node ui-tests.mjs`) across 24 management views, wizard and item details, decisions, live and completed combat, match replay, completed-season history, and an offline report. Academy-name HTML escaping was checked.

## Not verified in this environment

- Real browser rendering, touch input, and physical Fold/iPad behavior. A local browser executable was unavailable, its download failed, and the connected browser could not access the local preview. The DOM-stub check does not verify CSS layout or actual browser event behavior.
- Authentication against the supplied live Firebase project, deployed rules, real IndexedDB durability, cloud transaction execution, multi-device conflicts, and Firebase quota behavior. No test user or private credentials were created. The project console configuration still needs the setup in README.md.
- Human playtesting of multi-week balance. The underlying systems were simulated, but that is not equivalent to verifying months of entertainment or difficulty tuning.

## Deliberate implementation boundaries

The browser resolves deterministic scheduled matches on catch-up; there is no scheduled server process. The twelve-hour cap pauses the academy calendar beyond the credited absence. Item statistics have no designed maximum but use finite JavaScript arithmetic. Record boards use retained leaders and paginated archives rather than an unrestricted historical analytics engine. Rival dialogue is personality-driven with situational match quotes; it does not generate unrestricted natural language. There are ten reusable combat spell behaviors tied to the ten families, with item statistics, tiers, and affixes providing build variation. The academy uses stylized vector rooms and simple state-driven movement, not a freeform city builder or full pathfinding engine.

These boundaries are implemented choices, not inactive buttons or unfinished placeholder systems.

Version 1.0.1 adds a playback-speed regression for Normal/Relaxed/Fast, legacy speed fallback, and completed encounters.

## Version 1.1.0 arena validation

- Six additional regressions check source/target events, healing and summoning, bounded movement with unchanged game state, impact ordering and death timing, bounded transient buffers/reopening, and finite geometry across all five themes at narrow/tablet widths.
- Compared complete serialized state against the pre-overhaul combat engine for 40 seeded encounters spanning families and normal/boss floors: identical RNG, damage, costs, rewards, deaths, and logs.
- Executed the actual drawing code with native Canvas and visually inspected 340px and 720px arena renders. This verifies drawing output, not browser CSS layout or touch input.
- New presentation modules need no external rendering dependency in the browser. The native Canvas package was used only for development inspection.

## Version 1.1.1 task validation

Five additional automated checks verify inscription completion against its displayed ETA, all production-job cycle rates, blocked supply/tier requirements, next-level training/Rift timing, bounded read-only interpolation, and expedition pauses. All prior simulation, panel, and arena tests also passed. No physical-device or browser layout testing was performed for this update.

## Version 1.2.0 Rift validation

All existing tests passed, plus five new regressions for capacity/jersey uniqueness, historical number snapshots, playback scoring/pause/completion without match mutation, finite positional geometry/legacy recordings, and offseason scheduling after elimination. The 101-year simulation still retains a compact live state (approximately 232 KB in its fixture). DOM-stub panel rendering passed; real browser animation, touch input, and physical-device layout were not verified.

## Version 1.3.0 shared production validation

Five new regressions verify three-worker speed and single-batch cost/output, once-only migration, preserved paused work and atomic validation, supply-starved batch banking, and split offline/save-resume equivalence. Added UI checks verify one Ember action, absence of unrelated workers in the Rune Chamber, full current-job visibility in the picker, and the full Dorm overview. Existing simulation, arena, task, and panel regressions passed; physical browser/device rendering remains unverified.

## Version 1.3.1 validation

JavaScript syntax and the existing panel-rendering smoke checks passed after replacing inventory cards with compact tiles. CSS uses four equal minmax(0,1fr) columns and 112–116px tile heights. Actual browser/device layout has not been verified here. No simulation changes were made.

## Version 1.4.0 audio validation

Executed syntax checks, panel rendering, arena/Rift regressions, and a mocked Web Audio lifecycle check covering all sound recipes, first-gesture startup, volume clamping, mute, repeated-cue throttling, and hidden-tab source cleanup. No game simulation formulas were changed. Real browser playback, listening quality, device volume, and iPad/Android audio behavior remain unverified in this environment.
