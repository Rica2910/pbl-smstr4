import { db, ID, Query } from "./appwrite";

const DATABASE_ID = "6805f3fa00050ad885d8";
const COLLECTION_ID = "6805f50d000a9c1fdbb1";

export const addSampahToTong = async ({ title, type, poin, unitType, imagesampah }) => {
  try {
    const newDoc = await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      title,
      type,
      poin: parseFloat(poin), 
      unitType,
      status: "tong",
      imagesampah,
         
    });
    return newDoc;
  } catch (error) {
    console.error("Gagal menambahkan sampah ke tong:", error);
    throw error;
  }
};

export const getSampahTongItems = async () => {
  try {
    const res = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("status", "tong"),
    ]);
    return res.documents;
  } catch (error) {
    console.error("Gagal mengambil data tong:", error);
    return [];
  }
};