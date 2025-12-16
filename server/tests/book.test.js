const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../src/server");
const Book = require("../src/models/Book");
const User = require("../src/models/User");

describe("Book Module - Complex Scenarios", () => {
  let token;

  const validBook = {
    title: "Clean Code",
    author: "Robert C. Martin",
    summary: "A Handbook of Agile Software Craftsmanship",
    publicationYear: 2008,
  };

  const adminUser = {
    firstname: "Admin",
    lastname: "User",
    email: "admin@test.com",
    password: "AdminPassword123",
    birthday: "1990-01-01",
    role: "ADMIN",
  };

  beforeEach(async () => {
    // Register and login as ADMIN to get token
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUser.password, salt);

    const user = new User({
      ...adminUser,
      password: hashedPassword,
    });
    await user.save({ w: "majority" });

    // Wait for propagation
    let found = false;
    for (let i = 0; i < 10; i++) {
      const u = await User.findOne({ email: adminUser.email });
      if (u) {
        found = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!found) console.log("User creation failed to propagate");

    const res = await request(app).post("/api/auth/login").send({
      email: adminUser.email,
      password: adminUser.password,
    });
    token = res.body.accessToken;
  });

  describe("POST /api/books", () => {
    it("should create a book with valid data", async () => {
      const res = await request(app)
        .post("/api/books")
        .set("auth-token", token)
        .send(validBook);
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(validBook.title);
      expect(res.body._id).toBeDefined();
    });

    it("should fail when required fields are missing", async () => {
      const invalidBook = { summary: "No title or author" };
      const res = await request(app)
        .post("/api/books")
        .set("auth-token", token)
        .send(invalidBook);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/required/i);
    });

    it("should fail when publication year is in the future", async () => {
      const futureBook = {
        ...validBook,
        publicationYear: new Date().getFullYear() + 1,
      };
      const res = await request(app)
        .post("/api/books")
        .set("auth-token", token)
        .send(futureBook);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/cannot be in the future/i);
    });

    it("should fail when publication year is too old (< 1000)", async () => {
      const oldBook = { ...validBook, publicationYear: 999 };
      const res = await request(app)
        .post("/api/books")
        .set("auth-token", token)
        .send(oldBook);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/must be a 4-digit number/i); // Based on Joi min(1000)
    });
  });

  describe("GET /api/books (Pagination & Sorting)", () => {
    beforeEach(async () => {
      let retries = 3;
      while (retries > 0) {
        await Book.deleteMany({});

        const books = [];
        for (let i = 0; i < 15; i++) {
          books.push({
            title: `Book ${i + 1}`,
            author: `Author ${i + 1}`,
            publicationYear: 2000 + i,
            createdAt: new Date(Date.now() + i * 1000),
            createdBy: new mongoose.Types.ObjectId(),
          });
        }

        try {
          await Book.insertMany(books, { writeConcern: { w: "majority" } });
        } catch (err) {
          console.log("Seeding failed:", err.message);
        }

        const count = await Book.countDocuments();
        if (count === 15) break;
        retries--;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    });

    it("should return first page with default limit (10)", async () => {
      const res = await request(app).get("/api/books");
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(10);
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.pages).toBe(2);
      expect(res.body.pagination.total).toBe(15);
    });

    it("should return second page with remaining items", async () => {
      const res = await request(app).get("/api/books?page=2");
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(5);
      expect(res.body.pagination.page).toBe(2);
    });

    it("should respect custom limit", async () => {
      const res = await request(app).get("/api/books?limit=5");
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(5);
      expect(res.body.pagination.pages).toBe(3);
    });

    it("should return empty array for page out of range", async () => {
      const res = await request(app).get("/api/books?page=100");
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(0);
    });

    it("should sort by createdAt descending (newest first)", async () => {
      // We inserted in order, so the last one inserted (Book 15) should be first
      const res = await request(app).get("/api/books");
      expect(res.body.data[0].title).toBe("Book 15");
    });
  });

  describe("GET /api/books/:id", () => {
    it("should return 404 for non-existent ID", async () => {
      const validObjectId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/books/${validObjectId}`);
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 (or 400 depending on handler) for invalid ID format", async () => {
      const res = await request(app).get("/api/books/invalid-id");
      // Mongoose throws CastError, controller catches and returns 500 currently
      expect(res.statusCode).toBe(500);
      expect(res.body.message).toMatch(/Cast to ObjectId failed/i);
    });
  });

  describe("PUT /api/books/:id", () => {
    let bookId;
    beforeEach(async () => {
      const book = await Book.create(validBook);
      bookId = book._id;
    });

    it("should update book successfully", async () => {
      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .set("auth-token", token)
        .send({ title: "Updated Title" });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Updated Title");
    });

    it("should fail update with invalid data", async () => {
      const res = await request(app)
        .put(`/api/books/${bookId}`)
        .set("auth-token", token)
        .send({ publicationYear: 3000 });
      expect(res.statusCode).toBe(400); // Joi validation
    });

    it("should return 404 when updating non-existent book", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app)
        .put(`/api/books/${fakeId}`)
        .set("auth-token", token)
        .send({ title: "New" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/books/:id", () => {
    let bookId;
    beforeEach(async () => {
      const book = await Book.create(validBook);
      bookId = book._id;
    });

    it("should delete book successfully", async () => {
      const res = await request(app)
        .delete(`/api/books/${bookId}`)
        .set("auth-token", token);
      expect(res.statusCode).toBe(200);

      const check = await Book.findById(bookId);
      expect(check).toBeNull();
    });

    it("should return 404 when deleting non-existent book", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app)
        .delete(`/api/books/${fakeId}`)
        .set("auth-token", token);
      expect(res.statusCode).toBe(404);
    });
  });
});
