import sql from "mssql/msnodesqlv8.js";
import bcrypt from "bcrypt";
import { getPool } from "../config/db.js";
import { deleteRecord } from "./base.js";

export async function loginService(data) {
  const { email, password } = data;

  const pool = await getPool();

  const result = await pool.request().input("email", sql.VarChar, email).query(`
      SELECT id,first_name , email, role, password_hash
      FROM users
      WHERE email = @email
    `);

  const user = result.recordset[0];

  if (!user) {
    throw {
      message: "Incorrect email, password.",
      statusCode: 404,
    };
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw {
      message: "Incorrect password",
      statusCode: 401,
    };
  }

  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    role: user.role,
  };
}

export const createUserService = async (userData) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      dateOfBirth,
      state,
      district,
      house_number,
      address,
      landmark,
      pincode,
    } = userData;

    const pool = await getPool();

    // Check duplicate email or mobile
    const existingUser = await pool
      .request()
      .input("email", sql.NVarChar, email.toLowerCase())
      .input("mobile", sql.NVarChar, mobile).query(`
        SELECT id
        FROM users
        WHERE email = @email
           OR mobile_number = @mobile
      `);

    if (existingUser.recordset.length > 0) {
      throw {
        status: 409,
        message: "Email or mobile number already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input("first_name", sql.NVarChar, firstName)
      .input("last_name", sql.NVarChar, lastName)
      .input("email", sql.NVarChar, email.toLowerCase())
      .input("password_hash", sql.NVarChar, hashedPassword)
      .input("mobile_number", sql.NVarChar, mobile)
      .input("date_of_birth", sql.Date, dateOfBirth)
      .input("state", sql.NVarChar, state)
      .input("district", sql.NVarChar, district)
      .input("house_number", sql.NVarChar, house_number)
      .input("street", sql.NVarChar, address)
      .input("landmark", sql.NVarChar, landmark || null)
      .input("pincode", sql.NVarChar, pincode).query(`
        INSERT INTO users (
          first_name,
          last_name,
          email,
          password_hash,
          mobile_number,
          date_of_birth,
          state,
          district,
          house_number,
          street,
          landmark,
          pincode
        )
        OUTPUT INSERTED.id, INSERTED.first_name, INSERTED.email
        VALUES (
          @first_name,
          @last_name,
          @email,
          @password_hash,
          @mobile_number,
          @date_of_birth,
          @state,
          @district,
          @house_number,
          @street,
          @landmark,
          @pincode
        )
      `);

    return result.recordset[0];
  } catch (error) {
    console.log("Service Error:", error.message);

    if (error.status === 409) {
      throw error;
    }

    throw new Error("Error while creating user");
  }
};

export const getAllUsersService = async () => {
  const pool = await getPool();
  const role = "department";

  const result = await pool.request().query(`
    SELECT id , first_name, last_name, email, district, mobile_number
    FROM users
    ORDER BY created_at DESC
  `);

  return result.recordset;
};

export const getSingleUserDataService = async (userId) => {
  try {
    if (!userId) throw new Error("User Id  is required.");
    const pool = await getPool();
    const request = await pool.request();
    const data = await request.input("userId", sql.UniqueIdentifier, userId)
      .query(`SELECT 
      first_name,
      last_name,
      email,
      mobile_number,
      date_of_birth,
      state,
      district,
      house_number,
      street,
      landmark,
      pincode 
      FROM users 
      WHERE id=@userId`);
    console.log("user data found", data.recordset[0]);
    return data.recordset[0];
  } catch (error) {
    console.log("Service Error while fetching user details", error);
    throw new Error("Error while fetching user details");
  }
};
export const updateUserService = async (userId, userData) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      dateOfBirth,
      state,
      district,
      house_number,
      address,
      street,
      landmark,
      pincode,
    } = userData;

    const pool = await getPool();

    let query = `
      UPDATE users SET
        first_name = @first_name,
        last_name = @last_name,
        email = @email,
        mobile_number = @mobile_number,
        date_of_birth = @date_of_birth,
        state = @state,
        district = @district,
        house_number = @house_number,
        street = @street,
        landmark = @landmark,
        pincode = @pincode
    `;

    const request = pool
      .request()
      .input("userId", sql.UniqueIdentifier, userId)
      .input("first_name", sql.NVarChar, firstName)
      .input("last_name", sql.NVarChar, lastName)
      .input("email", sql.NVarChar, email.toLowerCase())
      .input("mobile_number", sql.NVarChar, mobile)
      .input("date_of_birth", sql.Date, dateOfBirth)
      .input("state", sql.NVarChar, state)
      .input("district", sql.NVarChar, district)
      .input("house_number", sql.NVarChar, house_number)
      .input("street", sql.NVarChar, street)
      .input("landmark", sql.NVarChar, landmark || null)
      .input("pincode", sql.NVarChar, pincode);

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password_hash = @password_hash`;
      request.input("password_hash", sql.NVarChar, hashedPassword);
    }

    query += ` WHERE id = @userId`;

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      throw new Error("User not found");
    }
    // console.log(result)
    return result;
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};
export const deleteteUserService = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User Id is required.");
    }

    const pool = await getPool();

    // Check user exists
    const existingUser = await pool
      .request()
      .input("userId", sql.UniqueIdentifier, userId).query(`
        SELECT id 
        FROM users 
        WHERE id = @userId
      `);

    console.log("existingUser", existingUser.recordset);

    if (existingUser.recordset.length === 0) {
      throw new Error("User does not exist with this User Id");
    }

    // Delete related mapping records first
    await pool.request().input("userId", sql.UniqueIdentifier, userId).query(`
        DELETE FROM user_post_mapping 
        WHERE userId = @userId
      `);

    // Delete user
    return await deleteRecord("users", { id: userId });
  } catch (error) {
    console.log("Service Error :", error);
    throw error; // important change
  }
};