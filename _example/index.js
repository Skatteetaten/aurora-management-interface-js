const express = require('express');
const {
  managementInterface,
  collectPrometheusMetrics
} = require('../lib/middleware');

function alwaysUp() {
  return {
    status: 'UP'
  };
}

let counter = 0;
function dynamicCheck() {
  counter++;
  if (counter % 2 === 0) {
    return {
      status: 'DOWN',
      counter
    };
  } else {
    return {
      status: 'UP',
      counter
    };
  }
}

function asyncTest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 'DOWN',
        message: 'Service is unavailable'
      });
    }, 3000);
  });
}

const SECOND = 1000;
const cacheDuration = 10 * SECOND;

const config = {
  cacheDuration,
  healthChecks: {
    alwaysUp,
    dynamicCheck,
    asyncTest
  }
};

const app = express();
collectPrometheusMetrics();
app.use(managementInterface(config));

app.listen(8081, () => {
  console.log('Management Interface is listening on port', 8081);
});
