module.exports = function (melf, loc, imp, exp) {
  function stringify (spc, val) {
    if (spc === "value")
      return "imp("+JSON.stringify(exp(val))+")";
    if (spc === "string")
      return JSON.stringify(String(val));
    if (spc === "boolean")
      return String(Boolean(val));
    if (Array.isArray(spc))
      return "["+Array.prototype.map.call(val, stringify.bind(null, spc[0])).join(",")+"]";
    var xs = [];
    for (var k in spc)
      xs.push(JSON.stringify(k)+":"+stringify(scp[k], val[k]));
    return "{"+xs.join(",")+"}";
  }
  function trigger (trp, tgt, args, spcs) {
    return melf.sync.trigger(
      tgt.alias,
      "kalah",
      "Reflect."+trp+"(loc("+tgt.counter+")"+args.map(function (val, idx) {
        return ","+stringify(spcs[idx], val);
      }).join("")+")");
  }
  var traps = {};
  traps.getPrototypeOf = function (tgt) {
    return imp(JSON.parse(trigger("getPrototypeOf", tgt, [], [])));
  };
  traps.setPrototypeOf = function (tgt, prt) {
    trigger("setPrototypeOf", tgt, [prt], ["value"]);
  };
  traps.isExtensible = function (tgt) {
    return JSON.parse(trigger("isExtensible", tgt, [], []));
  };
  traps.preventExtensions = function (tgt) {
    trigger("preventExtensions", tgt, [], []);
  }
  traps.getOwnPropertyDescriptor = function (tgt, key) {
    var res = JSON.parse(trigger("getOwnPropertyDescriptor", tgt, [key], ["string"]));
    ["value", "get", "set"].forEach(function (key) {
      if (key in res)
        res[key] = imp(res[key]);
    });
    return res;
  };
  traps.defineProperty = function (tgt, key, prp) {
    return JSON.parse(trigger("defineProperty", tgt, [key, prp], ["value", {
      configurable: "boolean",
      enumerable: "boolean",
      writable: "boolean",
      value: "value",
      get: "value",
      set: "value"
    }]));
  };
  traps.has = function (tgt, key) {
    return JSON.parse(trigger("has", tgt, [key], ["string"]));
  };
  traps.get = function (tgt, key, rec) {
    return imp(JSON.parse(trigger("get", tgt, [key, rec], ["string", "value"])));
  };
  traps.set = function (tgt, key, val, rec) {
    trigger("get", tgt, [key, val, rec], ["string", "value", "value"]);
  };
  traps.deleteProperty = function (tgt, key) {
    return JSON.parse(trigger("deleteProperty", tgt, [key], ["string"]));
  };
  traps.ownKeys = function (tgt) {
    return JSON.parse(trigger("ownKeys", tgt, [], [])).map(function () {})
  };
  traps.apply = function (tgt, ths, args) {
    return imp(JSON.parse(trigger("apply", tgt, [ths, args], ["value", ["value"]])));
  };
  traps.construct = function (tgt, args) {
    return imp(JSON.parse(trigger("apply", tgt, [args], [["value"]])));
  };
  return function (key, tgt) {
    // The target must be a function for the
    // proxy to also behave like a function
    var parts = /^([^\/]+)\/([0-9]+)$/.exec(key);
    if (!parts)
      throw new Error("Cannot create a remote reference for key: "+key);
    tgt.alias = parts[1];
    tgt.counter = parts[2];
    return new Proxy(tgt, traps);
  };
};