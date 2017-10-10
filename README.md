## Aurora Management Interface Config
This project is based on [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter)

## managementMiddleware([options])

### default
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
##### type: `string`

#### cacheDuration
Define cache duration (milliseconds).
##### type: `number`

#### healthChecks
Takes an object with functions.
Each function must return an object with a status property. May include other properties.
##### type: `object`

| Valid statuses |
| ---            |
| UP             |
| COMMENT        |
| UNKNOWN        |
| OUT_OF_SERVICE |
| DOWN           |

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
##### type: `object`

#### podLinks
##### type: `object`

#### dependencies
##### type: `object`