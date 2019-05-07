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
router.get("/:id", (req, res) => {});

//==================================================Update Router
router.put("/:id", (req, res) => {});

//==================================================Delete Router
router.delete("/:id", (req, res) => {});

module.exports = router;
