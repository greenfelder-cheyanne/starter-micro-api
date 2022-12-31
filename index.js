require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ extended: true, limit: "500mb" }));
const upload = multer({ dest: "/tmp/", limits: { fileSize: "500mb" } });

app.use(
  "/file-upload",
  upload.single("file"),
  require("./function/sendToMega")
);

app.listen(port, () => {
  console.log(`Server listening at port:${port}`);
});
