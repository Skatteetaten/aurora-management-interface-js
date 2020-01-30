import { DefaultMetricsCollectorConfiguration, Registry } from 'prom-client';

export interface IHealthCheckResult {
  status: string;
  [index: string]: any;
}

export interface MetricsConfig {
  enabled: boolean;
  defaultMetrics: boolean | DefaultMetricsCollectorConfiguration;
  registers: Registry[];
}

export type HealthCheckFunc = () =>
  | IHealthCheckResult
  | Promise<IHealthCheckResult>;

export interface IManagementConfig {
  healthChecks?: Record<string, HealthCheckFunc>;
  endpoint?: string;
  cacheDuration?: number;
  serviceLinks?: Record<string, string>;
  podLinks?: Record<string, string>;
  environmentVariables?: Record<string, string>;
  metrics?: MetricsConfig;

  [index: string]: any;
}

const defaultConfig: IManagementConfig = {
  endpoint: '/',
  environmentVariables: process.env,
  cacheDuration: 1000,
  healthChecks: {
    default: () => {
      return { status: 'UP' };
    }
  },
  serviceLinks: {
    metrics:
      '{metricsHostname}/dashboard/db/openshift-project-spring-actuator-view?var-ds=openshift-{cluster}-ose&var-namespace={namespace}&var-app={name}'
  },
  podLinks: {
    metrics:
      '{metricsHostname}/dashboard/db/openshift-project-spring-actuator-view-instance?var-ds=openshift-{cluster}-ose&var-namespace={namespace}&var-app={name}&var-instance={podName}'
  },
  metrics: {
    enabled: true,
    defaultMetrics: true,
    registers: []
  }
};

/**
 * Sets missing properties to default configuration
 */
export function applyDefaultConfigToMissingProperties(
  userConfig: IManagementConfig
): IManagementConfig {
  if (userConfig === undefined) {
    return defaultConfig;
  }

  applyDefault(userConfig);
  applyDefault(userConfig, 'metrics');

  return userConfig;
}

function applyDefault(config: any, startKey?: string): void {
  let d: any = defaultConfig;
  let c: any = config;
  if (startKey) {
    d = defaultConfig[startKey];
    c = config[startKey];
  }

  Object.keys(d).forEach(key => {
    if (c[key] === undefined) {
      c[key] = d[key];
    }
  });
}
