import { insertRecord, findRecords, deleteRecord, updateRecord } from "./base.js";

// ✅ Create
export const createDivisionService = async (divisionName) => {
    if (!divisionName || divisionName.trim() === "") {
        throw new Error("Division name is required");
    }
    return await insertRecord("mst_division", { division_name: divisionName });
};

// ✅ Get all
export const getAllDivisionService = async () => {
    return await findRecords("mst_division");
};

// ✅ Get by id
export const getDivisionByIdService = async (id) => {
    const result = await findRecords("mst_division", { id });
    return result[0] ?? null;
};

// ✅ Delete
export const deleteDivisionByIdService = async (id) => {
    return await deleteRecord("mst_division", { id });
};

// ✅ Deactivate (set isActive = 0)
export const updateDivisionByIdService = async (id) => {
    return await updateRecord(
        "mst_division",
        { isActive: false },   // fields to update — false → sql.Bit → 0
        { id }                 // condition
    );
};

// import { insertRecord } from "./base.js"
// import { getPool } from "../config/db.js";
// import sql from "mssql/msnodesqlv8.js"

// export const createDivisionService = async (divisionName) => {
//   try {
//     if (!divisionName || divisionName.trim() === "") {
//       throw new Error("Division name is required");
//     }
//     const result = await insertRecord("mst_division", { division_name: divisionName });
//     return result;
//   } catch (error) {
//     console.log("Error in division service", error.message);
//     // throw new Error("Error in division service while inserting vlaue.")
//     throw new Error(error);
//   }
// };

// export const getAllDivisionService = async () => {
//   // console.log("================")
//   const pool = await  getPool();
//   const request  = pool.request();
//   const result = await request.query(`SELECT * from mst_division`)
//   // console.log("=====================" , result)
//   return result;
// };

// export const deleteDivisionByIdService = async(id)=> {
//   const pool = await getPool();
//   const request = await pool.request();
//   const data = await request.input("id",sql.Int, id)
//                         .query(` DELETE FROM mst_division 
//                           OUTPUT DELETED.id , DELETED.division_name
//                           where id=@id`)
//                       console.log( "after delte division ,", data)
//   return data.recordset[0];

// }

// export const updateDivisionByIdService = async (id) => {
//     try {
//         if (!id) throw new Error("Id is required for division updation.");
//         const pool = await getPool();
//         const data = await pool.request()
//             .input("id", sql.Int, id)
//             .query(`UPDATE mst_division SET isActive = 0 WHERE id = @id`)
//             console.log(data)
//         return data;
//     } catch (error) {
//         console.log("Error while updating division", error);
//         throw new Error("Error while updating division.");
//     }
// };

