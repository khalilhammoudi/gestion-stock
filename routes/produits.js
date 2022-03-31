const dataManager = require("../services/data-manager.service");
const FILENAME = "produits.json";
const TYPE = "Product";

exports.list = function (_, response) {
  const data = dataManager.list(FILENAME);
  response.json(data);
};

exports.add = function (request, response) {
  const msg = dataManager.add(request.body, FILENAME, TYPE);
  response.send(msg);
};

exports.update = function (request, response) {
  const id = request.params.id;
  const payload = request.body;
  const msg = dataManager.update(id, payload, FILENAME, TYPE);
  response.send(msg);
};

exports.delete = function (request, response) {
  const id = request.params.id;
  const msg = dataManager.delete(id, FILENAME, TYPE);
  response.send(msg);
};
