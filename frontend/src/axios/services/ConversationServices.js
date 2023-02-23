import { axiosConversationInstance } from "../axios"


export const getConversations = async (userId) => {
    const {data} = await axiosConversationInstance.get(`/getConvo/${userId}`)
    if(data.status){
        return data;
    }
}