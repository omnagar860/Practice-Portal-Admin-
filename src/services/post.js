import { deleteRecord, findRecords, insertRecord, updateRecord, } from "./base.js";

export const createPostService = async (postData)=> {
    try {
        if(!postData) throw new Error("Enter data to create a new post.");
        const data =  await insertRecord("mst_post", postData);
        console.log("data in service ==========", data)
    } catch (error) {
        throw new Error(`Error while creating a new post ${error}`)
    }
}
export const getAllPostService = async ()=> {
    try {
        const data =  await findRecords("mst_post");
        return data
    } catch (error) {
        throw new Error(`Error while creating a new post ${error}`)
    }
}
export const updatePostService = async (id)=> {
    try {
        if(!id) throw new Error("Id is required.");
        return await updateRecord("mst_post", {isActive : false}, {id})
    } catch (error) {
        throw new Error(`Error while updating a new post ${error}`)
    }
}
export const getDeletePostService = async (postId)=> {
    try {
        console.log("id in service", postId)
        if(!postId) throw new Error("Id is required.");
        return await deleteRecord("mst_post", {id : postId})
    } catch (error) {
        throw new Error(`Error while deleting post ${error}`)
    }
}
