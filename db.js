require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
console.log("<config-db>DB_URL: ", process.env.DB_URL);
const connection = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("db connected");
    require("./server");
  })
  .catch((err) => {
    console.log("connection err ", err);
  });
