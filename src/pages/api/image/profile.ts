import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary"
import { deleteImage, uploadImage } from "../../../utils/cloudinary";
import { decodeForm } from "../../../utils/form";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


cloudinary.config({
    cloud_name: process.env.CLOUDINDARY_CLOUD_NAME,
    api_key: process.env.CLOUDINDARY_API_KEY,
    api_secret: process.env.CLOUDINDARY_API_SECRET,
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const session = await getServerSession(req,res,authOptions)
        if (session === null || session.user === undefined)
            throw "User not logged in"

        const user = await prisma?.user.findFirst({ where: { id: session.user.id } })
        if (!user)
            throw "User invalid"

        const { files } = await decodeForm(req)
        if (files==undefined || files[0] === undefined)
            throw "No file uploaded"

        const result = await uploadImage(files[0], "profile_pictures")
        if (!result)
            res.status(500).send("Server Error")

        const previousImage=user.image

        await prisma?.user.update({ where: { id: session.user.id }, data: { ...user, image: result } })

        res.status(200).send(user);
        
        if(previousImage!==null)
            await deleteImage(previousImage) 
    } catch (err) {
        res.status(400).send(err);
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
