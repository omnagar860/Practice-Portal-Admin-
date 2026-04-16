import { deleteRecord, findRecords, insertRecord, updateRecord } from "./base.js"


export const  getAllOfficeService  = async()=> {
    try {
        const data = await findRecords("mst_office");
        // console.log("--------------------- office data")
        return data
    } catch (error) {
        throw new Error("Error while fetching office data.")
    }
} 

// export const creatOfficeService = async (data)=> {
//     try {
//         if(!data) return "Enter data to create a office.";
//         // {officeName, division, district, address,area , pincode};
//         if(!data.officeName.trim() || data.officeName.trim() === "") return "Please enter office name";
//         if(!data.division.trim() || data.division.trim() === "") return "Please enter division name";
//         if(!data.district.trim() || data.district.trim() === "") return "Please enter district name";
//         if(!data.address.trim() || data.address.trim() === "") return "Please enter office address.";
//         if(!data.area.trim() || data.area.trim() === "") return "Please enter value of area.";
//         if(!data.pincode.trim() || data.pincode.trim() === "") return "Please enter valid pincode.";
//         const data =  await insertRecord("mst_office", data)
//         console.log("In service office created", data)

        
//     } catch (error) {
//         throw new Error("Error while creating office")
//     }
// }
export const creatOfficeService = async (data) => {
    try {
        console.log("data in service", data)
        if (!data) throw new Error("Enter data to create office");
        // if(!data.division.trim() || data.division.trim() === "") return "Please enter division name";
        // if(!data.officeName.trim() || data.officeName.trim() === "") return "Please enter office name";
        // if(!data.district.trim() || data.district.trim() === "") return "Please enter district name";
        // if(!data.address.trim() || data.address.trim() === "") return "Please enter office address.";
        // if(!data.area.trim() || data.area.trim() === "") return "Please enter value of area.";
        // if(!data.pincode && typeof data.pincode !== "number") return "Please enter valid pincode.";

        if (!data.officeName?.trim()) throw new Error("Please enter office name");
        if (!data.division?.trim()) throw new Error("Please enter division name");
        if (!data.district?.trim()) throw new Error("Please enter district name");
        if (!data.address?.trim()) throw new Error("Please enter office address");
        if (!data.area?.trim()) throw new Error("Please enter area");
        if (!data.pincode) throw new Error("Please enter valid pincode");

        const result = await insertRecord("mst_office", data);

        console.log("Office created:", result);
        return result;

    } catch (error) {
        throw error; // important
    }
};

export const updateOfficeService = async(id)=> {
    try {
        if(!id) return  console.log("editService:- Id is required");
        return await  updateRecord("mst_office", {isActive : false}, {id})

    } catch (error) {
        console.log("Error while updating office")
    }
}

export const deleteOfficeService = async(id)=> {
    try {
        if(!id) return ("deleteService:- Id is required");
        return await deleteRecord("mst_office",{id} )
    } catch (error) {
        console.log("Error while deleting office", error.message)
        throw new Error("Error while delting office")
    }
}