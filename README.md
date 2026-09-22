# Wizard Academy — The First Charter

Version **1.7.0**. A build-free, single-player, generational academy game for GitHub Pages. Firebase email/password authentication and private Firestore saves are integrated using the supplied project configuration.

## Put it online from your phone or iPad

1. Unzip this download.
2. Upload **all files directly into your GitHub repository root**. `index.html`, all JavaScript files, and `style.css` must sit beside one another. There are no required subfolders.
3. In GitHub repository **Settings → Pages**, publish from your branch and **/ (root)**. No build command, npm installation, server credentials, or Firebase hosting is required.
4. In [Firebase Console](https://console.firebase.google.com/), open **wizardacademy-ef68b**.
5. In **Authentication → Sign-in method**, enable **Email/Password**.
6. In **Firestore Database**, create the default database if it does not already exist. Open its **Rules** tab, replace the rules with the exact contents of **firestore.rules**, and publish them.
7. Under **Authentication → Settings → Authorized domains**, add your GitHub Pages hostname, such as `levigrammer21.github.io`, and your custom hostname if you use one. Enter a hostname, not a repository path.
8. Open your published GitHub Pages address, create an account, and sign the founding charter.

These console settings and deployed rules cannot be configured by uploading game files to GitHub. They need to be set in your Firebase project once. The app reports authentication and permission errors with corrective instructions.

**Local play** is also available on the opening screen. It does not use Firebase and stays on the current browser. It is useful for playing immediately, but local and cloud academies are separate. Export backups from Front Desk → Settings & save. Local backup import does not overwrite a cloud academy.

Do not open `index.html` directly as a `file://` file; JavaScript modules require an HTTP(S) origin. GitHub Pages supplies this.

## Your first ten minutes

- Open the academy to establish its five basic rooms.
- Tap **Front Desk** and recruit the first five wizards for free. They receive founding-generation status.
- Open **Practice Hall** (120 gold), **Rune Chamber** (140), and **Arcane Rift** (160).
- Initial recruits fill the first three dungeon party slots and five Rift lineup slots. Review their positions and abilities.
- Assign a wizard to training, another to making unscribed runes, and another to clerical work if money is tight. Regular jobs do not prevent sport participation.
- Tap **Belowstairs**. Take a healthy party of three to floor 1. You do not need equipment or runes for Magic Missile.
- After a floor, choose whether to advance, use a potion, or return. There is no automatic progression into unknown floors.
- Find equipment, inspect it in **The Strongroom**, and equip it to create builds. Inscribe that family’s rune charges before expecting its special spells to work.
- Make sure Arcane Rift has five distinct healthy starters before the first match, about 85 minutes into the first Academy Year. A team cannot compete before its facility opens.

## What is playable

- An illustrated cutaway academy with twelve environmental navigation locations, animated individual wizards, workplace assignments, contextual speech, and a chronicle.
- Recruitment from a yearly Prestige-sensitive applicant pool; five starting beds; expansions up to thirty active beds; generated appearance, traits, base statistics, natural sport potential, relationships, aging, retirement, faculty, natural death, and permanent records.
- Real-time autonomous dungeon fights, Relaxed/Normal/Fast viewing, formations, four directives, persistent expedition HP/mana, choice rooms, shrines, traps, treasure, elites, bosses, and permanent combat death.
- Ten magic families; three interchangeable equipment slots; procedural loot with six rarities; twelve affix types; healing, cleansing, shielding, taunting, summoning, damage-over-time, slow, shock, curse, blessing, and equipment interactions.
- Lognormal statistical rolls with **no designed roll ceiling**. HP, mana, defense, and power roll independently. Items remember where, when, and by whom they were found and their previous wielders.
- Ten recurring boss archetypes with recognizable second phases and six signature drops each. Boss depth drives base strength and rarity distribution. Every boss attempt costs a seal.
- Unscribed rune manufacture, three inscription tiers, 12 charges per inscribed rune, automatic seal binding, potions, training, research, administrative income, injuries, and treatment.
- Cleared-floor and defeated-boss patrols. These use real combat and can lose wizards. Paid delayed retrieval and manual recovery of lost equipment preserve item identities.
- 32 persistent academies in four eight-team leagues. Each season includes 14 regular rounds, semifinals, and finals; one promotion and one relegation at each boundary; changing AI generations; lineup positions, three tactical axes, substitutes, play-by-play replay, statistics, awards, head-to-head records, and permanent season archives.
- Thirty authored event scenarios plus a delayed multi-year discovery; contextual conversations; 32 achievements; 40+ career statistic categories; item record books; top-25 academy boards; top-50 league careers; current-year statistics; archived careers; and a separate permanent Hall of Names register.
- Local IndexedDB saves, UID-owned cloud saves, local/cloud conflict protection, complete history exports, local restoration, schema versioning, capped offline catch-up, and paginated history.

## Time and stakes

**24 elapsed real hours = one Academy Year and one Rift season.** While away, at most **12 hours** advance. If absent longer, the whole academy calendar pauses beyond that cap, including aging and seasons. This is intentional: a month away does not kill a generation while granting only half a day of production. Seasons are relative to the academy’s founding time, not UTC midnight.

Matches resolve deterministically when the browser advances the elapsed calendar; no always-on backend process is needed. All eligible scheduled games in the credited offline window resolve on return. Unknown-floor combat is paused when the page is hidden. It never resolves automatically while away. Previously cleared patrols do.

A fallen wizard is permanently dead even if their companions survive. Equipment is left in a cache; a surviving party that clears that exact floor can recover it immediately. Otherwise use the retrieval service or another party. Low-health retreating survivors can suffer injuries. Rest, an infirmary assignment, and potions help recovery.

## Runes and builds

Each equipped focus, robe, or charm adds its family’s ability. Casts require mana and the corresponding family/tier charges. Tier II inscription needs level 10; tier III needs level 25. Items found from floor 25 use tier II; items from floor 60 use tier III. Magic Missile is free.

Higher-rarity items gain more affixes. Summons can gain an extra slot, stronger damage, and death explosions. Other affixes add life-drain, echoed damage, mana efficiency, haste, on-kill mana recovery, barriers on healing, and bonuses against afflicted targets. All displayed affixes have implemented effects.

Power rolls use an independent normal variate transformed into a positive lognormal distribution. Typical results cluster around the baseline; rarer outliers extend above it. There is no `maxRoll` or percentage-of-perfect display. Numerical precision and pseudorandom resolution remain finite, as in any browser simulation. Non-finite roll samples are rejected, not clamped to a designed ceiling.

## Inventory and history at scale

The active strongroom holds up to 180 items. Additional unequipped items are **shelved**, never deleted. Locked items are skipped when possible; if every unequipped item is locked, shelving still preserves the complete item and its lock. Withdraw shelved items through Deep Storage. Keep free space if you plan to withdraw an heirloom.

Firestore stores one live game document and individual history documents. All previous seasons, career records, match play-by-play, significant conversations, item provenance, memorial honors, and chronicle entries are separate. The interface loads archive pages of 30 records rather than loading the entire institution. Each season contains all teams’ final tables, brackets, rosters, movements, and player statistics; its screen shows leading statistics and your replay links. Export retains the full archive.

All-time academy boards retain the top 25 careers per category; league career boards retain the leading 50. These boards are intentionally aggregated, not a full-database query UI. Deceased boards filter those retained leaders. All other careers remain accessible in the paginated archives and complete backup. Hall of Fame portraits and records remain after death.

## Save behavior

- Local snapshots are saved every ten seconds, about every 2.5 seconds during combat, and after decisions. Browsers cannot guarantee that an asynchronous write completes after force-closing the process; abrupt termination may lose the last few seconds.
- Cloud saves are attempted about once per minute and on consequential actions. Animations are never written to Firestore.
- Live state, random-generator state, combat cooldowns, and archive updates are transactionally committed to Firestore with a revision check. Identical archive IDs make retried writes idempotent.
- Up to 350 archive updates commit alongside a state snapshot; remaining entries stay in the snapshot’s durable outbox until the next save.
- Browser Web Locks prevent two local tabs from playing the same academy at once where supported. Cross-device revisions prevent stale sessions from silently overwriting newer progress.
- On a revision conflict, the session pauses. Export that session if needed, then reload the cloud save. A superseded local device snapshot is retained and can be downloaded in Settings.
- The Firebase API key is public client configuration, not a private server credential. The included rules restrict data to the matching authenticated UID. They do **not** turn this client simulation into a cheat-proof authoritative multiplayer server. Client clock rollback is ignored and forward credit is capped, but a determined owner can modify their own game data.

## Developer notes

Everything is in the root:

| File | Responsibility |
| --- | --- |
| index.html, style.css | Entry point and responsive presentation |
| app.js | Panels, touch interactions, game loop, authentication UI |
| academy.js | Vector room illustrations, portraits, corridor animation |
| data.js | Families, names, traits, schools, bosses, events, dialogue, achievements |
| model.js | Core state, random generation, items, records, lifecycle operations |
| combat.js | Encounter state, ability AI, status effects, deaths, caches, patrols |
| arena.js, combat-events.js, playback.js | Animated arena, transient action events, comfortable combat pacing |
| sports.js | Round-robin league, match simulation, playoffs, seasons, promotion |
| simulation.js | Elapsed time, production, aging, events, social interaction |
| persistence.js | IndexedDB, Firebase, revision conflicts, archives, backup |
| firebase-config.js, firestore.rules | Public configuration and private UID access rules |
| tests.mjs, ui-tests.mjs, arena-tests.mjs | Executable simulation regressions and DOM-stub panel rendering checks |
| VALIDATION.md | Verification results and remaining limitations |

Optional local verification, if a computer is available: `npm test`. The game itself does not require Node. For local HTTP testing: `python3 -m http.server 8080`, then visit `http://localhost:8080`.

The Firebase browser SDK is pinned to 11.10.0 and loaded only for cloud accounts. Fonts are optional remote enhancements with serif/system fallbacks. All room and character artwork is code-drawn; no external image library is required.

The save format starts at schema 1. Future schema versions must introduce an explicit migration before changing existing field meanings; the current loader refuses newer incompatible saves.

Architecture references: [Firebase password authentication](https://firebase.google.com/docs/auth/web/password-auth), [atomic Firestore transactions](https://firebase.google.com/docs/firestore/manage-data/transactions), [security rules and authenticated ownership](https://firebase.google.com/docs/rules/basics).

## Updating from 1.0.0 or 1.0.1

Upload every file from this archive directly to the same GitHub repository root, replacing existing files. Include the new **arena.js** and **combat-events.js**, as well as **playback.js**. Keep your Firebase configuration. Existing saves and in-progress expeditions remain compatible; no reset or database change is needed. Refresh after GitHub Pages finishes updating.

The dungeon now has five room themes, wandering wizards and monsters, caster-to-target projectiles, ally healing, visible skeleton summons, shields, impact numbers, status effects, and boss phase announcements. Movement is presentation only: front/middle/back targeting, equipment, spells, damage, rewards, and permanent death retain the same rules. Normal, Relaxed, and Fast retain the calmer 1.0.1 pacing. Front Desk → Settings → Academy & combat motion can reduce movement; system reduced-motion preferences also apply to combat. Exact unit statistics remain in “Party & enemy condition,” with the combat ledger below.

## Live work progress (1.1.1)

Include the new root-level tasks.js module when updating. Each assignment, active roster card, and wizard profile now shows the real job, a gently advancing progress bar, remaining time, and batch output/cost. Inscription, unscribed runes, Boss Seals, potions, research, clerical work, adventure training, Rift practice, recovery, and scheduled patrols have contextual progress. Training bars track the next level; recovery bars track HP/mana with injury ETA in text. Missing resources and patrol eligibility are stated explicitly. Production repeats automatically. Cycle times include current facility, faculty, trait, and injury modifiers. Supply contention and changes to assignments or bonuses can change estimates. Changing inscription tier starts that tier’s batch afresh. Existing saves require no reset.

## Arcane Rift broadcast (1.2.0)

Upload the complete root files, including jerseys.js and rift-motion.js. The academy header now features regular-season wins/losses, league position, next opponent, and a live countdown. Use the strip to enter Arcane Rift or watch the latest recording. Eliminated teams see next season’s first match window.

Assign unique numbers 0–99 in Arcane Rift → Lineup & tactics, or a wizard’s profile. Existing active wizards receive free numbers automatically, without resetting progress. Retired wizards release their active number; historical recordings retain the uniform at match time. Older recordings use labeled fallback display numbers.

The broadcast shows smooth numbered dots, controller-to-striker passes, shots, defender interceptions/saves, and scores on resolution. A possession takes 3.6 presentation seconds. Pause, next play, and final-score controls remain available. The simulation still resolves scheduled results once; this is smooth playback of that outcome, not a separate multiplayer/server-live match. Keep Match Theatre open to start the next scheduled player match automatically when it resolves. Reduced-motion preferences are honored. Playback pauses while the page is hidden.

Current active capacity is 30 at Dormitory tier VI (five beds per tier). Retired wizards and faculty do not consume active beds.

## Shared workshop production (1.3.0)

In the Rune Chamber, tap **Inscribe** beside a family in the rune-charge table. Select the tier, then check the wizards to assign. The picker shows every active wizard’s current job and marks unavailable/under-level workers. Apply moves selected wizards to that recipe; unchecked current workers rest. Cancel/Back leaves assignments unchanged. Wizards away on expeditions cannot be moved.

Each recipe and rune tier has one saved progress pool. Worker effectiveness adds together: three equally fast wizards complete one batch in one-third the solo time. The room shows only its local tasks, assigned names, shared progress, batch output/cost, and combined cycle time. This applies to blank runes, inscription, seals, potion brewing, research, and clerical work. Training/recovery stay individual and their rooms only show assigned wizards. Dorms retain the entire roster and its jobs.

Existing partial production is migrated once into the matching shared recipe without resetting your academy. Removing workers pauses a recipe without erasing progress. Insufficient materials bank at most one ready batch; resupplying does not grant a stockpile of unfunded output. Career production credit and inscription XP are shared according to worker contribution. Shared work persists through offline catch-up and reloads.

Upload all files, including the new **workers.js** module. This release changes saved production behavior; continue using 1.3.0 or later after upgrading.

## Compact Strongroom (1.3.1)

Equipment now occupies a four-column grid of compact 112–116px tiles. Eight items fit in two rows, with names, family glyphs, rarity, power, depth, and equipped/locked indicators. Tap anywhere on an item to open all stats, spell details, affixes, ownership, provenance, and comparison/equipment controls. Back to Strongroom retains filters, page, and inventory scroll. Other room cards remain unchanged.

Every generated combat item currently grants its magic family’s spell. The generator has 10 prefixes × 10 families × 12 slot-specific nouns = 1,200 ordinary name combinations. Ten boss tables contain six drops apiece but reuse the same six signature names. Rolled statistics, depth, rarity, and affixes make individual copies different; there is no finite collectible catalogue of fixed-stat items.

## Academy soundscape (1.4.0)

Upload every root file, including **sound.js**. Audio is synthesized with the browser’s Web Audio API, with no external sound files or runtime downloads. The first tap/key press enables playback when supported. Use the header Sound on/Muted button for quick mute, or Front Desk → Settings & save → Sound & music for separate master, effects, ambience, and music controls. Preferences persist with the academy.

Sound covers interface selection, closing panels, distinct room arrivals, production, equipment, purchases, recruits, upgrades, levels, loot, combat spell families/impacts/heals/shields/summons/deaths/results, and Rift passes/shots/saves/fouls. Room ambience and a sparse musical sequence accompany the academy; music yields to combat and match effects. Repeated cues are rate-limited and voice count is capped. Sound generation never consumes simulation randomness or changes rewards.

Audio stops when the tab is hidden. Returning waits for a tap/key press to resume; missed effects and offline production are not replayed. Volume starts conservatively. Unsupported or blocked audio leaves the game playable.

## Emergency admissions (1.4.1)

When active enrollment falls below five, Emergency Recruit appears in Front Desk admissions, Arcane Rift league/lineup, and the dungeon gate. One tap recruits the shortfall immediately and free, without using up the regular applicant pool. These basic recruits start at adventure/Rift level 1, with modest natural stats, potential 35–45, and no equipment or Prestige boost. They retain full careers and can develop normally.

Vacant, deceased, retired, or duplicate starter slots are filled from available recruits/current wizards; existing active starters remain. Unique jerseys are assigned normally. The button stops at five active wizards, even with a larger Dormitory. Injuries and expedition absences do not create extra enrollment capacity. Dead wizards remain dead and past forfeits remain recorded. You still need an open Rift facility. Recruitment is manual, not automatic while offline.

At match time, configured eligible bench players replace missing starters. If fewer than five eligible players remain against a complete opponent, the match is forfeited 5–0.

## Living academy and tutorial missions (1.7.0)

Upload all root files, including new **room-life.js** and **tutorial.js**. Wizards spend longer at their work stations between walks. Stationary workers shoot practice bolts at the dummy, inscribe floating rune shapes, bind seals, stir bubbling potions, study orbiting research lights, recover beneath healing signs, practice with a Rift mote, write paperwork, and read in dorms. Faculty hold teaching books. Activities are decorative and respect reduced-motion preferences; they do not alter production rates or combat.

Combat now distinguishes Magic Missile’s small mote from fire flames, frost shards, lightning strokes, nature leaves, shadow crescents, radiant stars, arcane sigils, necromantic skulls, healing crosses, and shield runes. Existing cooldowns, hitsplats, and no-flash presentation remain.

The grounds show the current First Charter mission, a direct room link, and a one-time gold reward after its objective is met. Eleven core missions guide opening, recruitment, training, rune production, inscription, party selection, the first floor, returning home, opening Rift, and a valid lineup. Three optional follow-ups cover equipment, the first scheduled match, and seals. Random loot and scheduled-match waits do not block the core tutorial. Progress, completed objectives, claimed rewards, and the hide-guide setting persist in existing saves without resetting the academy.

Open the Mission Journal from the banner or Front Desk → Headmaster’s handbook → Open tutorial missions. You can hide the grounds guide and revisit it later. Objectives already met are recognized; rewards cannot be claimed repeatedly.


## Version 1.6: reward feedback and Dueling Club

The grounds now include Highlights. Open it for recent item reveals and level gains; Mark all as read clears the notification count. Level notifications aggregate while away. Rare-item labels show conditional equipment probabilities; equipment itself still needs to drop. Older equipment keeps its original stats.

Open Practice Hall → Enter the club. Choose a healthy wizard and challenge the next unlocked opponent. Each bout uses an isolated warded copy of the selected build, with full vitals and practice runes. The original continues their academy work. Return any active expedition before beginning. Beat three challengers per rank; twelve victories earn Club Champion. First-win prizes are one-time per academy. Rematches improve best times and career records but award no repeat gold or XP. Closing the panel leaves the bout running while the browser is visible; reopen Practice Hall to watch or concede. Hidden-tab time does not auto-resolve bouts.

Install by replacing all root files with this release. Additive save fields load automatically. Firebase configuration and security rules are unchanged. No dependency installation or build is needed to play.


## Install on Samsung or iPad (v1.7)

Upload **all** files in the ZIP to the GitHub repository root, including `sw.js`, `pwa.js`, `manifest.webmanifest`, and both PNG icons. Visit the HTTPS GitHub Pages address online and let the app finish caching.

- Samsung/Android: Front Desk → Settings & save → Install & app updates → Install app. If the browser does not offer a prompt, use its menu → Install app / Add to Home screen.
- iPad: open the published address in Safari → Share → Add to Home Screen. Leave Open as Web App enabled when offered, then tap Add.
- This is an installed Progressive Web App, not an APK or App Store package. It launches from its own icon in a standalone window. Local play can reopen offline after caching; cloud sign-in/sync need internet.
- Cloud players: save first, then use the same account in the installed app. Local players: export a complete backup first. Some platforms separate installed-app storage; if the academy does not appear, restore that backup from Settings & save. Installation never intentionally resets a save.
- To load a published update, use Install & app updates → Save & reload update when it appears, or close all academy browser/app windows and reopen. Upload the entire release before reopening. Future releases must change the service worker cache version. Updates never auto-reload an active fight.

## Equip from a wizard profile

Open Dorms → wizard → tap Focus, Robe, or Charm. Choose a matching item tile; compare item numbers, family spell, affixes, and whole-wizard totals, then Equip. Full item details returns to that comparison. Items assigned to someone else are labeled and cannot be stolen; unequip from their owner first. Withdraw archived equipment from Strongroom → Deep storage before equipping it.


## Version 1.8: wizard organization

Dorms now shows compact equipment-focused cards, custom labels, and a tag filter. Open Profile & tags to add or remove up to six labels; equipment is near the top. Work progress and full career statistics can be expanded. Arcane Rift → Lineup → Set best lineup fills positions by maximum total current position rating and chooses reserves. It is a one-time selection, not an ongoing automatic lineup rule; rerun after injuries, recruitment, or equipment changes. Ratings do not guarantee wins.
