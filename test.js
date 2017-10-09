const express = require('express');
const { managementMiddleware } = require('./lib/middleware');

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
app.use(managementMiddleware(config));
app.listen(8081);
console.log("Management Interface is listening on port", 8081);