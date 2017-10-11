var Minimist = require("minimist");
var Client = require("client-uniform/node");
var Melf = require("melf");
var Kalah = require("kalah");
var options = Minimist(process.argv.slice(2));
var melf = Melf({
  client: Client(options.socket, false),
  splitter: options.splitter,
  alias: "fantasio"
});
var kalah = Kalah(melf);
var marsupilami = {
  toys: [],
  play: function () {
    console.log("marsu is playing with: "+this.toys);
  }
};
console.log(melf.emit("spirou", "marsupilami", kalah.export(marsupilami)));