const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

//ADD USERS
app.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

//Get ALL Users
app.get("/users", (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

//Get user By Id
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

// UPDATE USER BY ID
app.put("/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

//REMOVE USER
app.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.send({ msg: "user removed ", data });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

// Connection To the DB
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("we are connected to the database");
  }
);

//Listenning to the port
app.listen(3000, () => {
  console.log("we are working on port 3000");
});