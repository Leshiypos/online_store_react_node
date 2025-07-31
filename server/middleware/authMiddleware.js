const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Отделяем Bearer
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" });
  }
};
