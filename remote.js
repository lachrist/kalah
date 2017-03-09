
var ReflectTypes = require("./reflect-types.js");

module.exports = function (melf, kahla) {
  var traps = {};
  Object.keys(ReflectTypes.arguments).forEach(function (key) {
    var event = "kalah-"+key;
    var t1 = ReflectTypes.arguments[key];
    var t2 = ReflectTypes.result[key];
    melf.sync.register(event, function (origin, data) {
      var res = Reflect[key].apply(null, kahla.import(JSON.parse(data), t1));
      return t2 ? JSON.stringify(kahla.export(res, t2)) : "";
    });
    traps[key] = function (tgt) {
      var data = melf.sync.trigger(tgt.alias, event, JSON.stringify(kahla.export(arguments, t1)));
      if (t2)
        return kahla.import(JSON.parse(data), t2);
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
