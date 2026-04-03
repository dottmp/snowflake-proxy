/**
 * Animates ASCII art text into a <pre> pre, chunk by chunk.
 *
 * @param {HTMLPreElement} pre        - Target <pre> pre
 * @param {string}         text      - Full ASCII art string to print
 * @param {object}         [options]
 * @param {number}         [options.chunkSize=16]  - Characters printed per tick
 * @param {number}         [options.delay=0]       - ms between ticks (0 = rAF)
 * @param {Function}       [options.oncomplete]    - Called when printing finishes
 */
export function asciiPrint(
  pre,
  text,
  { chunkSize = 16, delay = 0, oncomplete } = {},
) {
  const chars = [...text].reverse();

  let banner = "";

  function tick() {
    const chunk = Array(chunkSize)
      .fill(null)
      .map(() => chars.pop() ?? "")
      .join("");

    if (!chunk) {
      pre.textContent = banner;
      oncomplete?.();
      return;
    }

    banner += chunk;
    pre.textContent = banner + "█";

    if (delay > 0) {
      setTimeout(tick, delay);
    } else {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
