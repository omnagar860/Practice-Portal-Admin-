import { getPool } from "../config/db.js";
import sql from "mssql/msnodesqlv8.js";
import { insertRecord } from "./base.js";

export const getAllPostForOfficeService = async (officeId) => {
  try {
    if (!officeId) throw new Error("Office id is required");
    const pool = await getPool();
    const request = await pool.request();
    const result = await request.input("officeId", sql.Int, officeId) .query(`
            SELECT 
                p.id as postId, 
                p.postName, 
                o.officeName  
            FROM office_post_mapping m
            INNER JOIN mst_post p ON m.postId = p.id
            INNER JOIN mst_office o ON m.officeId = o.id  
            WHERE m.officeId = @officeId 
        `);

    return result;
  } catch (error) {
    console.log("Error while getting post list", error.message);
    throw new Error("Error while getting post list.");
  }
};


export const addPostInOfficeService = async(officeId,postId)=> {
    try {
        if(!officeId) throw new Error("Office Id is required.");
        if(!postId) throw new Error("Post Id is required.");
        const pool = await getPool();
        const result = await pool.request()
                                 .input("officeId", sql.Int, officeId)
                                 .input("postId", sql.Int,  postId)
                                 .query(`INSERT INTO office_post_mapping (officeId ,postId) values
                                    (@officeId, @postId)
                                    `);
            return result;
    }  catch (error) {
  console.log("Error while adding post in office", error.message);

  if (error.number === 2627) {
    const err = new Error("This post is already assigned to this office.");
    err.status = 409;
    throw err;
  }

  throw error; // ✅ IMPORTANT (don’t replace with new Error)
}
};

export const deletePostFromOfficeService = async (officeId, postId) => {
    const pool = await getPool();

    await pool.request()
        .input("officeId", sql.Int, officeId)
        .input("postId", sql.Int, postId)
        .query(`
            DELETE FROM office_post_mapping
            WHERE officeId = @officeId AND postId = @postId
        `);
};