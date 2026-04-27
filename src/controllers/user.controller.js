import {
  createUserService,
  deleteteUserService,
  getAllUsersService,
  getSingleUserDataService,
  loginService,
  updateUserService,
} from "../services/user.js";

export const createUser = async (req, res) => {
  try {
    // console.log("Incoming data:", req.body);

    const result = await createUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log("Create User Error:", error.message);

    if (error.status === 409) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // optional: email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // const user = await loginService({ email, password }, req.pool);
    const user = await loginService({ email, password });

    res.cookie(
      "user",
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    );

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message || "Server error",
    });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

export const getSingleUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "User Id is required." });
    const data = await getSingleUserDataService(userId);
    return res
      .status(200)
      .json({
        success: true,
        message: "User details found successfully.",
        data: data,
      });
  } catch (error) {
    console.log("Controller Error: Error while fetching user details", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error while fetching user datails",
        error: error,
      });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "UserId is required." });
    // const {} = req.body;
    const data = await updateUserService(userId, req.body);
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully." });
  } catch (error) {
    console.log("Controller Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error while updating user details",
        error,
        error: error,
      });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required.",
      });
    }

    await deleteteUserService(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log("Controller Error:", error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};