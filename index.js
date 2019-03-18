// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

// GET methods
server.get("/api/users", (req, res) => {
  db.find()
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  console.log(req.params.id);
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

/////////////////////////////////////////////////////////

// CUD Methods
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(err =>
      res
        .status(500)
        .json({
          error: "There was an error while saving the user to the database"
        })
    );
});

server.listen(5000, () => {
  console.log("It's woring");
});
