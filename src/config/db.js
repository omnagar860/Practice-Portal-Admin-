import sql from "mssql/msnodesqlv8.js";

const config = {
  // Use a raw connection string to tell the ODBC driver exactly what to do
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};Server=localhost\\SQLEXPRESS;Database=demoApp;Trusted_Connection=yes;",
};
let pool = null;
export const connectDB = () => {
  try {
    // Note: When using connectionString, you pass it directly or inside the object
    pool = sql.connect(config);
    console.log("DB Connected");
    return pool;
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
};

export const getPool = async () => {
  if (pool) {
    return pool;
  } else {
    pool = await connectDB();
    return pool;
  }
};

export { sql };
