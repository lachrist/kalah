var Melf = require("melf/node");
var Kalah = require("kalah");
var melf = Melf({
  format: JSON,
  alias: "fantasio",
  url: __dirname+"/socket",
  splitter: "marsupilami"
});
var kalah = Kalah(melf);
var marsupilami = {
  toys: [],
  play: function () {
    console.log("marsu is playing with: "+this.toys);
  }
};
console.log(melf.sync.emit("spirou", "marsupilami", kalah.export(marsupilami)));
