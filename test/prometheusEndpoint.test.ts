import { request } from './helper';

describe('Prometheus endpoint Test', () => {
  it('', async () => {
    await request()
      .get('/prometheus')
      .expect(200);
  });
});
