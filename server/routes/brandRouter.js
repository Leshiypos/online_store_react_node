const { Router } = require("express");

const router = new Router();

router.post("/", (req, res) => {});
router.get("/", (req, res) => {
  res.status(200).json({ message: "ПРивет от брендов!" });
});

module.exports = router;
