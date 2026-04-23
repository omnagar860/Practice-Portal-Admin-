import sql from "mssql/msnodesqlv8.js";
import { getPool } from "../config/db.js";
import { insertRecord } from "./base.js";

export const assignPostToUserService = async (userId, postId) => {
  try {
    if (!userId || !postId) {
      throw {
        statusCode: 400,
        message: "UserId and PostId are required.",
      };
    }

    const pool = await getPool();

    // check if user already has a post
    const existing = await pool
      .request()
      .input("userId", sql.UniqueIdentifier, userId).query(`
        SELECT * 
        FROM user_post_mapping
        WHERE userId = @userId
      `);

    if (existing.recordset.length > 0) {
      // update old post with new one
      await pool
        .request()
        .input("userId", sql.UniqueIdentifier, userId)
        .input("postId", sql.Int, postId).query(`
          UPDATE user_post_mapping
          SET postId = @postId,
            createdAt = GETDATE()
          WHERE userId = @userId
        `);

      return {
        success: true,
        message: "User post updated successfully",
      };
    }

    // insert new if no existing post
    await pool
      .request()
      .input("userId", sql.UniqueIdentifier, userId)
      .input("postId", sql.Int, postId).query(`
        INSERT INTO user_post_mapping
        (userId, postId, createdAt, updatedAt, isActive)
        VALUES
        (@userId, @postId, GETDATE(), GETDATE(), 1)
      `);

    return {
      success: true,
      message: "Post assigned successfully",
    };
  } catch (error) {
    throw error;
  }
};


export const getUsersAllPostService = async (userId) => {
  try {
    if (!userId) {
      throw new Error("UserId is required.");
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("userId", sql.UniqueIdentifier, userId)
      .query(`
        SELECT 
            upm.id,
            upm.userId,
            upm.postId,
            p.postName,
            upm.isActive,
            upm.createdAt
        FROM user_post_mapping upm
        INNER JOIN mst_post p
            ON upm.postId = p.id
        WHERE upm.userId = @userId
      `);

    return result.recordset;

  } catch (error) {
    throw error;
  }
};