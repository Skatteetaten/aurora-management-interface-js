import { } from "jest";
import { request } from "./helper";
import { ManagementConfig } from "../src/config";

describe("Management Interface middleware default config test", () => {
    const req = request();
    const tests = ["/actuator", "/info", "/health"];

    tests.forEach(endpoint => {
        it(`Should return 200 OK at endpoint ${endpoint}`, () => {
            return req.get(endpoint).expect(200);
        });
    });
});

