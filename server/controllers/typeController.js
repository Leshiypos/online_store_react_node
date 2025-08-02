const ApiError = require("../error/ApiError");
const { Type } = require("../models/models");

class TypeController {
  async create(req, res, next) {
    const { name } = req.body;
    let potentialProductName = await Type.findOne({ where: { name } });
    if (potentialProductName) {
      return next(ApiError.badRequest("Товар с таким именем уже существует"));
    }
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
