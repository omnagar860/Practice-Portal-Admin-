import { creatOfficeService, deleteOfficeService, getAllOfficeService, updateOfficeService } from "../services/office.js";

export const getAllOffice = async(req,res)=> {
    try {
        const data = await getAllOfficeService();
        // console.log("Office controller----------- ")
        return res.status(200).json({success : true,
            message : "Office list fetched successfully.",  
            data : data})
    } catch (error) {
        console.log("Error while getting office list", error);
        return res.status(500).json({success: false, message:error.message})
    }
}

export const createOffice = async (req, res) => {
    try {
        const officeData = req.body;
        console.log("office data in controller", req.body)

        const data = await creatOfficeService(officeData);

        return res.status(200).json({
            success: true,
            message: "Office created successfully",
            data
        });

    } catch (error) {
        console.log("Error while creating a new office", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateOffice = async (req,res)=> {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({success: false, message:"Id is required"});
        // console.log("inside controller", id)
        const data = await updateOfficeService(id);
        // console.log("office updatide data",  data)
        return res.status(200).json({success: true, message :"Office updated successfully."})
    } catch (error) {
        console.log("Error while editing office ", error);
        return res.status(500).json({success: false, message:error.message})
    }
}

export const deleteOffice = async (req,res)=> {
    try {
        const id = req.params.id;
        if(!id) return res.status(400).json({success : false, message : "Id is required for deleting office."});
        const data = await deleteOfficeService(id);
        return res.status(200).json({success :true, message : "Office deleted successfully"})
    } catch (error) {
        console.log("Error while deleting office", error.message);
        return res.status(500).json({success : false, message : "Could not delete office."})
    
    }
}