const uuid = require("uuid");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const potencialName = Device.findOne({ where: { name } });
      if (potencialName) {
        return next(
          ApiError.badRequest("Устройство с таким имененем уже существет")
        );
      }
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse("info"); //Данные FORM DATA приходят в видк строки - поэтому их нужно парсить

        info.forEach((el) => {
          DeviceInfo.create({
            title: el.title,
            description: el.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query; //ПРи get зпросе = свойство query -> Реализуем постраничный вывод
    page = page || 1;
    limit = limit || 9;

    let offset = page * limit - limit;

    let devices;

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset }); //findAndCountAll служит для пагинации - возвращает еще и общее количество товаров
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
