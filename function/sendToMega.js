const fs = require("fs");
const { Storage } = require("megajs");

const sendToMega = async (req, res) => {
  try {
    console.log("called send-to-mega");
    const file = req.file;
    const storage = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD,
    }).ready;
    console.log("logged in");
    const data = fs.readFileSync(`/tmp/${file.filename}`);
    const upFile = await storage.upload(file.originalname, data).complete;
    fs.unlinkSync(file.path);
    console.log("success");
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("Error on send to mega file:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = sendToMega;
