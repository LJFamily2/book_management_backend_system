const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  // Connect to a test database
  const TEST_URI = process.env.MONGODB_URI_TEST || process.env.MONGODB_URI;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  // Clean up database after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  // Wait a bit to ensure cleanup is propagated
  await new Promise((resolve) => setTimeout(resolve, 100));
});
