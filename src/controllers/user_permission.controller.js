import { getUserPermissionsService, saveUserPermissionsService } from "../services/user_permission.service.js";


export const saveUserPermissions = async (req, res) => {
  try {
    const result = await saveUserPermissionsService(req.body);

    return res.status(200).json({
      success: true,
      message: "Permissions saved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserPermissions = async (req, res) => {
  try {
    const data = await getUserPermissionsService(req.params.id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
