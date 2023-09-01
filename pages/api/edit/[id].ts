import serverAuth from "@/libs/serverAuth";
import {NextApiRequest, NextApiResponse} from "next";
import { useRouter } from "next/router";
export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse
){
    if(req.method !== 'PATCH'){
        return res.status(405).end();
    }
    try{
        const {id} = req.query
        const {name,username,bio,profileImage,coverImage} = req.body;
        if(!name || !username){
            throw new Error('Missing fields');
        }

            const updateduser = await prisma?.user.update({
                where : {
                    id:id as string
                },
                data : {
                    name,
                    username,
                    bio,
                    profileImage,
                    coverImage
                }
            });
            return res.status(200).json({})
        }
        catch(error){
            console.log(error);
            return res.status(400).end()
        }
}       