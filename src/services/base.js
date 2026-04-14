
// import sql from "mssql/msnodesqlv8.js";
import { getPool, sql } from "../config/db.js";

/**
 * Generic insert function
 * @param {string} tableName - Table to insert into
 * @param {Object} fields - { columnName: value, ... }
 * @returns {Object} - Inserted row with id
 *
 * Usage:
 * insertRecord("mst_division", { division_name: "HR" })
 */
export const insertRecord = async (tableName, fields) => {
    // console.log(tableName, fields)
    if (!fields || Object.keys(fields).length === 0) {
        throw new Error("No fields provided for insertion");
    }

    const pool = await getPool();
    const request = pool.request();

    const columns = Object.keys(fields);        // ["division_name"]
    const paramNames = columns.map(col => `@${col}`);  // ["@division_name"]

    // Dynamically bind each input
    columns.forEach(col => {
        request.input(col, inferSqlType(fields[col]), fields[col]);
    });

    const query = `
        INSERT INTO ${tableName} (${columns.join(", ")})
        OUTPUT INSERTED.*
        VALUES (${paramNames.join(", ")})
    `;

    const result = await request.query(query);
    // console.log("======", result)
    return result.recordset[0];
};


/**
 * Inf er mssql type from JS value
 */
const inferSqlType = (value) => {
    if (typeof value === "number") {
        return Number.isInteger(value) ? sql.Int : sql.Float;
    }
    if (typeof value === "boolean") return sql.Bit;
    if (value instanceof Date)      return sql.DateTime;
    return sql.NVarChar(sql.MAX);   // default → string
};

// Generic SELECT by field
export const findRecords = async (tableName, conditions = {}) => {
    const pool = await getPool();
    const request = pool.request();

    const keys = Object.keys(conditions);

    let whereClause = "";
    if (keys.length > 0) {
        keys.forEach(key => request.input(key, inferSqlType(conditions[key]), conditions[key]));
        whereClause = "WHERE " + keys.map(k => `${k} = @${k}`).join(" AND ");
    }

    const result = await request.query(`SELECT * FROM ${tableName} ${whereClause}`);
    return result.recordset;
};

// Generic DELETE
export const deleteRecord = async (tableName, conditions = {}) => {
    const pool = await getPool();
    const request = pool.request();

    const keys = Object.keys(conditions);
    if (keys.length === 0) throw new Error("No conditions provided for delete");

    keys.forEach(key => request.input(key, inferSqlType(conditions[key]), conditions[key]));
    const whereClause = keys.map(k => `${k} = @${k}`).join(" AND ");

    const result = await request.query(`DELETE FROM ${tableName} OUTPUT DELETED.* WHERE ${whereClause}`);
    return result.recordset;
};

// Generic UPDATE
export const updateRecord = async (tableName, fields = {}, conditions = {}) => {
    const pool = await getPool();
    const request = pool.request();

    if (Object.keys(fields).length === 0)     throw new Error("No fields to update");
    if (Object.keys(conditions).length === 0) throw new Error("No conditions provided for update");

    Object.entries(fields).forEach(([key, val]) => 
        request.input(`set_${key}`, inferSqlType(val), val));

    Object.entries(conditions).forEach(([key, val]) => 
        request.input(`where_${key}`, inferSqlType(val), val));

    const setClause   = Object.keys(fields).map(k => `${k} = @set_${k}`).join(", ");
    const whereClause = Object.keys(conditions).map(k => `${k} = @where_${k}`).join(" AND ");

    const result = await request.query(`
        UPDATE ${tableName}
        SET ${setClause}
        OUTPUT INSERTED.*
        WHERE ${whereClause}
    `);
    return result.recordset[0];
};