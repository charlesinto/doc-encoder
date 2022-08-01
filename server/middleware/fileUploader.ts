import multer from 'multer';
import path from 'path';
import  fs  from "fs";
export const uploadPath = path.join(__dirname, '../uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, {recursive: true})
      }
      cb(null, uploadPath)
    },
    filename: function (req: any, file, cb) {
        const filename = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]
        req.filename = filename;
        cb(null, filename)
    },

  })

const fileValidator = (req: any, file: any, cb: any) =>{
    if (!file.originalname.match(/\.(txt)$/)) {
        req.fileValidationError = 'Only txt are allowed!';
        return cb(null, true);
    }
    req.fileValidationError = null
    cb(null, true);
}

export const fileUploader = multer({ storage: storage, fileFilter: fileValidator })


export const removeUploadedFile = (path: string) => fs.unlinkSync(path)
