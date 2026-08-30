import { test, expect } from '@playwright/test';
import { generateFallbackText } from '../src/lib/avatar';

const cases: [string, string][] = [
  ['', ''],
  ['   ', ''],
  ['\t', ''],
  ['A', 'A'],
  ['a', 'A'],
  ['John', 'JO'],
  ['alice', 'AL'],
  ['ADMIN', 'AD'],
  ['jOhN', 'JO'],
  ['John Doe', 'JD'],
  ['john doe', 'JD'],
  ['John Michael Doe', 'JD'],
  ['Mary Jane Watson Smith', 'MS'],
  ['John   Doe', 'JD'],
  ['  John  \n  Doe  ', 'JD'],
  ['😀', '😀'],
  ['😀A', '😀A'],
  ['😀John', '😀J'],
  ['John😀', 'JO'],
  ['😀John 😀Doe', '😀😀'],
  ['@john', '@J'],
  ['user123', 'US'],
  ['user-name', 'US'],
  ['José', 'JO'],
  ['Müller', 'MÜ'],
  ['北京', '北京'],
  ['José García', 'JG'],
  ['andré çelik', 'AÇ'],
  ['王 Wei', '王W'],
  ['123', '12'],
  ['123 456', '14'],
  ['ß', 'SS'],
  ['ø', 'Ø'],
  ['Smith, John', 'SJ'],
  ['Dr. John Smith', 'DS'],
  ['john.doe@company.com', 'JO'],
  ['test.user+tag@domain.org', 'TE'],
];

test('generateFallbackText returns expected fallback string', () => {
  for (const [input, expected] of cases) {
    expect(generateFallbackText(input), `input: ${JSON.stringify(input)}`).toBe(
      expected
    );
  }
});
