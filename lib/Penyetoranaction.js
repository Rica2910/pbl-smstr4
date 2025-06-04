import { ID, Query } from "react-native-appwrite";
import { storage, db, config, client, account } from "./appwrite";
import { router } from "expo-router";

export const handleSetor = async (selectedOption, parsedItems) => {
  try {
    if (!selectedOption) {
      alert("Pilih tanggal penjemputan dulu!");
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
      await db.createDocument(
        config.databaseId,
        config.penyetoranCollectionId,
        ID.unique(),
        {
          title: item.title,
          type: item.type,
          poin: item.poin,
          unitType: item.unitType,
          imagesampah: item.imagesampah,
          tanggalPenjemputan: selectedOption,
          status: "Menunggu Penjemputan",
          users: userId, 
        }
      );
    }

    alert("Berhasil disetor!");
    router.push("/");

  } catch (error) {
    console.error("Gagal setor:", error);
    alert("Gagal menyetor sampah.");
  }
};
