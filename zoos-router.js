const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);
//==================================================Create Router
router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: `No Zoo name provided` });
  } else {
    db("zoos")
      .insert(req.body)
      .then(zoo => {
          const [id] = zoo
        db("zoos")
          .where({ id })
          .first()
          .then(zoo => {
            res.status(201).json(zoo);
          })
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

//==================================================Read Router
router.get("/", (req, res) => {
  db(`zoos`)
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//----------------------------------Read By ID
router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "zoo not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//==================================================Update Router
router.put("/:id", (req, res) => {});

//==================================================Delete Router
router.delete("/:id", (req, res) => {});

module.exports = router;
