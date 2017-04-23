
var descriptor = {
  configurable: "boolean",
  enumerable: "boolean",
  writable: "boolean",
  any: "any",
  get: "any",
  set: "any"
};

exports.arguments = {};
exports.arguments.getPrototypeOf = ["target"];
exports.arguments.setPrototypeOf = ["target", "any"];
exports.arguments.isExtensible = ["target"];
exports.arguments.preventExtensions = ["target"];
exports.arguments.getOwnPropertyDescriptor = ["target", "string"];
exports.arguments.defineProperty = ["target", "string", descriptor];
exports.arguments.has = ["target", "string"];
exports.arguments.get = ["target", "string", "any"];
exports.arguments.set = ["target", "string", "any", "any"];
exports.arguments.deleteProperty = ["target", "string"];
exports.arguments.ownKeys = ["target"];
exports.arguments.apply = ["target", "any", ["any"]];
exports.arguments.construct = ["target", ["any"]];

exports.result = {};
exports.result.getPrototypeOf = "any";
exports.result.isExtensible = "boolean";
exports.result.getOwnPropertyDescriptor = descriptor;
exports.result.has = "boolean";
exports.result.get = "any";
exports.result.deleteProperty = "boolean";
exports.result.ownKeys = ["string"];
exports.result.apply = "any";
exports.result.construct = "any";
