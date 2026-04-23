import { getPool } from "../config/db.js";
import { deleteRecord, findRecords, insertRecord, updateRecord } from "./base.js";

export const createNewApplicationService = async (applicationName,applicationCategory) => {
  try {
    const trimmedApplicationName = applicationName.trim();
    const trimmedapplicationCategory = applicationCategory.trim();
    const existing = await findRecords("mst_aplicationType", {
      applicationName: trimmedApplicationName,
    });

    if (existing.length > 0) {
      throw new Error("Application already exists");
    }
    const result = await insertRecord("mst_aplicationType", {
      applicationName: trimmedApplicationName,
      applicationCategory: trimmedapplicationCategory,
    });

    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw error;
  }
};

export const getAllApplicationService = async()=> {
try {
        const pool = await getPool();
        const result = await pool
          .request()
          .query(
            `SELECT id, applicationName ,	applicationCategory, isActive FROM mst_aplicationType ORDER BY id DESC`,
          );
        return result.recordset ;
} catch (error) {
     console.error("Service Error:", error);
     throw error;
}

}

export const deleteApplicationService = async(applicationId)=> {
    try {
        if(!applicationId) throw new Error("Application id is required");
        // const result = await deleteRecord("mst_applicationType", {id :applicationId});
         const result = await deleteRecord("mst_aplicationType", {
           id: applicationId,
         });
        return result
    } catch (error) {
        console.log("Service Error ", error);
        throw error;
    }
}

export const updateApplicationService = async( applicationId, isActive)=> {
    try {
        if(!applicationId) throw new Error("Application id is required");
        const result = await updateRecord(
          "mst_aplicationType",
          { isActive : !isActive },
          { id: applicationId },
        );
        return result
    } catch (error) {
        console.log("Service Error ", error);
        throw error
    }
}
