import {
    createDistrictService,
    getAllDistrictService,
    getDistrictByIdService,
    updateDistrictByIdService,
    deleteDistrictByIdService,
    getDistrictByDivisionIdService
} from "../services/district.js";

// ✅ Create
export const createDistrict = async (req, res) => {
    try {
        const { divisionId, district } = req.body;
        if (!divisionId || !district) {
            return res.status(400).json({ success: false, message: "divisionId and district are required" });
        }
        const result = await createDistrictService(divisionId, district);
        return res.status(201).json({ success: true, message: "District created successfully.", data: result });
    } catch (error) {
        // ✅ Handle duplicate district name
        if (error.message?.includes("UQ_district_name") || error.number === 2627) {
            return res.status(409).json({ success: false, message: "District with this name already exists." });
        }
        console.error("Error creating district:", error);
        return res.status(500).json({ success: false, message: "Error while creating district" });
    }
};

// ✅ Get all
export const getAllDistrict = async (req, res) => {
    try {
        const data = await getAllDistrictService();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching districts:", error);
        return res.status(500).json({ success: false, message: "Error while fetching districts" });
    }
};

// ✅ Get by id
export const getDistrictById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, message: "Id is required" });
        const data = await getDistrictByIdService(id);
        if (!data) return res.status(404).json({ success: false, message: "District not found" });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching district:", error);
        return res.status(500).json({ success: false, message: "Error while fetching district" });
    }
};

export const getDistrictByDivisionId = async(req,res)=> {
    try {
        const  divisionId = req.params.id;
        // console.log("inside controoler divisdion id" , divisionId)
        if(!divisionId) return res.status(400).json({success : false , message : "Division Id is required for getting districts."});
        const data = await getDistrictByDivisionIdService(divisionId);
        console.log("data by controller", data)
        return res.status(200).json({success: true, message : "Fectched districts list by divison successfully", data : data})
    } catch (error) {
        console.log("Error while fetchine district by divisions");
        return res.status(500).json({success: false , message : error.message})
    }
}
// ✅ Deactivate
export const updateDistrictById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, message: "Id is required" });
        await updateDistrictByIdService(id);
        return res.status(200).json({ success: true, message: "District deactivated successfully." });
    } catch (error) {
        console.error("Error updating district:", error);
        return res.status(500).json({ success: false, message: "Error while updating district" });
    }
};

// ✅ Delete
export const deleteDistrictById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, message: "Id is required" });
        await deleteDistrictByIdService(id);
        return res.status(200).json({ success: true, message: "District deleted successfully." });
    } catch (error) {
        console.error("Error deleting district:", error);
        return res.status(500).json({ success: false, message: "Error while deleting district" });
    }
};



// export const createDistrict = async(req, res)=> {
//     try {
//         const data = req.body;
        
//     } catch (error) {
//         console.log("Error while creating new district.", error);
//         return res.status(500).json({success : false, message : error.message})    
//     }
// }