const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const models = require("./models/models");
const PORT = process.env.PORT || 7000;
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHendlingMeddleware"); // Подключаем мидлвару для обработки ошибок
const path = require("path");

const cors = require("cors"); //нужен для тогда, чтобы можно было обращаться к брайзеру
const fileUpload = require("express-fileupload"); //нужен для загрузки файлов в запросах

const app = express();
app.use(cors()); //Мидлвара  - передаем в express
app.use(fileUpload({})); //Мидлвара  - для загрузки файлов в запросах
app.use(express.static(path.resolve(__dirname, "static"))); // для получения статических файлов с сервера - указывается папка static через переменную path - для того, чтобы на всех системах путь до папки был правильный
app.use(express.json()); // для того, чтобы можно было парcить json
app.use("/api", router); //Подключаем роутеры

// Подключение мидлвары для обработки ошибок - подключается в самом конце, после всех роутов
app.use(errorHandler); // Это должен быть последний middleware

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
