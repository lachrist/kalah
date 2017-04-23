
var ReflectTypes = require("./reflect-types.js");

module.exports = function (melf, kahla) {
  var traps = {};
  Object.keys(ReflectTypes.arguments).forEach(function (key) {
    var name = "kalah-"+key;
    var t1 = ReflectTypes.arguments[key];
    var t2 = ReflectTypes.result[key];
    melf.sync.register(name, function (origin, data, callback) {
      var res = Reflect[key].apply(null, kahla.import(data, t1));
      callback(null, t2 ? kahla.export(res, t2) : "");
    });
    traps[key] = function (tgt) {
      var data = melf.sync.emit(tgt.alias, name, kahla.export(arguments, t1));
      if (t2)
        return kahla.import(data, t2);
    };
  });
  return function (key, tgt) {
    var parts = /^([^\/]+)\/([0-9]+)$/.exec(key);
    if (!parts)
      throw new Error("Cannot create a remote reference for key: "+key);
    tgt.alias = parts[1];
    tgt.counter = Number(parts[2]);
    return new Proxy(tgt, traps);
  };
};
