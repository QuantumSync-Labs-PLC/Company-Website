import { buildPageTitle } from './seo';

it('builds a full page title with site name', () => {
  expect(buildPageTitle('About')).toBe('About | QuantumSync Labs');
});
