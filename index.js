const express = require("express");
const app = express();
const cors = require("cors");
const cloudinary = require("cloudinary");
const multer = require("multer");

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: 'dwmwpmrpo',
  api_key: '116391666589298',
  api_secret: 'oFm_hBGdeiOXIXWt8ZchlCfdr0c',
});

const multerValidate = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error("file format not supported"), false);
      return;
    }
    cb(null, true);
  },
});

app.get("/", (req, res) => {
  res.send("backend route");
});

app.post("/", multerValidate.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({
      success: 1,
      file: {
        url: `${result.url}`,
      },
    });
  } catch {
    res.json({ sucess: 0 });
    console.log("error while uploading");
    res.status(400);
  }
console.log(req);
res.send('hello')
});

app.listen(4444, () => {
  console.log("connected at port: 4444");
});
