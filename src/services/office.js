import { findRecords } from "./base.js"


export const  getAllOfficeService  = async()=> {
    try {
        const data = await findRecords("mst_office");
        console.log("--------------------- office data")
        return data
    } catch (error) {
        throw new Error("Error while fetching office data.")
    }
} 