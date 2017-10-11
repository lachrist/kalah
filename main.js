
const Reference = require("./reference.js");
const TypeMap = require("./type-map.js");

const isjsonprimitive = (x) => {
  return x === null || x === true || x === false || typeof x === "number" || typeof x === "string";
}

module.exports = (melf, options) => {
  options = options || {};
  options.sync = options.sync || false;
  options.prefix = options.prefix || "";
  const imp = (value, type) => TypeMap(value, type || "any", importers);
  const exp = (value, type) => TypeMap(value, type || "any", exporters);
  const reference = Reference(melf, imp, exp, options);
  const importers = {
    reference: reference.import,
    json: (x) => x,
    boolean: (x) => x,
    number: (x) => x,
    string: (x) => x,
    primitive: (x) => (x && "u" in x) ? void 0 : x,
    any: (x) => {
      if (isjsonprimitive(x))
        return x;
      if ("u" in x)
        return void 0;
      return reference.import(x.r);
    }
  };
  const exporters = {
    reference: reference.export,
    json: (x) => x,
    boolean: Boolean,
    number: Number,
    string: String,
    primitive: (x) => {
      if (typeof x === "object" && x !== null)
        x = x.valueOf();
      if (x === void 0)
        return {u:1};
      if (isjsonprimitive(x))
        return x;
      return Object.prototype.toString.apply(x);
    },
    any: (x) => {
      if (isjsonprimitive(x))
        return x;
      if (x === undefined)
        return {u:1};
      return {r:exporters.reference(x)};
    }
  };
  return {
    import: imp,
    export: exp,
    ownerof: reference.ownerof
  };
};
