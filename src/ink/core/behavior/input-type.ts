// a11y: reflect the active input modality as a class on <body> (input-keyboard /
// input-mouse / input-touch) so focus styling can adapt. Self-contained.
let current = 'input-none';

function apply(next: string): void {
  if (next === current) return;
  document.body.classList.remove(current);
  document.body.classList.add(next);
  current = next;
}

export function monitorInputType(): void {
  window.addEventListener('keydown', () => apply('input-keyboard'));
  window.addEventListener('mousemove', () => apply('input-mouse'));
  window.addEventListener('touchstart', () => apply('input-touch'), {
    passive: true,
  });
}
