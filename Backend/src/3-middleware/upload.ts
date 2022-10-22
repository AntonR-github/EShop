import path from "path";
import multer from "multer";



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "./../1-assets/images"));
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        let name = path.basename(file.originalname, ext);
        cb(null, name + "-" + Date.now() + ext);
    },
});

const upload = multer({ 
    storage: storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            alert("Only .png, .jpg and .jpeg format allowed!");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    },   
});

export default upload;