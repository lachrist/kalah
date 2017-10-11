
const loop = (value, type, mappers) => {
  if (type in mappers)
    return mappers[type](value);
  if (Array.isArray(type)) {
    const xs = [];
    const last = type[type.length-1]
    for (var i=0; i<value.length; i++)
      xs[i] = loop(value[i], type[i] || last, mappers);
    return xs;
  }
  if (typeof type === "object" && type !== null) {
    const o = {};
    for (var k in type) {
      if (k in value) {
        o[k] = loop(value[k], type[k], mappers);
      }
    }
    return o;
  }
  throw new Error("Unrecognized type: "+type);
};

module.exports = loop;
