import * as supertest from "supertest";
import * as express from "express";

import { managementMiddleware } from "../src/middleware";
import { ManagementConfig } from "../src/config";

export function setupRequest(config?: ManagementConfig) {
    const app = express();
    app.use(managementMiddleware(config));
    return supertest(app);
}