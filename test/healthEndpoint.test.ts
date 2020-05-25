import { HealthCheckResult, ManagementConfig } from '../src/config';
import { request } from './helper';

describe('Management Interface Health status codes', () => {
  const config: ManagementConfig = {
    healthChecks: {},
  };

  const tests = [
    { status: 'UP', expect: 200 },
    { status: 'COMMENT', expect: 200 },
    { status: 'UNKNOWN', expect: 503 },
    { status: 'OUT_OF_SERVICE', expect: 503 },
    { status: 'DOWN', expect: 503 },
  ];

  tests.forEach((t) => {
    it(`Should return status code ${t.expect} when status is ${t.status}`, () => {
      config.healthChecks.test = () => {
        return { status: t.status };
      };

      return request(config).get('/health').expect(t.expect);
    });
  });
});

describe('Extra fields from health endpoint', () => {
  const config = {
    healthChecks: {
      multiple: () => ({
        status: 'UP',
        message: 'Foo',
        count: 3000,
      }),
    },
  };

  it('Should contain extra fields in response body', () => {
    return request(config)
      .get('/health')
      .expect(200, {
        status: 'UP',
        multiple: {
          status: 'UP',
          message: 'Foo',
          count: 3000,
        },
      });
  });
});

describe('Health status priority', () => {
  const tests = [
    {
      checks: ['UP', 'COMMENT', 'UNKNOWN', 'OUT_OF_SERVICE', 'DOWN'],
      expect: 'DOWN',
      code: 503,
    },
    {
      checks: ['UP', 'COMMENT', 'OUT_OF_SERVICE'],
      expect: 'OUT_OF_SERVICE',
      code: 503,
    },
    { checks: ['UP', 'DOWN', 'OUT_OF_SERVICE'], expect: 'DOWN', code: 503 },
    { checks: ['UP', 'UNKNOWN', 'COMMENT'], expect: 'UNKNOWN', code: 503 },
    { checks: ['UP', 'COMMENT'], expect: 'COMMENT', code: 200 },
  ];

  tests.forEach((t) => {
    it(`Should set status to ${t.expect} when healthChecks returns ${t.checks}`, async () => {
      const healthChecks = t.checks.reduce((acc, c) => {
        return {
          ...acc,
          [c]: () => ({ status: c }),
        };
      }, {});

      const res = await request({ healthChecks }).get('/health').expect(t.code);
      expect(res.body.status).toBe(t.expect);
    });
  });
});

describe('Async health check', () => {
  it('Should fetch health status async', async () => {
    const healthStatus = {
      status: 'DOWN',
      message: 'Service not available',
    };
    const healthChecks = {
      asyncTest: () =>
        new Promise<HealthCheckResult>((resolve) =>
          setTimeout(() => resolve(healthStatus), 100)
        ),
    };
    await request({
      healthChecks,
    })
      .get('/health')
      .expect(503, {
        asyncTest: { message: 'Service not available', status: 'DOWN' },
        status: 'DOWN',
      });
  });
});
