import formidable from "formidable"
import {errors} from "formidable";
import type { NextApiRequest } from "next";

export const decodeForm = async (req: NextApiRequest) => {
    const form = formidable({ multiples: true})
    return new Promise<{ files: formidable.File[]|undefined, fields: formidable.Fields }>(
        (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err && (err as {code?:number})?.code===errors.noEmptyFiles) {
                return reject("Empty file not allowed")
            }
            if (err) {
                return reject(err)
            }
            resolve({ files: files.file, fields: fields })
        })
    })
}