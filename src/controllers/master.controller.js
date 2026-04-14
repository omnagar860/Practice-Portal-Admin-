import sql from "mssql/msnodesqlv8.js";
import { connectDB } from "../config/db.js";


export const getMasterCityData = async ()=> {
    const pool = await connectDB();
    const result = await pool.request().query(`
        SEELCT *  FROM mst_division where isActive=1
        `);
        console.log(result)
    
}
export const getMasterDivisionData = async ()=> {

}