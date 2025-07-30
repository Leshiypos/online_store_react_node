const { Router } = require("express");

const router = new Router();

router.post("/registration", (req, res) => {
  res.status(200).json({});
});
router.post("/login", (req, res) => {
  res.status(200).json({});
});
router.get("/auth", (req, res) => {});

module.exports = router;
