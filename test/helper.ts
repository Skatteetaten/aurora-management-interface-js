import * as supertest from "supertest";
import * as express from "express";

import { managementInterface } from "../src/middleware";
import { ManagementConfig } from "../src/config";

export function request(config?: ManagementConfig) {
    const app = express();
    app.use(managementInterface(config));
    return supertest(app);
}