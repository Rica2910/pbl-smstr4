

import { ID } from "react-native-appwrite";
import { storage, db, config } from "./appwrite";

export const getSampahTongItems = async () => {
  try {
    const response = await db.listDocuments(
      config.databaseId,
      config.tongCollectionId
    );

    console.log(" Tong items fetched:", response.documents);
    return response.documents;
  } catch (error) {
    console.error("Gagal fetch data tong:", error);
    return [];
  }
};


export const getImagePreviewUrl = (fileId) => {
  try {
    const previewUrl = storage.getFilePreview(config.storageId, fileId).href;
    return previewUrl;
  } catch (error) {
    console.error(" Gagal generate preview URL:", error);
    return null;
  }
};


export const addSampahToTong = async ({
  title,
  type,
  poin,
  unitType,
  imagesampah, 
}) => {
  try {
    const newDoc = await db.createDocument(
      config.databaseId,
      config.tongCollectionId,
      ID.unique(),
      {
        title,
        type,
        poin: parseFloat(poin),
        unitType,
        imagesampah,
      }
    );

    console.log(" Sampah berhasil ditambahkan ke tong:", newDoc);
    return newDoc;
  } catch (error) {
    console.error(" Gagal menambahkan sampah ke tong:", error);
    throw error;
  }
};
