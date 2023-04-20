const { CustomError } = require("../helpers");
const { ServicesBarber } = require("../database/models");

const createServiceBarber = async (name, cost) => {
  try {
    const [response, created] = await ServicesBarber.findOrCreate({
      where: { name },
      defaults: {
        name,
        cost,
      },
    });
    if (!created) {
      throw new CustomError("Ya existe este servicio", 400);
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findServicesBarber = async () => {
  try {
    const allServices = await ServicesBarber.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!allServices) {
      throw new CustomError("No hay servicios creados", 404);
    }

    return allServices;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findSingleServiceBarber = async (serviceId) => {
  try {
    const singleService = await ServicesBarber.findOne({
      where: { id: serviceId },
    });
    if (!singleService) {
      throw new CustomError("No se encontro ningun servicio con ese Id", 404);
    }

    return singleService;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateServiceBarber = async (oldService, name, cost) => {
  try {
    await oldService.update({ name, cost });
    await oldService.save();

    return oldService;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const removeServiceBarber = async (removeService, serviceId) => {
  try {
    await removeService.destroy();

    return `Servicio ${serviceId} eliminado de manera exitosa`;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = {
  createServiceBarber,
  findServicesBarber,
  findSingleServiceBarber,
  updateServiceBarber,
  removeServiceBarber,
};
