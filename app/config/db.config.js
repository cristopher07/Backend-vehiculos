
module.exports = {
  HOST: "52.20.16.17",
  USER: "movistarmysql",
  PASSWORD: "MovSoft2018",
  DB: "EXAMEN",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};