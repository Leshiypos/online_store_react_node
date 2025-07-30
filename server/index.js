const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
const PORT = process.env.PORT || 7000;
const router = require("./routes/index");

const cors = require("cors"); //нужен для тогда, чтобы можно было обращаться к брайзеру

const app = express();
app.use(cors()); //Мидлвара  - передаем в express
app.use(express.json()); // для того, чтобы можно было парcить json
app.use("/api", router); //Подключаем роутеры
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
