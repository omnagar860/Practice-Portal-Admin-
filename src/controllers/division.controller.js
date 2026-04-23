import { createDivisionService, deleteDivisionByIdService, getAllDivisionService, updateDivisionByIdService } from "../services/division.js";

export const createDivision = async (req, res) => {
  try {
    // console.log('===== controller')
    const { division } = req.body;
    console.log(division)
    await createDivisionService(division);
    return res
      .status(201)
      .json({ success: true, message: "Division created successfully." });
  } catch (error) {
    console.log("Create division error:", error);

    // duplicate key error
    if (error.number === 2627 || error.number === 2601) {
      return res.status(409).json({
        success: false,
        message: "Division already exists. Please enter another division name.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating division",
    });
  }
};

export const getAllDivision = async (req, res) => {
  try {
    // console.log("============ controller")
    const data = await getAllDivisionService();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Error while fetching division data", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDivisionById = async(req,res)=> {
  let id = req.params.id;
  const data = await deleteDivisionByIdService(id)
  console.log(data)
  return res.status(200).json({success: true, message : "Division deleted successfully", data: data})
}
export const updateDivisionById = async (req, res) => {
    try {
        const id = req.params.id;
        const {isActive} = req.body
        if (!id) return res.status(400).json({ success: false, message: "Id is required" });
        await updateDivisionByIdService(id,isActive);  // ✅ only pass id
        return res.status(200).json({ success: true, message: `Division ${isActive ? "activated" : "deactivated"} successfully.` });
    } catch (error) {
        console.log("Error while updating division", error);
        return res.status(500).json({ success: false, message: "Error while updating division" });
    }
};

