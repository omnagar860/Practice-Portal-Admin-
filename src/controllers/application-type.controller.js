import { createNewApplicationService, deleteApplicationService, getAllApplicationService, updateApplicationService } from "../services/application-type.js";

export const createNewApplication = async (req, res) => {
  try {
    const { applicationName, applicationCategory } = req.body;
    if (!applicationName.trim())
      return res
        .status(400)
        .json({ success: false, message: "Application name is required." });
    if (!applicationCategory.trim())
      return res
        .status(400)
        .json({ success: false, message: "Application type is required." });

    const data = await createNewApplicationService(
      applicationName,
      applicationCategory,
    );
    return res.status(201).json({
      success: true,
      message: "Application created successfully",
    });
  } catch (error) {
    console.error("Create application error:", error);
      return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAllApplication = async(req,res)=> {
  try {
    const data = await getAllApplicationService()
    console.log(data);
    return res.status(200).json({success : true,message: "Application types fetched successfully.", data : data})
    
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({success: false , message : "Error while getting application types."})
  }
}

export const updateApplication =async (req,res)=> {
  try {
     const applicationId = req.params.id;
     const { isActive } = req.body;
    //  console.log("---------------applicationId", applicationId);
     if (!applicationId) return res.status(400).json({ success: false, message: "ApplicationId is required." });
     const data = await updateApplicationService(applicationId,isActive); 
     return res.status(200).json({ success: true, message: `Application ${isActive ? "updated" : "deactivated"} successfully.`});
  } catch (error) {
    console.log("Controller Error" , error);
    return res.status(500).json({success : false, message: error.message || "Error while updating application"})
  }
}
export const deleteApplication = async (req,res) => {
  try {
    const applicationId = req.params.id;
    if(!applicationId) return res.status(400).json({success: false , message : "Application number is required."});
    const data = await deleteApplicationService(applicationId);
    return res.status(200).json({success:true, message : "Application deleted successfully."});
  } catch (error) {
    console.log("Controller Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Error while deleting application" });
  }
};
