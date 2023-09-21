import { v2 as cloudinary } from "cloudinary"
import type { File as formidableFile } from "formidable"
import { env } from "../env/server.mjs"


cloudinary.config({
    cloud_name: env.CLOUDINDARY_CLOUD_NAME,
    api_key: env.CLOUDINDARY_API_KEY,
    api_secret: env.CLOUDINDARY_API_SECRET,
})

export const uploadImage = async (file: formidableFile, upload_preset: string) => {
    if(!file.mimetype || !["image/png","image/jpeg","image/bmp"].includes(file.mimetype))
        throw "Invalid file format use png,jpeg,bmp"
        
    const p = await cloudinary.uploader.upload(file.filepath, { upload_preset: upload_preset }).catch((err) => {
        throw err
    })
    return p.secure_url
}

export const deleteImage = async (secure_url: string) => {
    const temp = secure_url.split("/")
    if (temp.length < 2)
        throw "Invalid url"

    let public_id: string | undefined = temp[temp.length - 2] + "/" + temp[temp.length - 1]
    public_id = public_id.split(".")[0]

    if (public_id === undefined)
        throw "Invalid url"

    await cloudinary.uploader.destroy(public_id,{invalidate:true}).catch((err) => {
        throw err
    })
}