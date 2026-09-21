# Wizard Academy — The First Charter

Version **1.0.0**. A build-free, single-player, generational academy game for GitHub Pages. Firebase email/password authentication and private Firestore saves are integrated using the supplied project configuration.

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
- Real-time autonomous dungeon fights, 1×/2×/4× viewing, formations, four directives, persistent expedition HP/mana, choice rooms, shrines, traps, treasure, elites, bosses, and permanent combat death.
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
| sports.js | Round-robin league, match simulation, playoffs, seasons, promotion |
| simulation.js | Elapsed time, production, aging, events, social interaction |
| persistence.js | IndexedDB, Firebase, revision conflicts, archives, backup |
| firebase-config.js, firestore.rules | Public configuration and private UID access rules |
| tests.mjs, ui-tests.mjs | Executable simulation regressions and DOM-stub panel rendering checks |
| VALIDATION.md | Verification results and remaining limitations |

Optional local verification, if a computer is available: `node tests.mjs`. The game itself does not require Node. For local HTTP testing: `python3 -m http.server 8080`, then visit `http://localhost:8080`.

The Firebase browser SDK is pinned to 11.10.0 and loaded only for cloud accounts. Fonts are optional remote enhancements with serif/system fallbacks. All room and character artwork is code-drawn; no external image library is required.

The save format starts at schema 1. Future schema versions must introduce an explicit migration before changing existing field meanings; the current loader refuses newer incompatible saves.

Architecture references: [Firebase password authentication](https://firebase.google.com/docs/auth/web/password-auth), [atomic Firestore transactions](https://firebase.google.com/docs/firestore/manage-data/transactions), [security rules and authenticated ownership](https://firebase.google.com/docs/rules/basics).
