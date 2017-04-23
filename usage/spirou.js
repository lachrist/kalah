var Melf = require("melf/node");
var Kalah = require("kalah");
var melf = Melf({
  format: JSON,
  alias: "spirou",
  url: __dirname+"/socket",
  splitter: "marsupilami"
});
var kalah = Kalah(melf);
melf.sync.register("marsupilami", function (origin, data, callback) {
  var marsupilami = kalah.import(data);
  marsupilami.toys.push("car");
  marsupilami.toys.push("plane");
  marsupilami.play();
  callback(null, "that was funky!");
  process.send("done");
});
process.send("ready");