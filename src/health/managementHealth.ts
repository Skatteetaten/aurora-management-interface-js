import { HealthCheckFunc } from '../config';
import { HealthStatus, Status } from './healthStatus';

interface IHealthResult {
  [index: string]: any;
}

type ManagementHealthCheckFunc = () => HealthStatus | Promise<HealthStatus>;

export class ManagementHealth {
  private healthChecks: ManagementHealthCheckFunc[];
  private validUntil: number;
  private cachedHealthCheck: IHealthResult;
  private cacheDuration: number;

  constructor() {
    this.healthChecks = [];
    this.cacheDuration = 1000;
  }

  public addHealthChecks(checks: Record<string, HealthCheckFunc>) {
    Object.keys(checks).forEach(k => {
      this.addCheck(async () => {
        const result = await checks[k]();
        const { status, ...fields } = result;
        return new HealthStatus(k, Status.valueOf(status), fields);
      });
    });
  }

  public cacheFor(duration: number): ManagementHealth {
    this.cacheDuration = duration;
    return this;
  }

  public async run(): Promise<IHealthResult> {
    const now = new Date().getTime();
    const isCacheValid = now < this.validUntil;
    if (
      this.validUntil !== undefined &&
      this.cachedHealthCheck !== undefined &&
      isCacheValid
    ) {
      return this.cachedHealthCheck;
    }

    const result: IHealthResult = {};
    if (this.healthChecks.length === 0) {
      result.status = Status[Status.UP];
      return result;
    }

    const healthResults: Array<Promise<HealthStatus>> = this.healthChecks.map(
      async check => check()
    );

    const healthStatuses = await Promise.all(healthResults);
    const mainStatus = healthStatuses
      .map(hr => hr.getStatus())
      .sort()
      .pop();
    result.status = Status[mainStatus];

    healthStatuses.forEach(health => {
      result[health.getName()] = health.getFields();
    });

    this.cachedHealthCheck = result;
    this.validUntil = now + this.cacheDuration;

    return result;
  }

  private addCheck(check: ManagementHealthCheckFunc): ManagementHealth {
    this.healthChecks.push(check);
    return this;
  }
}
