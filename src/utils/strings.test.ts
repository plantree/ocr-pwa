import { expect, test } from 'vitest';
import { cleanText } from './strings';

test('cleanText', () => {
  expect(cleanText('  hello  ')).toBe('hello');
  expect(cleanText('  hello\n\n   world  ')).toBe('hello\nworld');
});
