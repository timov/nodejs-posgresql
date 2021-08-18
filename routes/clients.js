const express = require("express");
const router = express.Router();
const clients = require("../services/clients");

/* GET clints listing. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await clients.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting clients `, err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

/* POST clients */
router.post("/", async function (req, res) {
  try {
    res.json(await clients.create(req.body));
  } catch (err) {
    console.error(`Error while posting clients `, err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = router;
