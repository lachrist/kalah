
const Reference = require("./reference.js");
const TypeMap = require("./type-map.js");

module.exports = (melf, options) => {
  options = options || {};
  options.sync = options.sync || false;
  options.prefix = options.prefix || "";
  const imp = (value, type) => TypeMap(value, type || "any", importers);
  const exp = (value, type) => TypeMap(value, type || "any", exporters);
  const reference = Reference(melf, imp, exp, options);
  const importers = {
    json: (x) => x,
    reference: reference.import,
    boolean: Boolean,
    number: (x) => {
      if (Array.isArray(x) && x.length === 1) {
        const inner = x[0];
        if (inner === "undefined")
          return void 0;
        if (inner === "NaN")
          return 0/0;
        if (inner === "-Infinity")
          return -1/0;
        if (inner === "Infinity")
          return 1/0;
      }
      return Number(x);
    },
    string: String,
    primitive: (x) => {
      if (typeof x === "number" || typeof x === "string" || x === null)
        return x;
      if (Array.isArray(x) && x.length === 1) {
        const inner = x[0];
        if (inner === "undefined")
          return void 0;
        if (inner === "NaN")
          return 0/0;
        if (inner === "-Infinity")
          return -1/0;
        if (inner === "Infinity")
          return 1/0;
      }
      throw new Error("Cannot import as primitive: "+x);
    },
    any: (x) => {
      if (typeof x === "number" || typeof x === "string" || x === null)
        return x;
      if (Array.isArray(x) && x.length === 1) {
        const inner = x[0];
        if (inner === "undefined")
          return void 0;
        if (inner === "NaN")
          return 0/0;
        if (inner === "-Infinity")
          return -1/0;
        if (inner === "Infinity")
          return 1/0;
        return reference.import(inner);
      }
      throw new Error("Cannot import: "+x);
    }
  };
  const exporters = {
    json: (x) => x,
    reference: reference.export,
    boolean: Boolean,
    number: (x) => {
      x = Number(x);
      if (x !== x)
        return ["NaN"];
      if (x === -1/0)
        return ["-Infinity"];
      if (x === 1/0)
        return ["Infinity"];
      return x;
    },
    string: String,
    primitive: (x) => {
      if (typeof x === "symbol")
        throw new Error("Cannot exports symbols: "+x);
      if (x === void 0)
        return ["undefined"];
      if (x !== x)
        return ["NaN"];
      if (x === -1/0)
        return ["-Infinity"];
      if (x === 1/0)
        return ["Infinity"];
      if (x === null || typeof x === "number" || typeof x === "string")
        return x;
      throw new Error("Cannot exports as primitive: "+x);
    },
    any: (x) => {
      if (typeof x === "symbol")
        throw new Error("Cannot exports symbols: "+x);
      if (x === void 0)
        return ["undefined"];
      if (x !== x)
        return ["NaN"];
      if (x === -1/0)
        return ["-Infinity"];
      if (x === 1/0)
        return ["Infinity"];
      if (x === null || typeof x === "number" || typeof x === "string")
        return x;
      return [exporters.reference(x)];
    }
  };
  return {
    import: imp,
    export: exp,
    ownerof: reference.ownerof
  };
};
