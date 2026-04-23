import { createPostService, getAllPostService, getDeletePostService, getPostByOfficeIdService, updatePostService } from "../services/post.js";



export const createPost = async(req,res)=> {
    try {
        const postData = req.body;
        console.log("data for post from controller",  postData)
        if(!postData) return "Enter post name.";
        const data = await createPostService(postData)
        console.log("response from controller after creating post", data)
        return res.status(200).json({success : true, message : "Post created successfully."})
    } catch (error) {
        console.log("Error while creating a post", error);
        return res.status(500).json({success : false, message : error.message})
    }
}

export const getAllPost = async(req,res)=> {
    try {
        const data = await getAllPostService();
        return res.status(200).json({success : true, message : "Post fetched successfully.", data :data})
    } catch (error) {
        console.log("Error while getting post", error);
        return res.status(500).json({success : false, message : error.message})
    }
}
export const updatePost = async(req,res)=> {
    try {
       const id = req.params.id;
       if(!id) return res.status(400).json({success : false, message : "Id is required."})
        const data = await updatePostService(Number(id))
        return res.status(200).json({success : true, message : "Post updated successfully."})
    } catch (error) {
        console.log("Error while updating post", error);
        return res.status(500).json({success : false, message : error.message})
    }
}
export const deletePost = async(req,res)=> {
    try {
        const postId = req.params.id;
        console.log("Id in controller", postId)
        if(!postId) return res.status(400).json({success : false, message : "Id is required."})
        const data = await getDeletePostService(postId);
        return res.status(200).json({success : true, message : "Post deleted successfully."})
    } catch (error) {
        console.log("Error while deleting post", error);
        return res.status(500).json({success : false, message : error.message})
    }
}

export const getPostByOfficeId = async (req,res)=> {
    try{
        const officeId = req.params.id;
        if(!officeId) return res.status(400).json({success: false , message : "Office Id is required."});
        const data = await getPostByOfficeIdService(officeId);
        return res.status(200).json({success:true, data : data , message : "Post data fetched successfully."})
    } catch {
        console.log("Controller Error", error) 
        return res.status(500).json({success: false, message : "Error while getting post data." , error})
    }
}
