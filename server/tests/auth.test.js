const request = require("supertest");
const app = require("../src/server");
const User = require("../src/models/User");

describe("Auth Module - Complex Scenarios", () => {
  const validUser = {
    firstname: "Jane",
    lastname: "Doe",
    email: "jane.doe@example.com",
    password: "StrongPassword123",
    birthday: "1995-05-15",
    role: "STUDENT",
  };

  beforeEach(async () => {
    await User.syncIndexes();
  });

  describe("POST /api/auth/register", () => {
    it("should register a user with valid data", async () => {
      const res = await request(app).post("/api/auth/register").send(validUser);
      expect(res.statusCode).toBe(201);
      expect(res.body.email).toBe(validUser.email);
      expect(res.body.password).toBeUndefined();
      expect(res.body._id).toBeDefined();
    });

    it("should fail when email is already registered", async () => {
      await request(app).post("/api/auth/register").send(validUser);
      const res = await request(app).post("/api/auth/register").send(validUser);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/email already exists/i);
    });

    it("should fail with invalid email format", async () => {
      const invalidEmailUser = { ...validUser, email: "not-an-email" };
      const res = await request(app)
        .post("/api/auth/register")
        .send(invalidEmailUser);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/must be a valid email/i);
    });

    describe("Password Validation", () => {
      it("should fail if password is too short (< 8 chars)", async () => {
        const shortPassUser = {
          ...validUser,
          email: "short@test.com",
          password: "Pass1",
        };
        const res = await request(app)
          .post("/api/auth/register")
          .send(shortPassUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/at least 8 characters/i);
      });

      it("should fail if password has no numbers", async () => {
        const noNumUser = {
          ...validUser,
          email: "nonum@test.com",
          password: "PasswordOnly",
        };
        const res = await request(app)
          .post("/api/auth/register")
          .send(noNumUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/at least 1 letter and 1 number/i);
      });

      it("should fail if password has no letters", async () => {
        const noLetterUser = {
          ...validUser,
          email: "noletter@test.com",
          password: "123456789",
        };
        const res = await request(app)
          .post("/api/auth/register")
          .send(noLetterUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/at least 1 letter and 1 number/i);
      });
    });

    describe("Age Validation", () => {
      it("should fail if user is under 13", async () => {
        const today = new Date();
        const twelveYearsAgo = new Date(
          today.getFullYear() - 12,
          today.getMonth(),
          today.getDate()
        );
        const youngUser = {
          ...validUser,
          email: "young@test.com",
          birthday: twelveYearsAgo.toISOString(),
        };

        const res = await request(app)
          .post("/api/auth/register")
          .send(youngUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/at least 13 years old/i);
      });

      it("should pass if user is exactly 13", async () => {
        const today = new Date();
        // 13 years ago from today
        const thirteenYearsAgo = new Date(
          today.getFullYear() - 13,
          today.getMonth(),
          today.getDate()
        );
        // Subtract one day to be safe with timezones/exact time comparisons if needed,
        // but usually exact date should pass if logic is <=
        const exactUser = {
          ...validUser,
          email: "exact@test.com",
          birthday: thirteenYearsAgo.toISOString(),
        };

        const res = await request(app)
          .post("/api/auth/register")
          .send(exactUser);
        expect(res.statusCode).toBe(201);
      });
    });

    describe("Role Validation", () => {
      it("should fail with invalid role", async () => {
        const invalidRoleUser = {
          ...validUser,
          email: "role@test.com",
          role: "SUPERADMIN",
        };
        const res = await request(app)
          .post("/api/auth/register")
          .send(invalidRoleUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/must be one of/i);
      });

      it("should default to STUDENT if role is missing", async () => {
        const noRoleUser = { ...validUser, email: "norole@test.com" };
        delete noRoleUser.role;
        const res = await request(app)
          .post("/api/auth/register")
          .send(noRoleUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.role).toBe("STUDENT");
      });
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Create a user for login tests
      await request(app).post("/api/auth/register").send(validUser);
    });

    it("should login successfully with valid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.accessToken).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
      expect(res.body.user.email).toBe(validUser.email);
      expect(res.body.user.password).toBeUndefined();
    });

    it("should fail with wrong password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: validUser.email,
        password: "WrongPassword123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/invalid email or password/i);
    });

    it("should fail with non-existent email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nonexistent@example.com",
        password: "SomePassword123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/invalid email or password/i);
    });
  });

  describe("POST /api/auth/refresh", () => {
    let refreshToken;

    beforeEach(async () => {
      await request(app).post("/api/auth/register").send(validUser);
      const res = await request(app).post("/api/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });
      refreshToken = res.body.refreshToken;
    });

    it("should refresh access token with valid refresh token", async () => {
      const res = await request(app)
        .post("/api/auth/refresh")
        .send({ refreshToken });
      expect(res.statusCode).toBe(200);
      expect(res.body.accessToken).toBeDefined();
    });

    it("should fail with invalid refresh token", async () => {
      const res = await request(app)
        .post("/api/auth/refresh")
        .send({ refreshToken: "invalid_token" });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/auth/logout", () => {
    let refreshToken;

    beforeEach(async () => {
      await request(app).post("/api/auth/register").send(validUser);
      const res = await request(app).post("/api/auth/login").send({
        email: validUser.email,
        password: validUser.password,
      });
      refreshToken = res.body.refreshToken;
    });

    it("should logout successfully", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .send({ refreshToken });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/logged out/i);

      // Verify token is invalidated
      const refreshRes = await request(app)
        .post("/api/auth/refresh")
        .send({ refreshToken });
      expect(refreshRes.statusCode).toBe(403);
    });
  });
});
