import { getPool, sql } from "../config/db.js";
import { deleteRecord, findRecords, insertRecord, updateRecord, } from "./base.js";

export const createPostService = async (postData)=> {
    try {
        if(!postData) throw new Error("Enter data to create a new post.");
        const data =  await insertRecord("mst_post", postData);
        console.log("data in service ==========", data)
    }  catch (error) {
    console.log("DB Error:", error);

    // duplicate key error
    if (error.number === 2627) {
      throw {
        statusCode: 409,
        message: "This post already exists. Please add another post."
      };
    }

    throw {
      statusCode: 500,
      message: "Something went wrong while creating post."
    };
  }
};
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

export const getPostByOfficeIdService = async (officeId)=> {
    try {
        if(!officeId) throw new Error("Office Id is required");
        const pool = await getPool()
        const result = await pool
                            .request()
                            .input("officeId",sql.Int, officeId)
                            .query(
                            `SELECT p.postName as postName, opm.officeId as officeId , opm.postId as postId 
                            FROM office_post_mapping opm 
                            inner join mst_office o 
                            on opm.officeId=o.id 
                            inner join mst_post p 
                            on opm.postId =  p.id
                            where officeId = @officeId
                            `);
        return result.recordset
    } catch (error) {
        
    }
}
