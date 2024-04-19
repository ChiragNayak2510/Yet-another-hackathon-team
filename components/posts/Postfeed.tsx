import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { useState } from "react";

interface PostfeedProps {
    userId?: string;

}

const Postfeed: React.FC<PostfeedProps> = ({ userId }) => {
    const { data: posts } = usePosts(userId as string);
    return (
        <>
            {posts?.posts?.map((post: Record<string, any>) => (
                <PostItem key={post.id} data={post} userId={userId}/>
            ))}
        </>
    );
};

export default Postfeed;
