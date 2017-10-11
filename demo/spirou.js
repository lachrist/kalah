var Minimist = require("minimist");
var Client = require("client-uniform/node");
var Melf = require("melf");
var Kalah = require("kalah");
var options = Minimist(process.argv.slice(2));
var melf = Melf({
  client: Client(options.socket, false),
  splitter: options.splitter,
  alias: "spirou"
});
var kalah = Kalah(melf);
melf.on("marsupilami", function (origin, data, callback) {
  var marsupilami = kalah.import(data);
  marsupilami.toys.push("car");
  marsupilami.toys.push("plane");
  marsupilami.play();
  callback(null, "that was funky!");
});
process.send("ready");