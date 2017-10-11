
var descriptor = {
  configurable: "boolean",
  enumerable: "boolean",
  writable: "boolean",
  value: "any",
  get: "any",
  set: "any"
};

exports.getPrototypeOf = [[], "any"];
exports.setPrototypeOf = [["any"], null];
exports.isExtensible = [[], "boolean"];
exports.preventExtensions = [[], null];
exports.getOwnPropertyDescriptor = [["string"], descriptor];
exports.defineProperty = [["string", descriptor], null];
exports.has = [["string"], "boolean"];
exports.get = [["string", "any"], "any"];
exports.set = [["string", "any", "any"], null];
exports.deleteProperty = [["string"], "boolean"];
exports.ownKeys = [[], ["string"]];
exports.apply = [["any", ["any"]], "any"];
exports.construct = [["any"], "any"];

// exports.input = {};
// exports.input.getPrototypeOf = [];
// exports.input.setPrototypeOf = ["any"];
// exports.input.isExtensible = [];
// exports.input.preventExtensions = [];
// exports.input.getOwnPropertyDescriptor = ["string"];
// exports.input.defineProperty = ["string", descriptor];
// exports.input.has = ["string"];
// exports.input.get = ["string", "any"];
// exports.input.set = ["string", "any", "any"];
// exports.input.deleteProperty = ["string"];
// exports.input.ownKeys = [];
// exports.input.apply = ["any", ["any"]];
// exports.input.construct = [["any"]];

// exports.output = {};
// exports.output.getPrototypeOf = "any";
// exports.output.isExtensible = "boolean";
// exports.output.getOwnPropertyDescriptor = descriptor;
// exports.output.has = "boolean";
// exports.output.get = "any";
// exports.output.deleteProperty = "boolean";
// exports.output.ownKeys = ["string"];
// exports.output.apply = "any";
// exports.output.construct = "any";
