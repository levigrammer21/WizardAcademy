// Presentation-only pacing: production and combat balance retain simulation time.
export const COMBAT_PACE = 0.5;
export const COMBAT_SPEEDS = [0.5, 1, 2];
export function advanceCombatPlayback(state, elapsedSeconds, step) {
  const combat = state.combat;
  if (!combat || combat.state !== 'fighting') return;
  const speed = COMBAT_SPEEDS.includes(combat.speed) ? combat.speed : 1;
  let remaining = Math.max(0, Math.min(0.25, elapsedSeconds)) * COMBAT_PACE * speed;
  while (remaining > 0 && state.combat?.state === 'fighting') {
    const dt = Math.min(0.25, remaining);
    step(state, dt);
    remaining -= dt;
  }
}
