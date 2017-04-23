
var Remote = require("./remote.js");
var Reference = require("./reference.js");
var TypeMap = require("./type-map.js");

function isjson (x) {
  return x === null
      || x === true
      || x === false
      || typeof x === "number"
      || typeof x === "string";
}

module.exports = function (melf) {
  var kahla = {};
  var remote = Remote(melf, kahla);
  var reference = Reference(melf.alias, remote);
  var importers = {
    primitive: function (x) {
      if (isjson(x))
        return x;
      if ("u" in x)
        return undefined;
      throw new Error("Cannot import a primitive from: "+JSON.stringify(x));
    },
    reference: function (x) {
      return x === null ? null : reference.import(x);
    },
    any: function (x) {
      if (isjson(x))
        return x;
      if ("u" in x)
        return undefined;
      return reference.import(x);
    },
    boolean: Boolean,
    number: Number,
    string: String,
    target: function (idx) { return reference.local(idx) }
  };
  var exporters = {
    primitive: function (x) {
      if (typeof x === "object" && x !== null)
        x = x.valueOf();
      if (isjson(x))
        return x;
      if (x === undefined)
        return {u:1};
      return "[object Object]";
    },
    reference: function (x) {
      return x === null ? null : reference.export(Object(x));
    },
    any: function (x) {
      if (isjson(x))
        return x;
      if (x === undefined)
        return {u:1};
      return exporters.reference(x);
    },
    boolean: Boolean,
    number: Number,
    string: String,
    target: function (tgt) { return tgt.counter }
  };
  kahla.import = function (value, type) {
    return TypeMap(value, type || "any", importers);
  };
  kahla.export = function (value, type) {
    return TypeMap(value, type || "any", exporters);
  };
  return kahla;
};
