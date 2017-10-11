
var Reference = require("./reference.js");
var TypeMap = require("./type-map.js");

function isjsonprimitive (x) {
  return x === null
      || x === true
      || x === false
      || typeof x === "number"
      || typeof x === "string";
}

function identity (x) { return x }

module.exports = function (melf, sync) {
  var kalah = {};
  var reference = Reference(melf, kalah, sync);
  var importers = {
    reference: reference.import,
    json: identity,
    boolean: identity,
    number: identity,
    string: identity,
    primitive: function (x) {
      return (x && "u" in x) ? undefined : x;
    },
    any: function (x) {
      if (isjsonprimitive(x))
        return x;
      if ("u" in x)
        return undefined;
      return reference.import(x.r);
    }
  };
  var exporters = {
    reference: reference.export,
    json: identity,
    boolean: Boolean,
    number: Number,
    string: String,
    primitive: function (x) {
      if (typeof x === "object" && x !== null)
        x = x.valueOf();
      if (x === undefined)
        return {u:1};
      if (isjsonprimitive(x))
        return x;
      return Object.prototype.toString.apply(x);
    },
    any: function (x) {
      if (isjsonprimitive(x))
        return x;
      if (x === undefined)
        return {u:0};
      return {r:exporters.reference(x)};
    }
  };
  kalah.ownerof = reference.ownerof,
  kalah.import = function (value, type) {
    return TypeMap(value, type || "any", importers);
  };
  kalah.export = function (value, type) {
    return TypeMap(value, type || "any", exporters);
  };
  return kalah;
};
