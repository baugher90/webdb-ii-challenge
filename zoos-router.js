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
        const [id] = zoo;
        db("zoos")
          .where({ id })
          .first()
          .then(zoo => {
            res.status(201).json(zoo);
          });
      })
      .catch(err => {
        res.status(500).json({message: `This Zoo couldn't get the permit`});
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
      res.status(500).json({message: `The animals have gone wild. We could find a single Zoo.`});
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
        res.status(404).json({ message: `Zoo ID not found` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//==================================================Update Router
router.put("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("zoos")
          .where({ id: req.params.id })
          .first()
          .then(zoo => {
            res.status(200).json(zoo);
          });
      } else {
        res.status(404).json({ message: `Zoo ID not found` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//==================================================Delete Router
router.delete("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Zoo ID not found` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `PETA has won and the animals are free to roam wild.` });
    });
});

module.exports = router;
