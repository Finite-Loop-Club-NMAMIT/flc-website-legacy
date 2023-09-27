//admin can access this route to upload images
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { decodeForm } from "../../../utils/form";
import { uploadImage } from "../../../utils/cloudinary";

interface CloudinaryResponse {
    secure_url: string;
}
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (session === null || session.user === undefined)
            throw "User not logged in"

        const user = await prisma?.user.findFirst({ where: { id: session.user.id } })

        if (!user || user.isAdmin === false)
            throw "user invalid or user is not admin"

        const { fields, files } = await decodeForm(req)

        if (!!!fields  || fields.upload_preset === undefined || fields.upload_preset[0] === undefined)
            throw "Field upload_preset not found"

        if (files == undefined || files[0] === undefined)
            throw "No file uploaded"

        const unpload_preset = fields.upload_preset[0]
        console.log(unpload_preset)
        const result = await uploadImage(files[0], unpload_preset)
        if (!result)
            res.status(500).send("Server Error")

        res.status(200).send({secure_url:result} as CloudinaryResponse)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};