# Aurora Management Interface Javascript

This library is for fulfilling the contract between an Application on OpenShift and the Aurora Console application known as "the management interface". It provides a slim framework for providing basic application information and customizable health status.

The project is based on [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter).

## What endpoints does it contain

- `/` (default start endpoint), shows a link of all the other management endpoints
- `/info` show links to infrastructure, dependencies and git/build information
- `/health` show health checks.
- `/env` show environment variables.
- `/prometheus` expose Prometheus metrics.

## Getting started

`npm install aurora-management-interface`

### Use

```ts
import express from 'express';
import { managementInterface } from 'aurora-management-interface';

const PORT = 8081;

const app = express();
app.use(managementInterface());

app.listen(PORT, function () {
  console.log('Listening on port', PORT);
});
```

Have a look at the [example](_example/index.js) included in this project.

## API

## managementInterface([options])

Express middleware.

### default configuration

```js
{
  endpoint: '/',
  environmentVariables: process.env,
  cacheDuration: 1000,
  healthChecks: {
    default: () => {
      return { status: 'UP' };
    },
  },
  serviceLinks: {
    metrics:
      '{metricsHostname}/dashboard/db/openshift-project-spring-actuator-view?var-ds=openshift-{cluster}-ose&var-namespace={namespace}&var-app={name}',
  },
  podLinks: {
    metrics:
      '{metricsHostname}/dashboard/db/openshift-project-spring-actuator-view-instance?var-ds=openshift-{cluster}-ose&var-namespace={namespace}&var-app={name}&var-instance={podName}',
  },
  metrics: {
    enabled: true,
    defaultMetrics: true,
    registers: [],
  },
}
```

## Options <`object`>

### endpoint <`string`>

Start endpoint for management interface.

### cacheDuration <`number`>

Define cache duration (milliseconds).

### healthChecks <`object`>

Perform health checks for your application.
Takes an object with functions.
Each function must return an object with a status property. May include other properties. See example.

| Valid statuses | Returns HTTP status code |
| -------------- | :----------------------: |
| UP             |           200            |
| COMMENT        |           200            |
| UNKNOWN        |           503            |
| OUT_OF_SERVICE |           503            |
| DOWN           |           503            |

##### example:

```js
healthChecks: {
  diskCheck: function diskCheck() {
    // ...diskCheck
    return {
      status: 'UP',
      diskUsage: '70%',
    };
  }
}
```

### serviceLinks <`object`>

Used by Aurora Console to create links to services like Grafana.
Value must be `string`.

### podLinks <`object`>

Used by Aurora Konsoll to create links to services like Grafana.
Value must be `string`.

### dependencies <`object`>

Define service dependencies for your application.
Value must be `string`.

### metrics <`object`>

Metrics in this library is created by using https://github.com/siimon/prom-client.

#### metrics/enabled <`boolean`>

Decide if the library should expose Prometheus metrics or not.

#### metrics/defaultMetrics <`boolean`> or <`object`>

The defaultMetrics will enabled default metrics recommended by Prometheus.

By passing a boolean value you can decide if you want default metrics or not.

You can also pass the following parameters into the object: timeout, timestamps, register, and prefix.
See: https://github.com/siimon/prom-client#default-metrics

##### example:

```ts
defaultMetrics: {
	timeout?: number;
	timestamps?: boolean;
	register?: Registry;
	prefix?: string
}
```

#### metrics/registers <`Registry[]`>

By default there is a default registry available that will be used.
See: https://github.com/siimon/prom-client#multiple-registries

## Create git-properties file

If you want to have git information available at /info endpoint you have to generate `git-properties.json` file by running `aurora-mi git`.
Add `aurora-mi git` to package.json scripts and call it at build time to create `git-properties.json`. Then make sure you add this file when
running `npm pack`, see example.

Requires the `git` command line client to be installed on the system running the build.

##### example:

```json
{
  "files": ["git-properties.json"],
  "scripts": {
    "build": "aurora-mi git && ...<other build commands>"
  }
}
```
