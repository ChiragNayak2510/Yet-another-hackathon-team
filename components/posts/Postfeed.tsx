import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { useState } from "react";

interface PostfeedProps {
    userId?: string;

}

const Postfeed: React.FC<PostfeedProps> = ({ userId }) => {
    const { data: posts } = usePosts(userId as string);
    const [liked,setLiked] = useState(false);
    return (
        <>
            {posts?.posts?.map((post: Record<string, any>) => (
                <div onClick={()=>{setLiked(true)}}>
                <PostItem key={post.id} data={post} userId={userId}/>
                </div>
            ))}
        </>
    );
};

export default Postfeed;
