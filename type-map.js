function loop (value, type, mappers) {
  if (typeof type === "string") {
    if (type in mappers)
      return mappers[type](value);
    else
      throw new Error("Unknown type: "+type+", must be one of: "+Object.keys(mappers))
  }
  if (Array.isArray(type)) {
    var xs = [];
    var last = type[type.length-1]
    for (var i=0; i<value.length; i++)
      xs[i] = loop(value[i], type[i] || last, mappers);
    return xs;
  }
  var o = {};
  for (var k in type)
    if (k in value)
      o[k] = loop(value[k], type[k], mappers);
  return o;
};

module.exports = loop;