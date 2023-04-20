const { tryCatchWrapper, endPointResponse } = require("../helpers");
const {
  createServiceBarber,
  findServicesBarber,
  findSingleServiceBarber,
  updateServiceBarber,
  removeServiceBarber,
} = require("../services/servicesBarber.services");

const postServiceBarber = tryCatchWrapper(async (req, res, next) => {
  const { name, cost } = req.body;
  const newService = await createServiceBarber(name, cost);

  endPointResponse({
    res,
    code: 201,
    message: "Nuevo servicio creado",
    body: newService,
  });
});

const getServicesBarber = tryCatchWrapper(async (req, res, next) => {
  const services = await findServicesBarber();

  endPointResponse({ res, message: "Servicios disponibles", body: services });
});

const getSingleServiceBarber = tryCatchWrapper(async (req, res, next) => {
  const { serviceId } = req.params;
  const service = await findSingleServiceBarber(serviceId);

  endPointResponse({ res, message: "Servicio disponible", body: service });
});

const patchServiceBarber = tryCatchWrapper(async (req, res, next) => {
  const { serviceId } = req.params;
  const { name, cost } = req.body;
  const oldService = await findSingleServiceBarber(serviceId)
  const updatedService = await updateServiceBarber(oldService, name, cost);

  endPointResponse({
    res,
    message: "Servicio actualizado",
    body: updatedService,
  });
});

const deleteServiceBarber = tryCatchWrapper(async (req, res, next) => {
  const { serviceId } = req.params;
  const removeService = await findSingleServiceBarber(serviceId)
  const response = await removeServiceBarber(removeService, serviceId);

  endPointResponse({ res, message: response });
});

module.exports = {
  postServiceBarber,
  getServicesBarber,
  getSingleServiceBarber,
  patchServiceBarber,
  deleteServiceBarber,
};
