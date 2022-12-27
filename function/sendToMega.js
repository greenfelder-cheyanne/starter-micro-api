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
    // const fileStream = fs.createReadStream(req);

    const upFile = await storage.upload(file.originalname, data).complete;
    // const uploadStream = storage.upload({
    //   name: "hello-world.txt",
    //   size: 17000000,
    //   allowUploadBuffering: true,
    // });
    // req.pipe(uploadStream);
    // req.on("end", () => {
    //   console.log("success");
    //   res.status(200).json({ message: "success" });
    // });

    // const uploadFile = await fileStream.complete;
    fs.unlinkSync(file.path);
    console.log("success");
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = sendToMega;
