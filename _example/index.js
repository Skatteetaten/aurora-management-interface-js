const express = require('express');
const { managementInterface } = require('../lib/middleware');

function alwaysUp() {
    return {
        status: "UP"
    }
}

let counter = 0;
function dynamicCheck() {
    counter++;
    if (counter % 2 === 0) {
        return {
            status: "DOWN",
            counter
        }
    } else {
        return {
            status: "UP",
            counter
        }
    }
}

const SECOND = 1000;
const cacheDuration = 10 * SECOND;

const config = {
    cacheDuration,
    healthChecks: {
        alwaysUp,
        dynamicCheck
    }
}

const app = express();
app.use(managementInterface(config));

app.listen(8081, () => {
    console.log("Management Interface is listening on port", 8081);
});