import { request } from './helper';
import { register } from 'prom-client';

describe('Actuator endpoint Test', () => {
  beforeEach(() => {
    register.clear();
  });

  it('Should contains links to info, health and self endpoint', async () => {
    const res = await request({
      metrics: {
        enabled: true,
      },
    })
      .get('/')
      .expect(200);
    expect(Object.keys(res.body._links).length).toBe(5);
  });
});
