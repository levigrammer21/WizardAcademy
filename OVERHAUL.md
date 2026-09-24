# Wizard Academy 2.1 — wizard careers and Enchanted Forest

Put every file in this ZIP at the repository root, except images if you add them to `img/`. Publish all files together so the installed app refreshes as one release. Existing schema-1 local and Firebase saves migrate in place. Export a backup before replacing the live site.

## Play loop

Open Belowstairs → Enchanted Forest. Assign a wizard to one of nine regions. The watcher uses the same animated combat canvas as the Dungeon: a forest background, distinct creature silhouettes, moving combatants, spells, impacts, damage numbers and health bars. Select which wizard to watch. Battles occur on a 90-second cycle and continue while another room is open or while offline, within the existing 12-hour cap. Forest defeat carts the wizard out and requires payment; dungeon death remains permanent.

Normal kills yield creature materials and skill XP. A rare exceptional encounter can yield equipment. Drops enter a personal backpack first; manually transfer materials and carried equipment to the Strongroom after returning. Backpack capacity and rules for retreat, potion use, loot selection and full packs are set per wizard. Strongroom materials make potions, Boss Seals and unscribed runes. Academy work assignments also gather, process and teach automatically.

## Careers and history

Fifteen skills gain XP by relevant activities, with aptitude differences, level unlocks and level-99 mastery without a hard cap. Spells remain tied to equipped items and rune supplies; repeated casting develops magical specialization. Wizard tabs separate overview, skills, magic, equipment, inventory, relationships and history. A mentor improves a disciple's compatible study while working together. Ambitions, milestones, retirement, relationships and archival records persist. Notable equipment tracks owners and selected achievements. The three existing equipment slots and uncapped procedural rolls remain.

All 31 rival schools develop bounded institutional strengths, reported dungeon depth, notable wizards and annual headlines alongside their existing persistent Rift rosters. Their profiles open from the Front Desk. Academy reputation in Academic, Dungeon, Rift, Research, Safety and Wealth influences some applicant traits and aptitudes. Rival dungeon depth is simulated as an institutional result; their fights are not rendered as player-equivalent parties.

## Technical behavior

Forest combat state is persisted for active hunters and consumed by the existing arena renderer. It uses compact event steps and bounded histories; no per-creature archive writes. Thirty continuous hunters in a 12-hour local stress run completed in about 0.2 seconds and kept the active state around 126 KB. The cloud revision lock and 850 KB save guard remain. Forest combat never clears dungeon floors.

## Verification

Run `npm test` and `node overhaul-tests.mjs` from the repository root. Tests cover legacy save defaults, online/offline equivalence, rescue, personal item custody, material work, UI rendering and the existing combat/sport/production systems. The canvas is shared with the Dungeon, with added forest backgrounds and creature art; it requires a browser with Canvas support.
