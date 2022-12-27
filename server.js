require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ extended: true, limit: "500mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
// const upload = multer({ dest: "/tmp/", limits: { fileSize: "500mb" } });

app.use("/file-upload", require("./function/sendToMega"));

app.use(express.static(path.join(__dirname, "/public")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
