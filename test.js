const express = require('express');
const { managementInterface } = require('./lib/middleware');
const { getBuild } = require('./lib/info');

function test() {
    return {
        status: "UP"
    }
}

let counter = 0;
function testDown() {
    counter++;
    return {
        status: "DOWN",
        counter
    }
}

const config = {
    cacheDuration: 10 * 1000,
    healthChecks: {
        test,
        testDown
    }
}

const app = express();
app.use(managementInterface(config));
app.listen(8081);
console.log("Management Interface is listening on port", 8081);