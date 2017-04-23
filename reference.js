
// The target must be a function for the
// proxy to also behave like a function.
module.exports = function (alias, remote) {
  var counter = 0;
  var references = {};
  function key (ref) {
    for (var key in references)
      if (references[key] === ref)
        return key;
    var key = alias+"/"+(++counter);
    references[key] = ref;
    return key;
  }
  function ref (key, tgt) {
    return key in references ? references[key] : (references[key] = remote(key, tgt));
  }
  return {
    local: function (idx) {
      return references[alias+"/"+idx];
    },
    import: function (x) {
      if ("o" in x)
        return ref(x.o, {});
      if ("f" in x)
        return ref(x.f, function () {});
      throw new Error("Cannot import as remote reference: "+JSON.stringify(x));
    },
    export: function (x) {
      if (typeof x === "function")
        return {f:key(x)};
      if (typeof x === "object" && x !== null)
        return {o:key(x)};
      throw new Error("Cannot export as remote reference: "+x);
    }
  }
};
