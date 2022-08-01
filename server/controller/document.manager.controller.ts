
import { Request, Response } from "express";
import  fs  from "fs";
import { removeUploadedFile, uploadPath } from "../middleware/fileUploader";

interface IRequest extends Request{
  fileValidationError?: string,
  filename?: string
}

class DocumentManagerController{

  static handleUpload(req: IRequest, res: Response){
      try{
        if(req.fileValidationError){
          return res.status(406).send({message: req.fileValidationError})
        }

        const REPLACE_VALUE = 'XXXX'


        const filePath = uploadPath + `/${req.filename}`

        const fileBuff = fs.readFileSync(filePath, 'utf8')

        const textContent = fileBuff.toString()


        const keywords: string[] = req.body.keywords || []

        let updatedContent = textContent;

        keywords.forEach(item => {
          const regex = new RegExp(item, 'g')
          updatedContent = updatedContent.replace(regex, REPLACE_VALUE)
        })

        updatedContent += '\nKeywords: ' + keywords.join(',')

       fs.writeFileSync(filePath, updatedContent, {encoding: 'utf-8', flag: 'w'})

        res.sendFile(filePath)

        // removeUploadedFile(filePath)
      }catch(error: any){
        throw new Error(error)
      }
  }
}

export default DocumentManagerController;
