
var ReflectTypes = require("./reflect-types.js");

// The target must be a function for the
// proxy to also behave like a function.
module.exports = (melf, kalah, sync) => {
  var counter = 0;
  var traps = {};
  var refs = {};
  Object.keys(Reflect).forEach((key) => {
    var name = "kalah-"+key;
    var itype = ReflectTypes[key][0];
    var otype = ReflectTypes[key][1];
    melf.rprocedures[name] = function (origin, data, callback) {
      try {
        const target = refs[]
        var args = [refs[melf.alias+"/"+data[0]]];
        for (var i=0; i<targs.length; i++)
          args.push(kalah.import(data[i+1], targs[i]));
        var res = Reflect[key].apply(null, args);

        const res = Reflect[key].apply(null, [refs[melf.alias+"/"+data[0]]].concat(kalah.import(data[1], itype)));
      } catch (err) {
        return callback(err);
      }
      callback(null, tres ? kalah.export(res, tres) : "");
    };
    if (sync) {
      traps[key] = function (target) {
        var data = [target.token];
        for (var i=0; i<targs.length; i++)
          data.push(kalah.export(arguments[i+1], targs[i]));
        var data = melf.rcall(target.alias, name, data);
        if (tres) {
          return kalah.import(data, tres);
        }
      };
    } else {
      traps[key] = function (target) {
        var args = arguments;
        return new Promise(function (resolve, reject) {
          var data = [target.token];
          for (var i=0; i<targs.length; i++)
            data.push(kalah.export(args[i+1], targs[i]));
          melf.rcall(target.alias, name, data, function (error, data) {
            if (error)
              return reject(error);
            resolve(tres ? kalah.import(data, tres) : null);
          });
        });
      }
    }
  });
  return {
    owner: function (ref) {
      for (var key in refs)
        if (refs[key] === ref)
          return key.split("/")[0];
      return melf.alias;
    },
    import: function (key) {
      if (key in refs)
        return refs[key];
      var parts = key.split("/");
      if (parts[1][0] === "f")
        var target = function () {};
      else if (parts[1][0] === "a")
        var target = [];
      else
        var target = {};
      target.alias = parts[0];
      target.token = parts[1];
      return refs[key] = new Proxy(target, traps);
    },
    export: function (ref) {
      for (var key in refs)
        if (refs[key] === ref)
          return key;
      if (typeof ref === "function")
        var type = "f";
      else if (Array.isArray(ref))
        var type = "a";
      else
        var type = "o";
      var key = melf.alias+"/"+type+(++counter).toString(36);
      refs[key] = ref;
      return key;
    }
  };
};
