const db = require("../models");
const Vehiculos = db.vehiculos;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.placa) {
      res.status(400).send({
        message: "El contenido no puede estar vacio"
      });
      return;
    }
    // Create a Tutorial
    const vehiculo = {
      placa: req.body.placa,
      marca: req.body.marca,
      modelo: req.body.modelo,
      serie: req.body.serie,
      color: req.body.color
      
    };
    // Save Tutorial in the database
    Vehiculos.create(vehiculo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error al crear un vehiculo."
        });
      });
  };

  exports.findAll = (req, res) => {
    const marca = req.query.marca;
    let condition = marca ? { marca: { [Op.like]: `%${marca}%` } } : null;
    Vehiculos.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al buscar los vehiculos."
        });
      });
  };

  exports.findOne = (req, res) => {
    const placa = req.params.placa;
    Vehiculos.findByPk(placa)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `No se puede encontrar un vehiculo con placa=${placa}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar un vehiculo con =" + placa
        });
      });
  };

  exports.update = (req, res) => {
    const placa = req.params.placa;
    Vehiculos.update(req.body, {
      where: { placa: placa}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El vehículo se actualizó con éxito."
          });
        } else {
          res.send({
            message: `No se puede actualizar el vehículo con la placa =${placa}. `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el vehículo =" + placa
        });
      });
  };

  exports.delete = (req, res) => {
    const placa = req.params.placa;
    Vehiculos.destroy({
      where: { placa: placa }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El vehículo se eliminó con éxito."
          });
        } else {
          res.send({
            message: `No se puede eliminar el vehículo con la placa=${placa}. `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar el vehículo con la placa=" + placa
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Vehiculos.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Los vehículos se eliminiaron con éxito!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al eliminar los vehículos."
        });
      });
  };