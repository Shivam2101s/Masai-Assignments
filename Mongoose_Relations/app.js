const express = require("express");

const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb://localhost:27017/Library");
};

const app = express();

app.use(express.json());

//user Schema

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: false, default: "Male" },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("users", userSchema);

// section Schema

const sectionSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Section = mongoose.model("section", sectionSchema);

// Book Schema

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: true,
      },
    ],
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },

    CheckedOut: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "checkedOut",
    },
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model("books", bookSchema);

// Author Schema

const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, unique: true },
    last_name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Author = mongoose.model("authors", authorSchema);

// CheckedOut Schema
const checkedOutSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CheckedOut = mongoose.model("checkedOut", checkedOutSchema);

//--------------------------USER CRUD ------------------------------

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//--------------------------Author CRUD ------------------------------

app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();

    return res.send({ authors });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();

    return res.send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//--------------------------Books CRUD ------------------------------

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author").lean().exec();

    return res.send({ books });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();

    return res.send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// Get all books that are CheckedOut

app.get("/booksCheck", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
   
   let  bookArr = [];
   for(let i=0 ; i < books.length ; i++) {
    if(books[i].CheckedOut) {
     bookArr.push(books[i]);    
    }   
  } 
  return res.status(200).send(bookArr);

  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// Get all books written by an author

app.get("/books/author/:id", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.id })
      .populate("author")
      .lean()
      .exec();

    return res.status(200).send({ books });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// Get all books in a section

app.get("/books/section/:id", async (req, res) => {
  try {
    const books = await Book.find({ section: req.params.id })
      .populate("author")
      .lean()
      .exec();

    return res.status(200).send({ books });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// Get all books in a section that are not checkedOut 

app.get("/books/sectionNot/:id", async (req, res) => {
  try {
    const books = await Book.find({ section: req.params.id }).lean().exec();

    const checkout = await CheckedOut.find().lean().exec();

    var bookArr = [];
    for (var j = 0; j < books.length; j++) {
      let found = false;
      for (var i = 0; i < checkout.length; i++) {
        if (checkout[i].book_id.toString() === books[j]._id.toString()) {
          found = true;
          break;
        }
      }
      if (!found) {
        bookArr.push(books[j]);
      }
    }

    return res.status(200).send(bookArr);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});



// Get all books written by an author in a section

app.get("/books/:sec/:aut", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sec);

    const author = await Author.findById(req.params.aut);

    const books = await Book.find({"section":section._id,"author":author._id}).lean().exec();

    return res.status(200).send({ books });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


//--------------------------Section CRUD ------------------------------

app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();

    return res.send({ sections });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();

    return res.send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//--------------------------CheckedOut CRUD ------------------------------

app.post("/checkouts", async (req, res) => {
  try {
    const checkout = await CheckedOut.create(req.body);

    return res.status(201).send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkouts", async (req, res) => {
  try {
    const checkouts = await CheckedOut.find()
      .populate("user_id")
      .populate("book_id")
      .lean()
      .exec();

    return res.send({ checkouts });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await CheckedOut.findById(req.params.id).lean().exec();

    return res.send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await CheckedOut.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.status(201).send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await CheckedOut.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.listen(2465, async function () {
  await connect();
  console.log("listening on port 2465");
});
