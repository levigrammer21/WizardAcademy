# Wizard and Forest overhaul (2.0)

Install the root files together. Keep the PWA service worker and both new modules at the repository root. Existing schema-1 saves and backup imports load unchanged; the new wizard fields and materials are initialized on load. Export a backup before publishing new files.

## Integrated systems

- Fifteen activity-based skills; individual aptitudes and unlock milestones; level 99 mastery without a cap. Existing adventure and Rift levels still work.
- Spells still come from equipment and use the existing mana and rune rules. Casting now develops associated magical skills and earned specializations.
- Nine discovered forest regions with repeatable 90-second encounters, creature materials, injuries avoided through retreat rules, and paid nonlethal rescue. The same simulation advances online and offline within the existing 12-hour cap. Forest encounters never clear dungeon floors.
- Personal material backpacks, capacity, return or drop behavior, Strongroom transfer, and simple material processing. Existing procedural equipment remains in institutional storage and retains owner history.
- Master/apprentice relationships accelerate a disciple's skill only while studying or working alongside a more skilled mentor. Personal ambitions, milestone notes, retirement, and archives retain their story.
- The forest opens through the existing dungeon gate. Wizard profile tabs expose skills, spells, pack, mentor, and legacy. Forest controls are persistent per wizard.

## Scope and current limits

The forest shows live encounter timing, health, and outcomes in its panel; it does not use the dungeon's animated combat arena. Forest drops are materials, while rare forest equipment encounters and a broad crafting tree are future additions. Rival academy institutions and multi-dimensional reputation retain their existing Rift histories but do not yet have independent dungeon or research simulations. Equipment provenance records wielders and years, but kill attribution per item is not recorded. Old recruits receive neutral skill aptitudes; new recruits have one gift and one weakness. The three existing equipment slots remain unchanged.

## Performance and saves

No individual encounter is archived. Forest activity is simulated in 90-second batches; only major milestones and rescues enter the Chronicle. Personal packs and skill values live in the existing wizard records. Cloud save revision checks and the 850 KB active-save limit remain in force. The app caches new root modules in the versioned service worker.
