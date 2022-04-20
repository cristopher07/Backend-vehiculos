module.exports = app => {
    const vehiculos = require("../controllers/vehiculo.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", vehiculos.create);
    // Retrieve all Tutorials
    router.get("/", vehiculos.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:placa", vehiculos.findOne);
    // Update a Tutorial with id
    router.put("/:placa", vehiculos.update);
    // Delete a Tutorial with id
    router.delete("/:placa", vehiculos.delete);
    // Delete all Tutorials
    router.delete("/", vehiculos.deleteAll);
    app.use('/api/vehiculos', router);
  };