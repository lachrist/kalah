
// TODO make "null | descriptor" possible
// TODO make "symbol | string" possible

const descriptor = {
  configurable: "boolean",
  enumerable: "boolean",
  writable: "boolean",
  value: "any",
  get: "any",
  set: "any"
};

exports.getPrototypeOf = [[], "any"];
exports.setPrototypeOf = [["any"], "boolean"];
exports.isExtensible = [[], "boolean"];
exports.preventExtensions = [[], "boolean"];
exports.getOwnPropertyDescriptor = [["primitive"], "any"]; 
exports.defineProperty = [["primitive", descriptor], "boolean"];
exports.has = [["primitive"], "boolean"];
exports.get = [["primitive", "any"], "any"];
exports.set = [["primitive", "any", "any"], "boolean"];
exports.deleteProperty = [["primitive"], "boolean"];
exports.ownKeys = [[], ["string"]];
exports.apply = [["any", ["any"]], "any"];
exports.construct = [["any"], "any"];
