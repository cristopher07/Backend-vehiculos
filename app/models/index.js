//

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { //obtienen la información de la configuracion de la base de datos
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define:  
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vehiculos = require("./vehiculo.model.js")(sequelize, Sequelize); //Se obtienen los modelos 

module.exports = db; //se exportan los modelos para el uso de todo el proyecto