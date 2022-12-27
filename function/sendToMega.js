const fs = require("fs");
const { Storage } = require("megajs");

const sendToMega = async (req, res) => {
  try {
    console.log("called send-to-mega");
    const file = req.files.file;
    console.log(req.files.file);
    const storage = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD,
    }).ready;
    console.log("logged in");

    const fileStream = fs.createReadStream(file.path);
    const uploadStream = storage.upload({
      name: file.originalname,
      size: file.size,
    });
    fileStream.pipe(uploadStream);

    const uploadFile = await fileStream.complete;

    // const upFile = await storage.upload(file.originalname, data).complete;
    // fileStream.pip(await storage.upload("test.txt", file).complete);
    // fs.unlinkSync(file.path);
    console.log("success");
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = sendToMega;
