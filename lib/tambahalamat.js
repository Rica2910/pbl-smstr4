import { ID, Query } from "react-native-appwrite";
import { db, config, account } from "./appwrite";
import { router } from "expo-router";
import * as Location from "expo-location";

const tambahalamat = async (form, setIsSubmitting) => {
  setIsSubmitting(true);

  try {
    if (
      !form.nama_pengirim ||
      !form.no_hp ||
      !form.tempat_diterima ||
      !form.kecamatan ||
      !form.alamat_lengkap
    ) {
      alert("Harap lengkapi semua data alamat!");
      setIsSubmitting(false);
      return;
    }

   
    const authUser = await account.get();
    const accountId = authUser.$id;

    
    const userDoc = await db.listDocuments(
      config.databaseId,
      config.userCollectionId, 
      [Query.equal("accountId", accountId)]
    );

    if (userDoc.total === 0) {
      alert("Data user tidak ditemukan di koleksi users.");
      setIsSubmitting(false);
      return;
    }

    const userId = userDoc.documents[0].$id; 

    
    await db.createDocument(
      config.databaseId,
      config.alamatCollectionId,
      ID.unique(),
      {
        user: [userId], 
        nama_pengirim: form.nama_pengirim,
        no_hp: form.no_hp,
        tempat_diterima: form.tempat_diterima,
        kecamatan: form.kecamatan,
        alamat_lengkap: form.alamat_lengkap,
         latitude, // titik lokasi
        longitude,
      }
    );

    alert("Alamat berhasil disimpan!");
    router.push("/penyetoran");
  } catch (error) {
    console.error("Gagal menyimpan alamat:", error);
    alert("Terjadi kesalahan saat menyimpan alamat.");
  } finally {
    setIsSubmitting(false);
  }
};

export default tambahalamat;
