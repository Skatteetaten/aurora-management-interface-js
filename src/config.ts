export type ManagementConfig = { [index: string]: any };

const defaultConfig: ManagementConfig = {
  endpoint: '/',
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
  }
};

/**
 * Sets missing properties to default configuration
 */
export function checkForMissingConfig(
  userConfig: ManagementConfig
): ManagementConfig {
  const config = userConfig;
  if (config === undefined) {
    return defaultConfig;
  }

  Object.keys(defaultConfig).forEach(key => {
    if (config[key] === undefined) {
      config[key] = defaultConfig[key];
    }
  });

  return config;
}
