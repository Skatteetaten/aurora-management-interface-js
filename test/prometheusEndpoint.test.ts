import { request } from './helper';
import { Counter, register } from 'prom-client';

describe('Prometheus endpoint Test', () => {
  beforeEach(() => {
    register.clear();
  });

  it('should return default metrics', async () => {
    const res = await request({
      metrics: {
        enabled: true,
      },
    })
      .get('/prometheus')
      .expect(200);

    expect(res.text).not.toBe('');
  });

  it('should not return default metrics but a custom metric', async () => {
    const counter = new Counter({
      name: 'test',
      help: 'test Just a test counter',
    });

    counter.inc(2);

    const res = await request({
      metrics: {
        enabled: true,
        defaultMetrics: false,
      },
    })
      .get('/prometheus')
      .set('Accept', 'text/plain')
      .expect(200);

    expect(res.text).toMatchSnapshot();
  });
});
