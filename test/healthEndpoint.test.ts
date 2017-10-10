import { } from "jest";
import { setupRequest } from "./testApp";
import { ManagementConfig } from "../src/config";

describe("Management Interface Health status codes", () => {
    const config: ManagementConfig = {
        healthChecks: {}
    };

    const tests = [
        { status: "UP", expect: 200 },
        { status: "COMMENT", expect: 200 },
        { status: "UNKNOWN", expect: 503 },
        { status: "OUT_OF_SERVICE", expect: 503 },
        { status: "DOWN", expect: 503 }
    ];

    tests.forEach(t => {
        it(`Should return status code ${t.expect} when status is ${t.status}`, () => {
            config.healthChecks["test"] = () => {
                return { status: t.status };
            };

            return setupRequest(config)
                .get("/health")
                .expect(t.expect);
        });
    });
});

describe("Extra fields from health endpoint", () => {
    const multiple = () => {
        return {
            status: "UP",
            message: "Foo",
            count: 3000
        };
    };
    const config = {
        healthChecks: {
            multiple
        }
    };

    it("Should contain extra fields in response body", () => {
        return setupRequest(config)
            .get("/health")
            .expect(200, {
                status: "UP",
                multiple: {
                    status: "UP",
                    message: "Foo",
                    count: 3000
                }
            });
    });
});

describe("Health status priority", () => {
    const tests = [
        {checks: ["UP", "COMMENT", "UNKNOWN", "OUT_OF_SERVICE", "DOWN"], expect: "DOWN", code: 503 },
        {checks: ["UP", "COMMENT", "OUT_OF_SERVICE"], expect: "OUT_OF_SERVICE", code: 503 },
        {checks: ["UP", "DOWN", "OUT_OF_SERVICE"], expect: "DOWN", code: 503 },
        {checks: ["UP", "UNKNOWN", "COMMENT"], expect: "UNKNOWN", code: 503 },
        {checks: ["UP", "COMMENT"], expect: "COMMENT", code: 200 }
    ];

    tests.forEach(t => {
        it(`Should set status to ${t.expect} when healthChecks returns ${t.checks}`, () => {
            const healthChecks = {};
            t.checks.forEach(c => {
                healthChecks[c] = () => { return { status: c }; };
            });

        return setupRequest({ healthChecks })
            .get("/health")
            .expect(t.code)
            .then(res => {
                expect(res.body.status).toBe(t.expect);
            });
        });
    });
});