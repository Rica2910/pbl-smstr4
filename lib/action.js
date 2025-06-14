import { ID } from "react-native-appwrite";
import { storage, db, config, Query } from "./appwrite";

export const getSampahTongItems = async (user) => {
  try {
    const response = await db.listDocuments(
      config.databaseId,
      config.tongCollectionId,
      [Query.equal("users", user.$id)]
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

export const deleteSampahTongItem = async (documentId) => {
  try {
    const response = await db.deleteDocument(
      config.databaseId,
      config.tongCollectionId,
      documentId
    );
    console.log("Berhasil menghapus item:", documentId);
    return response;
  } catch (error) {
    console.error("Gagal menghapus item:", error);
    throw error;
  }
};

export const getAlamatUser = async () => {
  try {
    const authUser = await account.get();

    const userDoc = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", authUser.$id)]
    );

    const userId = userDoc.documents[0].$id;

    const alamatDoc = await db.listDocuments(
      config.databaseId,
      config.alamatCollectionId,
      [Query.equal("user", userId)]
    );

    return alamatDoc.documents;
  } catch (error) {
    console.log("Gagal mengambil data alamat:", error);
    return [];
  }
};
