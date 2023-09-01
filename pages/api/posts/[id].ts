import serverAuth from "@/libs/serverAuth";
import { NextApiRequest,NextApiResponse } from "next";
import prisma from "@/libs/prismadb"
import { type } from "os";

export default async function handler(
    req: NextApiRequest,
    res : NextApiResponse
){
    if(req.method !== 'POST' && req.method !=='GET'){
        return res.status(405).end();
    } 
    try{
        if(req.method==="POST"){
            // const{currentUser}  = await serverAuth(req);
            const {body} = req.body;
            const{id} = req.query;
            const newPost = await prisma.post.create({
                data: {
                  body,
                  userId: id as string,
                },
              });
            return res.status(200).json({post:newPost})
        }

        if(req.method === 'GET'){
            const { userId} = req.query;
            let posts;
            if(userId && userId!=='null' && typeof userId ==='string'){
                posts = await prisma.post.findMany({
                    where : {
                        userId
                    },
                    include : {
                        user : true,
                        comments : true
                    },
                    orderBy : {
                        createdAt : 'desc'
                    }
                });
                return res.status(200).json(posts)
            }
            else{
                posts = await prisma.post.findMany({
                    include : {
                        user : true,
                        comments : true
                    },
                    orderBy : {
                        createdAt : 'desc'
                    }
                });
                let post = {
                    posts : posts
                }
                return res.status(200).json(post)
                }
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).end()
    }
}
