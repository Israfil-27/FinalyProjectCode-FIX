import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname));
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only !");
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "image upload",
    image: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

export default router;

// import express from "express";
// import multer from "multer";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads")); // Corrected destination directory
//   },
//   filename(req, file, cb) {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.originalname}-${Date.now()}${extname}`);
//     console.log(file);
//   },
// });

// function checkFileType(file, cb) {
//   const fileTypes = /jpg|jpeg|png/;
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = fileTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("image only");
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// router.post("/", upload.single("image"), (req, res) => {
//   res.status(201).json({
//     message: "File uploaded successfully.",
//     filename: req.file.filename,
//   });
// });
// export default router;
