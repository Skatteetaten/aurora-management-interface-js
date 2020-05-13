import { request } from './helper';

describe('Info endpoint Test', () => {
  it('', async () => {
    const res = await request().get('/info').expect(200);
    const info = res.body;
    expect(info).toHaveProperty('build');
    expect(info).toHaveProperty('podLinks');
    expect(info).toHaveProperty('serviceLinks');
  });
});
