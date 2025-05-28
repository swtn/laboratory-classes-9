const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const mongoose = require("mongoose");


const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


app.use(cors());
app.use(express.json());


app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
