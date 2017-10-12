import { } from "jest";
import { request } from "./helper";

describe("Actuator endpoint Test", () => {
    it("Should contains links to info, health and self endpoint", () => {
        return request()
            .get("/")
            .expect(200)
            .then((res) => {
                expect(res.body.links.length).toBe(3);
            });
    });
});