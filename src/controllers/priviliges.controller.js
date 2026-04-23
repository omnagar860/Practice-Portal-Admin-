import { getPrivilegesByOfficePostService, savePrivilegesService } from "../services/priviliges.js";


export const savePrivileges = async (req, res) => {
  try {
    const { officeId, postId, privileges } = req.body;

    if (!officeId || !postId) {
      return res.status(400).json({
        success: false,
        message: "Office and Post are required",
      });
    }

    await savePrivilegesService(officeId, postId, privileges);

    return res.status(201).json({
      success: true,
      message: "Privileges saved successfully",
    });
  } catch (error) {
    console.log("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Error while saving privileges",
    });
  }
};

export const getPrivilegesByOfficePost = async (req, res) => {
  try {
    const { officeId, postId } = req.params;

    const data = await getPrivilegesByOfficePostService(officeId, postId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error while fetching privileges",
    });
  }
};
