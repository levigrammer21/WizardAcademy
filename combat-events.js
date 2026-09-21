// Transient presentation events: never consume game RNG, allocate game IDs, or enter saves.
// Weak keys allow finished/background patrol encounters to be garbage-collected.
const streams = new WeakMap();
export function emitCombatEvent(combat, event) {
  let stream = streams.get(combat);
  if (!stream) { stream = {sequence:0, events:[]}; streams.set(combat, stream); }
  stream.events.push({...event, sequence:++stream.sequence, time:combat.time});
  if (stream.events.length > 160) stream.events.splice(0, stream.events.length - 160);
}
export function combatEventsAfter(combat, sequence=0) {
  return (streams.get(combat)?.events || []).filter(event=>event.sequence>sequence);
}
export function combatEventSequence(combat) { return streams.get(combat)?.sequence || 0; }
