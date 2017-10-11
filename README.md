# Aurora Management Interface Javascript

This library is fulfilling the contract between an Application on Openshift and the Aurora Console application known as "the management interface"

## What endpoint does it contain
actuator (start endpoint), shows a link of all the other management endpoints
info, show links to infrastructure, dependencies and git/build information
health, show health checks.

This project is based on [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter)

## API
## managementInterface([options])
Express middleware.

### default configuration
```js
{
    endpoint: "/actuator",
    cacheDuration: 1000,
    healthChecks: {
        default: () => {
            return { status: "UP" };
        }
    },
    serviceLinks: {
        metrics: "{metricsHostname}/dashboard/db/openshift-project-spring-actuator-view?var-ds=openshift-{cluster}-ose&var-namespace={namespace}&var-app={name}"
    },
    podLinks: {
        metrics: "{metricsHostname}/dashboard/db/openshift-project-spring-actuator-view-instance?var-ds=openshift-{cluster}-ose&var-namespace={namespace}&var-app={name}&var-instance={podName}"
    }
}
```

### Options

#### endpoint
Start endpoint for management interface.
##### type: `string`

#### cacheDuration
Define cache duration (milliseconds).
##### type: `number`

#### healthChecks
Perform health checks for your application.
Takes an object with functions.
Each function must return an object with a status property. May include other properties. See example.
##### type: `object`

| Valid statuses | HTTP status code |
| ---            | :----:           |
| UP             | 200              |
| COMMENT        | 200              |
| UNKNOWN        | 503              |
| OUT_OF_SERVICE | 503              |
| DOWN           | 503              |

##### example: 
```js
healthChecks: {
    diskCheck: function diskCheck() {
         // ...diskCheck
         return {
             status: "UP",
             diskUsage: "70%"
         }
    }
}
```

#### serviceLinks
Used by Aurora Console to create links to services like Grafana.
Value must be `string`.
##### type: `object`

#### podLinks
Used by Aurora Console to create links to services like Grafana.
Value must be `string`.
##### type: `object`

#### dependencies
Define service dependencies for your application.
Value must be `string`.
##### type: `object`

## Create git-properties file
If you want to have git information available at /info endpoint you have to generate `git-properties.json` file by running `aurora-mi git`.
Add `aurora-mi git` to package.json scripts and call it at build time to create `git-properties.json`. Then make sure you add this file when
running `npm pack`, see example.

Requires `git` client.

##### example:
```json
{
    "files": [
        "git-properties.json"
    ],
    "scripts": {
        "build": "aurora-mi git && ...<other build commands>",
    }
}
```