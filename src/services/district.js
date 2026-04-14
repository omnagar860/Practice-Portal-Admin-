import { getPool } from "../config/db.js";
import { insertRecord, findRecords, deleteRecord, updateRecord } from "./base.js";

// ✅ Create district
export const createDistrictService = async (divisionId, districtName) => {
    if (!divisionId) throw new Error("Division is required");
    if (!districtName || districtName.trim() === "") throw new Error("District name is required");

    return await insertRecord("mst_district", {
        divisionId,
        district: districtName.trim()
    });
};

// ✅ Get all districts
export const getAllDistrictService = async () => {
    // return await findRecords("mst_district");
      const pool = await getPool();
      const result = await pool.request().query(`SELECT dis.id, dis.district,div.division_name, dis.isActive  from mst_district as dis inner join mst_division as div on dis.divisionId= div.id order by div.division_name , dis.district`)
      console.log(result) 
      return result.recordset
    };

// ✅ Get district by id
export const getDistrictByIdService = async (id) => {
    const result = await findRecords("mst_district", { id });
    return result[0] ?? null;
};

export const getDistrictByDivisionIdService = async (divisionId)=> {
    try {
        if(!divisionId) return "Division Id is required";
        const data = await findRecords("mst_district", {divisionId});
        // console.log("data in service", data)
        return data;
    } catch (error) {
        throw new Error("Error while fecthing districts")
    }
}

// ✅ Deactivate district (set isActive = 0)
export const updateDistrictByIdService = async (id) => {
    if (!id) throw new Error("Id is required");
    return await updateRecord(
        "mst_district",
        { isActive: false },
        { id }
    );
};

// ✅ Delete district
export const deleteDistrictByIdService = async (id) => {
    if (!id) throw new Error("Id is required");
    return await deleteRecord("mst_district", { id });
};