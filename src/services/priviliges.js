// services/privileges.service.js
import { getPool } from "../config/db.js";

export const savePrivilegesService = async (officeId, postId, privileges) => {
  try {
    const pool = await getPool();

    // delete old mapping first
    await pool.request().input("officeId", officeId).input("postId", postId)
      .query(`
        DELETE FROM office_post_application_permission_mapping
        WHERE officeId = @officeId
        AND postId = @postId
      `);

    for (const item of privileges) {
      const permissionResult = await pool
        .request()
        .input("permissionCode", item.permissionCode).query(`
          SELECT id
          FROM mst_permission
          WHERE permissionCode = @permissionCode
        `);

      const permissionId = permissionResult.recordset[0]?.id;

      if (!permissionId) continue;

      await pool
        .request()
        .input("officeId", officeId)
        .input("postId", postId)
        .input("applicationTypeId", item.applicationTypeId)
        .input("permissionId", permissionId).query(`
          INSERT INTO office_post_application_permission_mapping
          (
            officeId,
            postId,
            applicationTypeId,
            permissionId
          )
          VALUES
          (
            @officeId,
            @postId,
            @applicationTypeId,
            @permissionId
          )
        `);
    }

    return true;
  } catch (error) {
    console.log("Service Error:", error);
    throw error;
  }
};

export const getPrivilegesByOfficePostService = async (officeId, postId) => {
  try {
    const pool = await getPool();

    const result = await pool
      .request()
      .input("officeId", officeId)
      .input("postId", postId).query(`
          SELECT
              m.applicationTypeId,
              p.permissionCode
          FROM office_post_application_permission_mapping m
          INNER JOIN mst_permission p
              ON m.permissionId = p.id
          WHERE m.officeId = @officeId
          AND m.postId = @postId
          AND m.isActive = 1
        `);

    return result.recordset;
  } catch (error) {
    console.log("Service Error:", error);
    throw error;
  }
};
