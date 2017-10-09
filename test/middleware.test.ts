import { } from "jest";
import { setupRequest } from "./testApp";
import { ManagementConfig } from "../src/config";

describe("Management Interface middleware default config test", () => {
    const request = setupRequest();

    it("Should set default endpoint to /actuator", () => {
        return request.get("/actuator").expect(200);
    });

    it("Should set default health check to status UP", () => {
        return request.get("/health").expect(200, {
            status: "UP",
            default: {
                status: "UP"
            }
        });
    });
});

