const Emitter = require("antena/emitter/worker");
const Melf = require("melf");
const Kalah = require("../main.js");
Melf({
  emitter: Emitter(),
  alias: "bob",
  key: "key-b"
}, (error, melf) => {
  if (error)
    throw error;
  const akalah = Kalah(melf, {
    sync: false,
    namespace: "foo"
  });
  const skalah = Kalah(melf, {
    sync: true,
    namespace: "bar"
  });
  let counter = 0;
  const increment = (message) => {
    console.log(message+" "+counter);
    return ++counter;
  };
  console.log("async-kalah "+melf.rcall("alice", "counter-async", akalah.export(increment)));
  console.log("sync-kalah "+melf.rcall("alice", "counter-sync", skalah.export(increment)));
});


// const traps = {};
// [ "getPrototypeOf",
//   "setPrototypeOf",
//   "isExtensible",
//   "preventExtensions",
//   "getOwnPropertyDescriptor",
//   "defineProperty",
//   "has",
//   "get",
//   "set",
//   "deleteProperty",
//   "ownKeys",
//   "apply",
//   "construct"
// ].forEach((name) => {
//   traps[name] = (...arguments) => {
//     console.log();
//     return Reflect[name].apply(null, arguments);
//   };
// });


// const pobject = new Proxy({foo:"bar"}, traps);
// const pfunction = new Proxy({}, traps);
// const parray = new Proxy([1,2,3], traps);



// const traps = {
//   getPrototypeOf: (target) => {
//     console.log()
//     return Reflect.getPrototypeOf(target);
//   }
//   exports.getPrototypeOf = [["reference"], "any"];
//   exports.setPrototypeOf = [["reference", "any"], "boolean"];
//   exports.isExtensible = [["reference"], "boolean"];
//   exports.preventExtensions = [["reference"], "boolean"];
//   exports.getOwnPropertyDescriptor = [["reference", "string"], descriptor];
//   exports.defineProperty = [["reference", "string", descriptor], "boolean"];
//   exports.has = [["reference", "string"], "boolean"];
//   exports.get = [["reference", "string", "any"], "any"];
//   exports.set = [["reference", "string", "any", "any"], "boolean"];
//   exports.deleteProperty = [["reference", "string"], "boolean"];
//   exports.ownKeys = [["reference"], ["string"]];
//   exports.apply = [["reference", "any", ["any"]], "any"];
//   exports.construct = [["reference", "any"], "any"];

// };
// var pobject = new Proxy({}, {});
// melf.rprocedures.greeting = (origin, data, callback) => {
  
// };
// const kalah = Kalah(melf, {sync:true});

