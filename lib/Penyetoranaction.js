import { storage, db, config, client, account, ID, Query } from "./appwrite";
import { router } from "expo-router";



export const handleSetor = async (
  selectedOption,
  parsedItems,
  selectedAlamatId
) => {
  try {
    if (!selectedOption) {
      alert("Pilih tanggal penjemputan dulu!");
      return;
    }

    if (!selectedAlamatId) {
      alert("Pilih alamat penjemputan dulu!");
      return;
    }

    if (parsedItems.length === 0) {
      alert("Belum ada item yang disetor!");
      return;
    }

    const akun = await account.get();

    const userDoc = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", akun.$id)]
    );

    if (!userDoc || userDoc.documents.length === 0) {
      throw new Error("User tidak ditemukan di collection users");
    }

    const userId = userDoc.documents[0].$id;

    for (let item of parsedItems) {
      const generatedId = ID.unique();

      console.log(`⏳Menyetor item: ${item.title} | ID: ${generatedId}`);

      await db.createDocument(
        config.databaseId,
        config.penyetoranCollectionId,
        generatedId,
        {
          title: item.title,
          type: item.type,
          poin: item.poin,
          unitType: item.unitType,
          imagesampah: item.imagesampah,
          tanggalPenjemputan: selectedOption,
          status: "Menunggu Persetujuan",
          users: userId,
          alamat: selectedAlamatId,
        }
      );
    }

    alert("Berhasil disetor!");
    router.push("/");
  } catch (error) {
    console.error(" Gagal setor:", error);
    alert("Gagal menyetor sampah.");
  }
};

export const updateDocumentPenyetoran = async (documentId, data) => {
  try {
    const result = await db.updateDocument(
      config.databaseId,
      config.penyetoranCollectionId,
      documentId,
      data
    );
    return result;
  } catch (error) {
    console.error("Gagal update penyetoran:", error);
    throw error;
  }
};


export const uploadBuktiFotoKurir = async (file) => {
  try {
    const extension = file.uri.split(".").pop();
    const generatedName = `photo_${Date.now()}.${extension}`;

    const fileData = {
      name: generatedName,
      type: file.mimeType || "image/jpeg",
      size: file.fileSize,
      uri: file.uri,
    };

    console.log("📦 Uploading file:", fileData);

    const uploaded = await storage.createFile(config.bucketId, ID.unique(), fileData);
    console.log("✅ Upload success:", uploaded);
    return uploaded.$id;
  } catch (error) {
    console.error(" Gagal upload bukti foto kurir:", error);
    throw error;
  }
};




export const updateFotoKurirPenyetoran = async (penyetoranId, fileId) => {
  try {
    const updated = await db.updateDocument(
      config.databaseId,
      config.penyetoranCollectionId,
      penyetoranId,
      {
        buktiFotoKurirrrr: fileId,
      }
    );

    return updated;
  } catch (error) {
    console.error("Gagal update dokumen penyetoran:", error);
    throw error;
  }
};


export const tambahPoinKeUser = async (userId, poinTambahan) => {
  try {
    const user = await db.getDocument(
      config.databaseId,
      config.userCollectionId,
      userId
    );

    const poinSekarang = user.coin || 0;
    const poinBaru = poinSekarang + poinTambahan;

    const updated = await db.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      {
        coin: poinBaru,
      }
    );

    return updated;
  } catch (error) {
    console.error(" Gagal menambahkan poin ke user:", error);
    throw error;
  }
};

export const tambahPenukaranKeUser = async (userId) => {
  try {
    const user = await db.getDocument(
      config.databaseId,
      config.userCollectionId,
      userId
    );

    const penukaranSekarang = user.penukaran || 0;
    const penukaranBaru = penukaranSekarang + 1;

    const updated = await db.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      {
        penukaran: penukaranBaru,
      }
    );

    return updated;
  } catch (error) {
    console.error("Gagal menambahkan penukaran ke user:", error);
    throw error;
  }
};
