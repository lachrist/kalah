var Http = require("http");
var Ws = require("ws");
var Fs = require("fs");
var MelfHijack = require("melf/hijack");
var ChildProcess = require("child_process")

var socket = __dirname+"/socket";
var splitter = "marsupilami";

try {
  Fs.unlinkSync(socket)
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

var mhijack = MelfHijack(splitter);
mhijack.on("connect", function (alias) { console.log(alias+" connected") });
mhijack.on("authentify", function (alias) { console.log(alias+" authentified") });
mhijack.on("disconnect", function (alias) { console.log(alias+" dicconnected") });
var server = Http.createServer(mhijack.request);
(new Ws.Server({server:server})).on("connection", mhijack.socket);
server.listen(socket, function () {
  var stdio = ["ignore", "inherit", "inherit", "ipc"];
  var args = [
    "--socket", socket,
    "--splitter", splitter,
  ];
  ChildProcess.fork(__dirname+"/spirou.js", args, {stdio:stdio}).on("message", function () {
    ChildProcess.fork(__dirname+"/fantasio.js", args, {stdio:stdio});
  });
});
