// se defienen los métodos CRUD

const db = require("../models");
const Vehiculos = db.vehiculos;
const Op = db.Sequelize.Op;

// crea y guarda un nuevo vehículo
exports.create = (req, res) => {
  // validación de la solicitud 
  if (!req.body.placa) {
    res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
    return;
  }

  // se crea un nuevo vehículo
  const vehiculo = {
    placa: req.body.placa,
    marca: req.body.marca,
    modelo: req.body.modelo,
    serie: req.body.serie,
    color: req.body.color
    
  };

  // Guarda un nuevo vehículo en la base de datos
  Vehiculos.create(vehiculo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error al insertar la información"
      });
    });
};

// obtienen todos los vehículos de la base de datos
exports.findAll = (req, res) => {
  const placa = req.query.placa;
  var condition = placa ? { placa: { [Op.like]: `%${placa}%` } } : null;

  Vehiculos.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recurperar la información"
      });
    });
};

// Obtienen solo un vehículo
exports.findOne = (req, res) => {
  const placa = req.params.placa;

  Vehiculos.findByPk(placa)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontar la información con id=${placa}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar la información con id=" + placa
      });
    });
};

// Actualiza un vehículo en la base de datos
exports.update = (req, res) => {
  const placa = req.params.placa;

  Vehiculos.update(req.body, {
    where: { placa: placa }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La información se actualizó correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la información con id=${placa}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la información con id=" + placa
      });
    });
};

// borrar un vehículo en la base de datos
exports.delete = (req, res) => {
  const placa = req.params.placa;

  Vehiculos.destroy({
    where: { placa: placa }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La información se eliminó correctamente."
        });
      } else {
        res.send({
          message: `La información no se puedo eliminar con id=${placa}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la información con id=" + placa
      });
    });
};

// Borrar toda la información en la base de datos
exports.deleteAll = (req, res) => {
  Vehiculos.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Toda la información se ha borrado exitosamente` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error mientras se borraba la información."
      });
    });
};


