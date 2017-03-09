
function isjson (x) {
  return x === null
      || x === true
      || x === false
      || typeof x === "number"
      || typeof x === "string";
}

// The target must be a function for the
// proxy to also behave like a function.
module.exports = function (melf, remote) {
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
  return {
    local: function (idx) {
      return references[melf.alias+"/"+idx];
    },
    import: function (x) {
      if (isjson(x))
        return x;
      if ("u" in x)
        return undefined;
      if ("o" in x)
        return ref(x.o, {});
      if ("f" in x)
        return ref(x.f, function () {});
      throw new Error("Cannot import: " + JSON.stringify(x));
    },
    export: function (x) {
      if (typeof x === "symbol")
        throw new Error("Cannot export symbol: "+x.toString());
      if (isjson(x))
        return x;
      if (x === undefined)
        return {u:1};
      return typeof x === "function" ? {f:key(x)} : {o:key(x)};
    }
  }
};
