import { addPostInOfficeService, deletePostFromOfficeService, getAllPostForOfficeService } from "../services/office_post.js";


export const getAllPostForOffice = async(req,res)=> {
    try {
        console.log("inside controller",req.params.id )
        const officeId = req.params.id;
        if(!officeId) return res.status(400).json({success: false , message : "Id is required."});
        const data = await getAllPostForOfficeService(officeId);
        return res.status(200).json({succes:true , message : "Office list fetched successfully.", data : data})
    } catch (error) {
        console.log("Errro while fetching post for office", error.message);
        return res.status(500).json({success: false , message : "Something went wrong while fetching post list for office."})
    }
}

export const addPostInOffice = async(req,res)=> {
    try {
        const officeId = req.params.id;
        const {postId} = req.body;
        console.log("postId", postId , "office Id", officeId)
        if(!officeId) return res.status(400).json({success :false, message : "Office Id is required."});
        if(!postId) return res.status(400).json({success :false, message : "Post Id is required."});
        const data = await addPostInOfficeService(officeId,postId);
        return res.status(200).json({success:true , message : "Post added in office successfully."})
    } catch (error) {
  console.log("Error while adding post in office", error.message);

  if (error.status === 409) {
    return res.status(409).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong while adding post in office.",
  });
}
}

export const deletePostFromOffice = async (req, res) => {
    try {
        const { officeId, postId } = req.params;

        if (!officeId || !postId) {
            return res.status(400).json({
                success: false,
                message: "OfficeId and PostId required"
            });
        }

        await deletePostFromOfficeService(officeId, postId);

        return res.status(200).json({
            success: true,
            message: "Post removed from office"
        });

    } catch (error) {
        console.log("Error deleting mapping", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};