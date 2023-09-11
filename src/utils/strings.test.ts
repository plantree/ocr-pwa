import { expect, test } from 'vitest';
import { cleanText } from './strings';

test('cleanText', () => {
  expect(cleanText('  hello  ')).toBe('hello');
  expect(cleanText('  hello\n\n   world  ')).toBe('hello\nworld');
  expect(cleanText('  hello\n\n   world\n  ')).toBe('hello\nworld');
  expect(cleanText('  hello\n\n   world\nI am a student  ')).toBe('hello\nworld\nI am a student');
});
