import { HealthStatus, Status } from './healthStatus';

export type HealthResult = { [index: string]: any };

export type HealthCheckFunc = () => HealthStatus | Promise<HealthStatus>;

export class ManagementHealth {
  private healthChecks: HealthCheckFunc[];
  private validUntil: number;
  private cachedHealthCheck: HealthResult;
  private cacheDuration: number;

  constructor() {
    this.healthChecks = [];
    this.cacheDuration = 1000;
  }

  addCheck(check: HealthCheckFunc): ManagementHealth {
    this.healthChecks.push(check);
    return this;
  }

  cacheFor(duration: number): ManagementHealth {
    this.cacheDuration = duration;
    return this;
  }

  async run(): Promise<HealthResult> {
    const now = new Date().getTime();
    const isCacheValid = now < this.validUntil;
    if (
      this.validUntil !== undefined &&
      this.cachedHealthCheck !== undefined &&
      isCacheValid
    ) {
      return this.cachedHealthCheck;
    }

    const result: HealthResult = {};
    if (this.healthChecks.length === 0) {
      result['status'] = Status[Status.UP];
      return result;
    }

    const healthResults: Promise<HealthStatus>[] = this.healthChecks.map(
      async check => await check()
    );

    const healthStatuses = await Promise.all(healthResults);
    const mainStatus = healthStatuses
      .map(hr => hr.getStatus())
      .sort()
      .pop();
    result['status'] = Status[mainStatus];

    healthStatuses.forEach(health => {
      result[health.getName()] = health.getFields();
    });

    this.cachedHealthCheck = result;
    this.validUntil = now + this.cacheDuration;

    return result;
  }
}
