
var descriptor = {
  configurable: "boolean",
  enumerable: "boolean",
  writable: "boolean",
  value: "value",
  get: "value",
  set: "value"
};

exports.arguments = {};
exports.arguments.getPrototypeOf = ["target"];
exports.arguments.setPrototypeOf = ["target", "value"];
exports.arguments.isExtensible = ["target"];
exports.arguments.preventExtensions = ["target"];
exports.arguments.getOwnPropertyDescriptor = ["target", "string"];
exports.arguments.defineProperty = ["target", "string", descriptor];
exports.arguments.has = ["target", "string"];
exports.arguments.get = ["target", "string", "value"];
exports.arguments.set = ["target", "string", "value", "value"];
exports.arguments.deleteProperty = ["target", "string"];
exports.arguments.ownKeys = ["target"];
exports.arguments.apply = ["target", "value", ["value"]];
exports.arguments.construct = ["target", ["value"]];

exports.result = {};
exports.result.getPrototypeOf = "value";
exports.result.isExtensible = "boolean";
exports.result.getOwnPropertyDescriptor = descriptor;
exports.result.has = "boolean";
exports.result.get = "value";
exports.result.deleteProperty = "boolean";
exports.result.ownKeys = ["string"];
exports.result.apply = "value";
exports.result.construct = "value";
