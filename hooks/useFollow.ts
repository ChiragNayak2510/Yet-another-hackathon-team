import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";
const useFollow = (userId : String) =>{
    const { data: currentUser,mutate: mutateCurrentUser} = useCurrentUser();
    const {mutate:mutateFetchedUser} = useUser(userId as string);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(()=>{
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    },[userId,currentUser?.followingIds])

    const toggleFollow = async ()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }
        try{
            let request;
            if(isFollowing){
                request = () => axios.delete(`/api/follow?userId=${userId}&currentUser=${currentUser.id}`);
            }
            else{
                request = () => axios.post('/api/follow',{data:{userId,currentUser}});
            }
            await request();
            mutateCurrentUser();
            mutateFetchedUser();
            toast.success("Success")
        }catch(error){  
            toast.error('Something went wrong');
        }
    }
    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;