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
router.push("/", (req, res) => {})

//==================================================Read Router
router.get("/", (req, res) => {})

//----------------------------------Read By ID
router.get("/:id", (req, res) => {})

//==================================================Update Router
router.put("/:id", (req, res) => {})

//==================================================Delete Router
router.delete("/:id", (req, res) => {})

module.exports = router;