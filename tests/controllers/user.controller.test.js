import request from "supertest";
import app from "../../src/index.js";
import mongoose from "mongoose";
import User from "../../src/models/user.model.js";

jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL_TEST);
});

beforeEach(async () => {
  await User.deleteMany();
});
it("should return 400 for duplicate email", async () => {
  const user = {
    name: "John",
    email: "john@test.com",
    password: "pass123",
  };

  await request(app).post("/api/users").send(user);

  const res = await request(app).post("/api/users").send(user);

  expect(res.status).toBe(400);
  expect(res.body.message).toMatch(/email must be unique/i);
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Routes", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "John Doe");
  });

  it("should return error for duplicate email", async () => {
    const user1 = {
      name: "John",
      email: "john@example.com",
      password: "pass123",
    };

    await request(app).post("/api/users").send(user1);

    const user2 = {
      name: "John2",
      email: "john@example.com",
      password: "pass456",
    };

    const response = await request(app).post("/api/users").send(user2);

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email already exists/i);
  });

  it("should return validation error for missing email", async () => {
    const invalidUser = {
      name: "Jane Doe",
      password: "password123",
    };

    const response = await request(app).post("/api/users").send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email/i);
  });
});
