
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
exports.getOwnPropertyDescriptor = [["string"], descriptor];
exports.defineProperty = [["string", descriptor], "boolean"];
exports.has = [["string"], "boolean"];
exports.get = [["string", "any"], "any"];
exports.set = [["string", "any", "any"], "boolean"];
exports.deleteProperty = [["string"], "boolean"];
exports.ownKeys = [[], ["string"]];
exports.apply = [["any", ["any"]], "any"];
exports.construct = [["any"], "any"];
