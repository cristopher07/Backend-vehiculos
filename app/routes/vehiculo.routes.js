//rutas de acceso al backend
module.exports = app => {
    const vehiculos = require("../controllers/vehiculo.controller.js");
    var router = require("express").Router();

    // Crear un nuevo vehículo
    router.post("/vehiculos", vehiculos.create);

    // Obtener todos los vehículos
    router.get("/vehiculos", vehiculos.findAll);
  
    // Obtener un vehículo por placa
    router.get("/vehiculos/:placa", vehiculos.findOne);

    //Actualizar un vehículo por medio de placa
    router.put("/vehiculos/:placa", vehiculos.update);

    // Borrar un vehículo por medio de placa
    router.delete("/vehiculos/:placa", vehiculos.delete);

    // Borrar todos los vehículos
    router.delete("/vehiculos", vehiculos.deleteAll);
    app.use('/api', router);
  };