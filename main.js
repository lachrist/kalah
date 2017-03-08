
var Remote = require("./remote.js");

module.exports = function (melf) {
  melf.sync.register("kalah", function (origin, data) {
    return JSON.stringify(exp(eval(data)));
  });
  var counter = 0;
  var references = {};
  function key (ref) {
    for (var key in references)
      if (references[key] === ref)
        return key;
    var key = melf.alias+"/"+(++counter);
    references[key] = ref;
    return key;
  }
  function ref (key, tgt) {
    return key in references ? references[key] : (references[key] = remote(key, tgt));
  }
  function loc (c) {
    return references[melf.alias+"/"+c];
  };
  function imp (x) {
    if (typeof x === "number" || typeof x === "string" || x === true || x === false || x === null)
      return x;
    if ("u" in x)
      return undefined;
    if ("o" in x)
      return ref(x.o, {});
    if ("f" in x)
      return ref(x.f, function () {});
    throw new Error("Cannot import: " + JSON.stringify(x));
  };
  function exp (x) {
    if (typeof x === "symbol")
      throw new Error("Cannot export symbol: "+x.toString());
    if (typeof x === "number" || typeof x === "string" || x === true || x === false || x === null)
      return x;
    if (x === undefined)
      return {u:1};
    return typeof x === "function" ? {f:key(x)} : {o:key(x)};
  }
  var remote = Remote(melf, loc, imp, exp);
  return {
    import: imp,
    export: exp
  };
};
