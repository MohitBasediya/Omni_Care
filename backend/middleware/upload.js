import path from "path";
import multer from "multer";
var storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload= multer({
    storage: storage
}).fields([
    { name: 'ServiceImage', maxCount: 10 },
]);

export const upload1= multer({
    storage: storage
}).fields([
    { name: 'aadharimg', maxCount: 1},
    { name: 'AgencyImg', maxCount: 1},
    { name: 'profileimg', maxCount: 1}
]);

export const upload2 = multer({
    storage: storage
}).fields([
    { name: 'ServiceImage', maxCount: 1 },
]);