require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
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

mongoose.connection.once("open", function () {
  // All OK - fire (emit) a ready event.
  console.log("DB Connected!");
});
