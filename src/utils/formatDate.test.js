import formatDate from './formatDate';

it('formats ISO date strings to a readable format', () => {
  const result = formatDate('2025-11-19');
  expect(result).toMatch(/2025/);
});
