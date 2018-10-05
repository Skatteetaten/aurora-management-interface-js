import { request } from './helper';

describe('Management Interface middleware default config test', () => {
  const req = request();
  const tests = ['/', '/info', '/health', '/env'];

  tests.forEach(endpoint => {
    it(`Should return 200 OK at endpoint ${endpoint}`, () => {
      return req.get(endpoint).expect(200);
    });
  });
});
