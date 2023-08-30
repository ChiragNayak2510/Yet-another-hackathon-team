import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser"
import axios from "axios";
import { useEffect,useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";

const EditModal = ()=>{
    const{data: currentUser} = useCurrentUser();
    const { mutate : mutateFetchedUser} = useUser(currentUser?.id)
    const editModal = useEditModal();

    const [profileImage,setProfileImage] = useState('');
    const [coverImage,setCoverImage] = useState('');
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [bio,setBio] = useState('');

   
  useEffect(() => {
    setProfileImage(currentUser?.profileImage || ''); // Provide a default empty string
    setCoverImage(currentUser?.setCoverImage || ''); // Provide a default empty string
    setName(currentUser?.name || ''); // Provide a default empty string
    setUsername(currentUser?.username || ''); // Provide a default empty string
    setBio(currentUser?.bio || ''); // Provide a default empty string
  }, [currentUser]);


    const [isLoading,setIsLoading] = useState(false);

    const onSubmit = async()=>{
        try{
            setIsLoading(true);
            await axios.patch(`/api/edit/${currentUser.id}`,{
                name,
                username,       
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();
            toast.success('Updated');
            editModal.onClose    
        }
        catch(error){
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder = "Name"
            onChange = {(e) => setName(e.target.value)}
            value = {name}
            disabled = {isLoading}/>

            <Input placeholder = "Username"
            onChange = {(e)=> setUsername(e.target.value)}
            value = {username}
            disabled = {isLoading}/>

            <Input placeholder = "Bio"
            onChange = {(e)=> setBio(e.target.value)}
            value = {bio}
            disabled = {isLoading}/>
        </div>
    )
    return (
        <Modal 
        disabled = {isLoading}
        isOpen = {editModal.isOpen}
        title =  "Edit your profile"
        actionLabel = "Save"
        onClose = {editModal.onClose}
        onSubmit = {onSubmit}
        body = {bodyContent}
        />
    );
}

export default EditModal;