/**
 * Generates public/docs/css/design-tokens.css from
 * @octopusdeploy/design-system-tokens.
 *
 * The tokens package ships no CSS of its own. Its ergonomic exports
 * (themeTokens, text, fontFamily) resolve to `var(--name)` strings, while
 * lightTheme / darkTheme / textTheme are the matching name -> value maps that a
 * consumer is expected to paint into a :root block. In the Octopus app that job
 * belongs to the Theme component in @octopusdeploy/design-system-components.
 * This docs site has no React runtime, so we emit the same custom properties as
 * a static stylesheet instead.
 *
 * Run via `npm run tokens`. Do not edit the generated CSS by hand.
 *
 * @format
 */

import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';

// The tokens package is CommonJS and re-exports lightTheme / darkTheme through
// tslib's __exportStar, which Node's ESM-CJS interop cannot statically detect -
// named ESM imports of those come back undefined. createRequire sidesteps it.
const require = createRequire(import.meta.url);
const tokens = require('@octopusdeploy/design-system-tokens');

// "exports" is a bare string, so no subpath - including ./package.json - is
// exported. Resolve the entry point and walk back up to the package root to
// read the version we generated from.
const entryPoint = require.resolve('@octopusdeploy/design-system-tokens');
const packageRoot = path.resolve(entryPoint, '..', '..', '..');
const { version } = JSON.parse(
    await fs.readFile(path.join(packageRoot, 'package.json'), 'utf8')
);

const workingDirectory = process.cwd();
const outputFile = path.join(
    workingDirectory,
    'public',
    'docs',
    'css',
    'design-tokens.css'
);

// The dark theme is applied with the same selector vars.css already uses, so
// both stylesheets switch off the existing theme toggle.
const darkSelector = "html[data-theme='dark']";

// Theme-invariant scales. The package exposes these as plain literals rather
// than var() references, so it defines no custom property names for them -
// these ones are ours, kept in the package's camelCase style for consistency.
const scales = {
    space: tokens.space,
    borderRadius: tokens.borderRadius,
    borderWidth: tokens.borderWidth,
    fontSize: tokens.fontSize,
    fontWeight: tokens.fontWeight,
    lineHeight: tokens.lineHeight,
    letterSpacing: tokens.letterSpacing,
};

function declaration(name, value) {
    return `  --${name}: ${value};`;
}

function block(selector, lines) {
    return `${selector} {\n${lines.join('\n')}\n}`;
}

// Several scales are keyed by number (space, borderWidth, fontWeight), where a
// plain lexicographic sort would read 1, 12, 16, 2, 24.
function sortKeys(keys) {
    return [...keys].sort((a, b) =>
        /^\d+$/.test(a) && /^\d+$/.test(b)
            ? Number(a) - Number(b)
            : a.localeCompare(b)
    );
}

function scaleDeclarations() {
    const lines = [];

    for (const [group, values] of Object.entries(scales)) {
        for (const key of sortKeys(Object.keys(values))) {
            lines.push(declaration(`${group}-${key}`, values[key]));
        }
    }

    return lines;
}

function themeDeclarations(theme) {
    return Object.keys(theme)
        .sort()
        .map((key) => declaration(key, theme[key]));
}

// Only the keys that actually differ need repeating in the dark block.
function darkOverrides(light, dark) {
    return Object.keys(dark)
        .sort()
        .filter((key) => light[key] !== dark[key])
        .map((key) => declaration(key, dark[key]));
}

const { lightTheme, darkTheme, textTheme } = tokens;

const rootLines = [
    '  /* Typography composites and font families (textTheme) */',
    ...themeDeclarations(textTheme),
    '',
    '  /* Theme-invariant scales */',
    ...scaleDeclarations(),
    '',
    '  /* Colors and shadows (lightTheme) */',
    ...themeDeclarations(lightTheme),
];

const darkLines = darkOverrides(lightTheme, darkTheme);

const header = [
    '/*',
    ' * GENERATED FILE - DO NOT EDIT.',
    ' *',
    ' * Source: @octopusdeploy/design-system-tokens@' + version,
    ' * Regenerate with: npm run tokens',
    ' *',
    ' * Site-specific variables live in vars.css, which is loaded after this',
    ' * file and therefore wins on any name it also defines.',
    ' */',
].join('\n');

const css =
    [header, block(':root', rootLines), block(darkSelector, darkLines)].join(
        '\n\n'
    ) + '\n';

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, css, 'utf8');

const counts = {
    'text/font': Object.keys(textTheme).length,
    scales: scaleDeclarations().length,
    'light colors/shadows': Object.keys(lightTheme).length,
    'dark overrides': darkLines.length,
};

console.log(
    `Generated ${path.relative(workingDirectory, outputFile)} from @octopusdeploy/design-system-tokens@${version}`
);
console.log(
    '  ' +
        Object.entries(counts)
            .map(([label, count]) => `${label}: ${count}`)
            .join(', ')
);
