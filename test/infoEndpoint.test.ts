import { request } from './helper';

describe('Info endpoint Test', () => {
  it('', () => {
    return request()
      .get('/info')
      .expect(200)
      .then(res => {
        const info = res.body;
        expect(info).toHaveProperty('build');
        expect(info).toHaveProperty('podLinks');
        expect(info).toHaveProperty('serviceLinks');
      });
  });
});
