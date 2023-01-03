module.exports = () => {
  try {
    const express = require("express");
    const fs = require("fs");
    const cors = require("cors");
    const http = require("http");

    const socket = require("./socket");

    const app = express();
    global.rootDir = __dirname;
    const server = http.createServer(app);
    let port = 5001;

    app.use(cors());
    app.use(express.json({ extended: false, limit: "250mb" }));
    // app.use(
    //   express.urlencoded({
    //     limit: "250mb",
    //     extended: true,
    //     parameterLimit: 50000,
    //   })
    // );
    // app.use(express.static("uploads"));
    // app.use("/uploads", express.static("public"));
    app.use("/chat", require("./api"));
    app.get("*", (req, res) => {
      res.send("Welcome to Chat ver: 2.0.0");
    });

    socket(server, port);

    server.listen(port, () => {
      console.log("server running on port: " + port);
    });
  } catch (e) {
    console.log(e);
  }
};
