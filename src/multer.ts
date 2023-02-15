import crypto from "crypto";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, crypto.randomUUID() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
