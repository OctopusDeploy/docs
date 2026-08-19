# What Pagefind's own Component UI does that ours does not

Reviewed against `pagefind-ui` 1.5.2 and the Build Your Own guidance, to check
whether the hand-built overlay is missing anything its authors considered
necessary. Two things, both small. Everything else it does, ours already does or
deliberately does differently.

## Already matched or ahead

| Component UI                                                     | Ours                                                           |
| ---------------------------------------------------------------- | -------------------------------------------------------------- |
| `<pagefind-input>` debounces 300ms, `<pagefind-searchbox>` 150ms | 150ms                                                          |
| No minimum query length                                          | 3 characters, measured: cuts keystroke p95 from 927ms to 347ms |
| `max-sub-results` defaults to 3                                  | 2, on the leading 3 rows only                                  |
| `preload` loads the index on focus                               | eager, plus a preload on open intent                           |
| ARIA combobox, `role="option"`, `aria-selected`                  | same                                                           |

## Gap 1 — no announcement to a screen reader

The overlay carries the combobox roles but has no live region, so a screen
reader user gets the roles without ever being told what happened: how many
results arrived, or that none did. Pagefind's component announces both.

`src/components/DocsSearch.astro`, after the `docs-search__empty` paragraph:

```html
<p
  class="docs-search__announce"
  role="status"
  aria-live="polite"
  data-docs-search-announce
></p>
```

Styled off-screen rather than `hidden`, which would take it out of the
accessibility tree along with everything else:

```css
.docs-search__announce {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

`src/scripts/docs-search.ts`, in `render()` beside the other state lines near
`input.setAttribute('aria-expanded', ...)`:

```ts
announce!.textContent = !hasQuery
  ? ''
  : hasResults
    ? `${response.results.length} results for ${input!.value.trim()}`
    : `No results for ${input!.value.trim()}`;
```

`render()` runs once per settled query, so this speaks at the same rate the
results themselves change.

## Gap 2 — thirty results and no way past

The component loads five at a time and extends the list when the down arrow
reaches the last row. Ours stops at thirty with nothing to say so. Rare on the
traffic seen so far, and worth a line of footer text more than a paging
mechanism.

## Tested and rejected — lazy fragment loading

The component fetches a result's data only when its row scrolls into view. Ours
fetches all thirty on every query, and that is where its stalls come from: p95
goes 149ms to 587ms between zero fragments and thirty, while the median moves
34ms.

It cannot copy the behaviour. The reorder that fixed the landing-page defect
needs a URL and title, and both arrive with the fragment, so a smaller fetch is
a smaller pool to promote out of. Measured on the 57 real search terms:

| Pool | Success@1 | Success@5 | MRR   |
| ---- | --------- | --------- | ----- |
| 30   | 52%       | 81%       | 0.644 |
| 20   | 47%       | 76%       | 0.594 |
| 10   | 45%       | 69%       | 0.549 |
| 5    | 34%       | 52%       | 0.414 |

Twelve points of Success@5 to save roughly 200ms of tail. Thirty stays.

## Adopting the components wholesale

Ruled out. They would replace the reorder, the score floor, the section
grouping, the minimum query length and the design-system styling — every part
that the measurements say is carrying the result quality. Build Your Own is the
right side of that fork and we are already on it.
