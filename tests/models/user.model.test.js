import mongoose from "mongoose";
import User from "../../src/models/user.model.js";
import "dotenv/config";
jest.setTimeout(30000);

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("User Model", () => {
  it("should create and save a user successfully", async () => {
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe("John Doe");
    expect(savedUser.email).toBe("john@example.com");
  });

  it("should throw an error if the email is missing", async () => {
    const userWithoutEmail = new User({
      name: "Jane Doe",
      password: "password123",
    });

    let error;
    try {
      await userWithoutEmail.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });
});
