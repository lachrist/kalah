
var Melf = require("melf");
var Kalah = require("kalah");

var melf = Melf({
  boxdir: __dirname+"/boxdir",
  alias: "spirou"
});
var kalah = Kalah(melf);

melf.sync.register("marsupilami", function (origin, data) {
  var marsupilami = kalah.import(JSON.parse(data));
  marsupilami.toys.push("car");
  marsupilami.toys.push("plane");
  marsupilami.play();
  return "that was funky!";
});

melf.close();