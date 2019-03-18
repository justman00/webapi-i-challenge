// implement your API here
const express = require("express");
const db = require("./data/db");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

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
// POST
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
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

// DELETE
server.delete("/api/users/:id", (req, res) => {
  db.findById(req.params.id).then(user => {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  });
  db.remove(req.params.id)
    .then(records => res.json({ records }))
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

// PUT
server.put("/api/users/:id", async (req, res) => {
  const user = await db.findById(req.params.id);

  if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }

  try {
    const updatedUser = await db.update(req.params.id, req.body);
    res.status(200).json({ updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ error: "The user information could not be modified." });
  }
});

server.listen(5000, () => {
  console.log("It's working");
});
