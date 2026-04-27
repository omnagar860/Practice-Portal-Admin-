import sql from "mssql/msnodesqlv8.js";
import { getPool } from "../config/db.js";

export const saveUserPermissionsService = async ({
  userId,
  officeId,
  permissions,
}) => {
  const pool = await getPool();

  await pool
    .request()
    .input("userId", sql.UniqueIdentifier, userId)
    .query(
      `DELETE FROM user_application_permission_mapping WHERE userId=@userId`,
    );

  for (const item of permissions) {
    await pool
      .request()
      .input("userId", sql.UniqueIdentifier, userId)
      .input("officeId", sql.Int, officeId)
      .input("applicationTypeId", sql.Int, item.applicationTypeId)
      .input("permissionCode", sql.VarChar, item.permissionCode).query(`
        INSERT INTO user_application_permission_mapping
        (userId, officeId, applicationTypeId, permissionCode, isActive, createdAt, updatedAt)
        VALUES
        (@userId, @officeId, @applicationTypeId, @permissionCode, 1, GETDATE(), GETDATE())
      `);
  }

  return { success: true };
};

export const getUserPermissionsService = async (userId) => {
  const pool = await getPool();

  const result = await pool
    .request()
    .input("userId", sql.UniqueIdentifier, userId).query(`
      SELECT *
      FROM user_application_permission_mapping
      WHERE userId=@userId AND isActive=1
    `);

  return result.recordset;
};