import { expect, test } from 'vitest';
import { formatPercent } from '../utils/formatters';

test('Faiz formatı düzgün işləməlidir', () => {
  expect(formatPercent(0.5)).toBe('50%');
  expect(formatPercent(1.2)).toBe('120%');
});