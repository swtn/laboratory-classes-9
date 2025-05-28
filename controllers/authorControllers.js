const Author = require("../models/Author");

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const updated = await Author.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: "Bad request", error: err.message });
    }
};