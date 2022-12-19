const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req: any, file: any, cb: any) => {
        let ext = path.extname(file.originalname);
        if ((ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") && (ext !== ".mov" && ext !== ".mp4") && (ext !== ".pdf")) {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});
