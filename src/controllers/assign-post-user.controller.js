import { assignPostToUserService } from "../services/user-post-assign.js";



export const assignPostTouser = async (req, res)=> {
    try {
        const userId = req.params.id;
        if(!userId) return res.status(400).json({success: false, message : "UserId is required"});
        const postId = req.body.postId;
        // console.log("========================= userId",userId)
        // console.log("========================= postId",postId)
        if(!postId) return res.status(400).json({success:false, message : "PostId is required."})
        const data  = await assignPostToUserService(userId, postId);
    return res.status(200).json({success: true, message :"User assign post successfully." })
    } catch (error) {
        // console.log( "assing post to user controller error =======================",error)
        console.log("Error while assigning post to user", error);
        return res.status(500).json({success: false, message : "Error while assigning post to user:-",error})
    }
}