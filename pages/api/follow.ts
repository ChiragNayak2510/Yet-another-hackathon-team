import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse
){
    if(req.method!=="POST" && req.method!=='DELETE'){
        return res.status(405).end();
    }

    try{

        
        if(req.method==='POST'){
            const {userId,currentUser} = req.body.data;
        
        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID");
        }

        const user = await prisma?.user.findUnique({
            where : {
                id:userId
            }
        })
        if(!user){
            throw new Error("Invalid ID")
        }

        let updatedFollowingIds = [...(user.followingIds || [])];
            updatedFollowingIds.push(userId)
        
            const updatedUser = await prisma?.user.update({
                where : {
                    id : currentUser.id
                },
                data : {
                    followingIds : updatedFollowingIds
                }
            });
            return res.status(200).json(updatedUser)
        }

        if(req.method==='DELETE'){
            const userId = req.query.userId;
            const currentUser = req.query.currentUser as string;
            console.log(currentUser)
        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID");
        }

        const user = await prisma?.user.findUnique({
            where : {
                id:userId
            }
        })
        if(!user){
            throw new Error("Invalid ID")
        }

        let updatedFollowingIds = [...(user.followingIds || [])];
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId)
            const updatedUser = await prisma?.user.update({
                where : {
                    id : currentUser
                },
                data : {
                    followingIds : updatedFollowingIds
                }
            });
            return res.status(200).json(updatedUser)
        }
        
        
    }
    catch(Error){
        console.log(Error)
        return res.status(400).end()
    }
}