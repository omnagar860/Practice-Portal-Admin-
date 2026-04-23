import { assignPostToUserService, getUsersAllPostService } from "../services/user-post-assign.js";



export const assignPostTouser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const postId = req.body.postId;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "PostId is required.",
      });
    }

    await assignPostToUserService(userId, postId);

    return res.status(200).json({
      success: true,
      message: "User post assigned successfully.",
    });

  } catch (error) {
    console.log("Error while assigning post to user", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


export const getUsersAllPost = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required.",
      });
    }

    const data = await getUsersAllPostService(userId);

    return res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      data,
    });

  } catch (error) {
    console.log("Error fetching user posts:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};