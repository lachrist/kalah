
var Remote = require("./remote.js");
var Frontier = require("./frontier.js");
var TypeMap = require("./type-map.js");

module.exports = function (melf) {
  var kahla = {};
  var remote = Remote(melf, kahla);
  var frontier = Frontier(melf, remote);
  var importers = {
    boolean: Boolean,
    number: Number,
    string: String,
    target: function (idx) { return frontier.local(idx) },
    value: frontier.import
  };
  var exporters = {
    boolean: Boolean,
    number: Number,
    string: String,
    target: function (tgt) { return tgt.counter },
    value: frontier.export
  };
  kahla.import = function (value, type) {
    return type ? TypeMap(value, type, importers) : frontier.import(value);
  };
  kahla.export = function (value, type) {
    return type ? TypeMap(value, type, exporters) : frontier.export(value);
  };
  return kahla;
};
