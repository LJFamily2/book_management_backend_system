const Book = require("../models/Book");
const {
  createBookSchema,
  updateBookSchema,
} = require("../validators/bookValidation");

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};

async function createBook(req, res) {
  try {
    const { error } = createBookSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const book = await Book.create({
      ...req.body,
      createdBy: req.user?._id || null,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBooks(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortParam = req.query.sort || "newest";
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    let sortOptions = { createdAt: -1 }; // Default sort

    if (sortParam === "newest") {
      sortOptions = { publicationYear: -1 };
    } else if (sortParam === "oldest") {
      sortOptions = { publicationYear: 1 };
    }

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ],
      };
    }

    const [books, total] = await Promise.all([
      Book.find(query).skip(skip).limit(limit).sort(sortOptions),
      Book.countDocuments(query),
    ]);

    res.status(200).json({
      data: books,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBook(req, res) {
  try {
    const book = await Book.findById(req.params.id).populate(
      "createdBy",
      "firstname lastname email"
    );
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBook(req, res) {
  try {
    const { error } = updateBookSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteBook(req, res) {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
