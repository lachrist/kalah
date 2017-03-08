
var Melf = require("melf");
var Kalah = require("kalah");

var melf = Melf({
  boxdir: __dirname+"/boxdir",
  alias: "fantasio"
});
var kalah = Kalah(melf);

var marsupilami = {
  toys: [],
  play: function () {
    console.log("marsupilami is playing with: "+this.toys);
  }
};

console.log(melf.sync.trigger("spirou", "marsupilami", JSON.stringify(kalah.export(marsupilami))));

melf.close();