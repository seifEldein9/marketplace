import request from "supertest";
import app from "../src/index.js";

describe("App", () => {
  it("should respond with 200 for root route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

jest.setTimeout(10000);
