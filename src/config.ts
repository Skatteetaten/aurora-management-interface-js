export type ManagementConfig = { [index: string]: any };

const defaultConfig: ManagementConfig = {
    endpoint: "/actuator",
    cacheDuration: 1000,
    healthChecks: {
        default: () => {
            return { status: "UP" };
        }
    }
};

/**
 * Sets missing properties to default configuration
 */
export function checkForMissingConfig(userConfig: ManagementConfig): ManagementConfig {
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