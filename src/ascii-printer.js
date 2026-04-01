/**
 * Animates ASCII art text into a <pre> element, chunk by chunk.
 *
 * @param {HTMLPreElement} el        - Target <pre> element
 * @param {string}         text      - Full ASCII art string to print
 * @param {object}         [options]
 * @param {number}         [options.chunkSize=16]  - Characters printed per tick
 * @param {number}         [options.delay=0]       - ms between ticks (0 = rAF)
 * @param {Function}       [options.oncomplete]    - Called when printing finishes
 */
export function asciiPrint(el, text, { chunkSize = 16, delay = 0, oncomplete } = {}) {
	const chars = [...text].reverse();
	let banner = '';

	const tick = () => {
		const chunk = Array(chunkSize)
			.fill(null)
			.map(() => chars.pop() ?? '')
			.join('');

		if (!chunk) {
			el.textContent = banner;
			oncomplete?.();
			return;
		}

		banner += chunk;
		el.textContent = banner + '█';

		if (delay > 0) {
			setTimeout(tick, delay);
		} else {
			requestAnimationFrame(tick);
		}
	};

	requestAnimationFrame(tick);
}
