
var Http = require("http");
var Ws = require("ws");
var MelfServer = require("melf/server");
var Childprocess = require("child_process")

var mserver = MelfServer({splitter:"marsupilami"});
var server = Http.createServer(mserver.hijack.request);
(new Ws.Server({server:server})).on("connection", mserver.hijack.socket);
server.listen(__dirname+"/socket", function () {
  var stdio = ["ignore", process.stdout, process.stderr, "ipc"];
  var spirou = Childprocess.fork(__dirname+"/spirou.js", {stdio:stdio});
  var fantasio = null;
  spirou.on("message", function (message) {
    if (message === "ready") {
      fantasio = Childprocess.fork(__dirname+"/fantasio.js", {stdio:stdio});
    } else if (message === "done") {
      server.close();
      spirou.kill("SIGINT");
      fantasio.kill("SIGINT");
    }
  });
});
