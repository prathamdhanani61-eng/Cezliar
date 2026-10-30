// Copies text and reports whether it worked. The synchronous copy finishes before a link
// that was clicked opens its new tab; the async Clipboard API is the fallback.
export function copyText(text) {
  const active = document.activeElement;
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, text.length);
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  area.remove();
  active?.focus?.({ preventScroll: true });
  if (copied) return true;
  if (!navigator.clipboard) return false;
  navigator.clipboard.writeText(text).catch(() => {});
  return true;
}
