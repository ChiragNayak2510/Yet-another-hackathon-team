import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import {formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart,AiFillHeart} from "react-icons/ai";

interface PostItemProps{
    data: Record<string,any>;
    userId?: string
}

const PostItem:React.FC<PostItemProps> = ({userId,data
}) =>{
    const router = useRouter();
    const loginModal= useLoginModal();
    const [liked,setLiked] = useState(false)
    const{data:currentUser} = useCurrentUser();
    const goToUser = (event:any)=>{
        event.stopPropagation()
        router.push(`/users/${data.user.id}`);
    }


    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt])
    return(
        
        <div 
        className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
        " 
        >
            <div className="flex flex-row items-start gap-3>" 
            >
                <Avatar userId={data.user.id}/>
                <div>
                   <div className="flex flex-row items-center gap-2">
                    <p 
                    onClick={goToUser}
                    className="
                    text-white
                    font-semibold
                    cursor-pointer
                    hover:underline
                    ml-2">{data.user.name}</p>
                    <span
                    onClick={goToUser} className="
                    text-neutral-500
                    cursor-pointer
                    hover:underline
                    hidden
                    md:block"
                    >@{data.user.username}</span>
                    <span className="text-neutral-500 text sm">
                        {createdAt} ago
                    </span>
                   </div>
                   <div className="text-white mt-1 ml-2">
                    {data.body}
                   </div>
                   
                    <div className="
                   flex 
                   flex-row
                   items-center
                   text-neutral-500
                   cursor-pointer
                   transition
                   hover:text-sky-500
                   ml-2
                   "
                   onClick={()=>{setLiked(!liked)}}
                   >
                    {
                        !liked&&<AiOutlineHeart size={20}/>
                    }
                    {
                        liked&&<AiFillHeart size={20} color="red"/>
                    }
                   </div>
                   
                </div>
            </div>
        </div>
    )
    }
    
export default PostItem;