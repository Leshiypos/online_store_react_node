const { Router } = require("express");

const router = new Router();

router.post("/", (req, res) => {
  res.status(200).json({});
});
router.get("/", (req, res) => {});

module.exports = router;
