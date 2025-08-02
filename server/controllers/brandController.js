const ApiError = require("../error/ApiError");
const { Brand } = require("../models/models");

class BrandController {
  async create(req, res, next) {
    const { name } = req.body;
    const potencialName = await Brand.findOne({ where: { name } });
    if (potencialName) {
      return next(ApiError.badRequest("Бренд с таким именем уже существует"));
    }
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new BrandController();
