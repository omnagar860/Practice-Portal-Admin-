import { insertRecord } from "./base.js";


export const assignPostToUserService = async(userId, postId)=> {
    try {
        if(!userId && !postId) throw new Error("UserId and PostId is required.");
        const result = await insertRecord("user_post_mapping", {userId :userId, postId:postId});
        // console.log('result from assign post to user service========================', result)
        return result;
    } catch (error) {
    console.log("DB Error:", error);

    // unique key violation
    if (error.number === 2627) {
      throw {
        statusCode: 409,
        message: "This user already has a post assigned."
      };
    }

    // foreign key violation
    if (error.number === 547) {
      throw {
        statusCode: 400,
        message: "Invalid user or post selected."
      };
    }

    throw {
      statusCode: 500,
      message: "Something went wrong while assigning post."
    };
  }
}