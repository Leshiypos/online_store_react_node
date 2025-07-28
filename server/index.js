const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
const PORT = process.env.PORT || 7000;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate(); //идентификация базы данных
    await sequelize.sync(); //функция сверяет состояние базы данных со схемой данных
    app.listen(PORT, () => console.log(`server run on port ${PORT} `));
  } catch (error) {
    console.log(error);
  }
};

start();
