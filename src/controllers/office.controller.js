import { getAllOfficeService } from "../services/office.js";

export const getAllOffice = async(req,res)=> {
    try {
        const data = await getAllOfficeService();
        console.log("Office controller----------- ")
        return res.status(200).json({success : true,
            message : "Office list fetched successfully.",  
            data : data})
    } catch (error) {
        console.log("Error while getting office list", error);
        return res.status(500).json({success: false, message:error.message})
    }
}