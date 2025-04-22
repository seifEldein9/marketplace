// user.routes.test.js
import request from "supertest";
import app from "../../src/index.js";

describe("GET /api/users", () => {
  it("should return a list of users", async () => {
    const response = await request(app).get("/api/users").expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "Alice",
      email: "alice@example.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty("name", "Alice");
    expect(response.body).toHaveProperty("email", "alice@example.com");
  });
});
