const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.list = function (fileName) {
  return readFile(fileName);
};

exports.add = function (payload, fileName, type) {
  const id = uuidv4();
  const data = readFile(fileName);

  writeToFile(fileName, [...data, { id, ...payload, created_at: new Date() }]);

  return `${type} ${id} added successfully!`;
};

exports.update = function (id, payload, fileName, type) {
  let resultMsg = `${type} ${id} not found.`;
  const data = readFile(fileName);
  const item = data.find((element) => element.id === id);

  if (item) {
    writeToFile(fileName, [
      ...data.filter((element) => element.id !== item.id),
      {
        ...payload,
        id: item.id,
        created_at: item.created_at,
        updated_at: new Date(),
      },
    ]);
    resultMsg = `${type} ${id} updated successfully!`;
  }

  return resultMsg;
};

exports.delete = function (id, fileName, type) {
  let resultMsg = `${type} ${id} not found.`;
  const data = readFile(fileName);
  const item = data.find((element) => element.id === id);

  if (item) {
    writeToFile(
      fileName,
      data.filter((element) => element.id !== id)
    );
    resultMsg = `${type} ${id} deleted successfully!`;
  }

  return resultMsg;
};

function readFile(fileName) {
  let data = fs.readFileSync(`data/${fileName}`);
  return JSON.parse(data);
}

function writeToFile(fileName, data) {
  fs.writeFileSync(`data/${fileName}`, JSON.stringify(data));
}
