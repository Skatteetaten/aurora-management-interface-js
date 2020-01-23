import { request } from './helper';

describe('Actuator endpoint Test', () => {
  it('Should contains links to info, health and self endpoint', async () => {
    const res = await request()
      .get('/')
      .expect(200);
    expect(Object.keys(res.body._links).length).toBe(5);
  });
});
