const Book = require("../models/Book");
const Author = require("../models/Author");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("author");
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.createBook = async (req, res) => {
  try {
    const { title, year, author } = req.body; // author to obiekt { firstName, lastName }

    // Sprawdź czy autor już istnieje
    let existingAuthor = await Author.findOne({
      firstName: author.firstName,
      lastName: author.lastName
    });

    if (!existingAuthor) {
      existingAuthor = new Author({
        firstName: author.firstName,
        lastName: author.lastName
      });
      await existingAuthor.save();
    }

    const newBook = new Book({
      title,
      year,
      author: existingAuthor._id
    });

    await newBook.save();

    const populatedBook = await newBook.populate("author");

    res.status(201).json(populatedBook);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Book not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};