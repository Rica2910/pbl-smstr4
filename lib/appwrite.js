import {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";
import { router } from "expo-router";
import { use } from "react";
import { Alert } from "react-native";

export const config = {
  projectId: "6805f3350031a662e30f",
  platform: "com.poltek.pbl",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "6805f3fa00050ad885d8",
  userCollectionId: "6805f3ff003dfcc81885",
  pekerjaCollectionId: "6841c0b50016187959f4",
  sampahCollectionId: "6805f50d000a9c1fdbb1",
  bankCollectionId: "6809f73f003641eafec2",
  riwayatCollectionId: "6805f5e4001e4632109d",
  tongCollectionId: "683ac7ad00061316ab36",
  storageId: "6805fcb3001db0d06f70",
  penyetoranCollectionId: "683eca33000387e47378",
  alamatCollectionId: "683f60fb00060f12a2e8",

  bucketId: "6805fcb3001db0d06f70",

  penukaranRequestCollectionId: "685af680003c99ea1987",

};

const {
  projectId,
  platform,
  endpoint,
  databaseId,
  userCollectionId,
  sampahCollectionId,
  pekerjaCollectionId,
  bankCollectionId,
  riwayatCollectionId,
  storageId,
  penyetoranCollectionId,
  alamatCollectionId,
  penukaranRequestCollectionId,
} = config;


const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);
console.log("📡 Appwrite endpoint:", client.endpoint);


const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);

export {
  db,
  storage,
  ID,
  Query,
  Client,
  account,
  databaseId,
  penyetoranCollectionId,
  penukaranRequestCollectionId,
  bankCollectionId,
};

export const createUser = async ({
  email,
  nama,
  bank,
  namaRekening,
  nomorRekening,
  password,
}) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, nama);
    if (!newAccount) throw new Error("Gagal membuat akun");

    const avatarUrl = avatars.getInitials(nama);

    await signIn(email, password);

    const newUser = await db.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        nama: nama,
        penukaran: 0,
        role: "penyumbang",
        password: password,
        avatar_url: avatarUrl,
      }
    );

    const newBank = await db.createDocument(
      databaseId,
      bankCollectionId,
      ID.unique(),
      {
        users: newUser.$id,
        nama_bank: bank,
        rekening: nomorRekening,
        nama: namaRekening,
      }
    );

    return newBank;
  } catch (error) {
    console.log("Error createUser:", error);
    throw new Error(error.message || "Gagal membuat user");
  }
};

export async function registerPengelolaDanKurir({
  email,
  password,
  nama,
  role,
}) {
  try {
    const createAccount = await account.create(
      ID.unique(),
      email,
      password,
      nama
    );
    if (!createAccount) throw new Error("Gagal membuat akun");

    const avatar_url = avatars.getInitials(nama);

    console.log(nama);
    const createUser = await db.createDocument(
      databaseId,
      pekerjaCollectionId,
      ID.unique(),
      {
        email: email,
        nama: nama,
        password: password,
        role: role,
        avatar_url: avatar_url,
        account_id: createAccount.$id,
      }
    );
    if (!createUser) throw new Error("Gagal membuat Akun");

    return createUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Gagal membuat akun pengelola/kurir");
  }
}

export async function signIn(email, password) {
  try {
    try {
      await account.get();
      await account.deleteSession("current");
    } catch (err) {}

    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Error saat login:", error);
    throw new Error(error.message || "Gagal login");
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
    console.log("Signout berhasil");
    router.replace("/sign-in");
  } catch (error) {
    console.log("Error saat logout:", error);
    throw new Error(error.message || "Gagal logout");
  }
}

export async function currentActiveAccount() {
  try {
    const activeAccount = await account.get();
    if (!activeAccount) throw new Error("Tidak ada akun aktif");

    const currentUser = await db.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", activeAccount.$id),
    ]);

    if (!currentUser || currentUser.documents.length === 0) {
      const pekerja = await db.listDocuments(databaseId, pekerjaCollectionId, [
        Query.equal("account_id", activeAccount.$id),
      ]);

      if (pekerja.documents.length > 0) return pekerja.documents[0];
      else throw new Error("User tidak ditemukan");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error currentActiveAccount:", error);
    throw new Error(error.message || "Gagal mengambil akun aktif");
  }
}

export const fetchDataPenyetoran = async (id) => {
  const res = await db.listDocuments(
    databaseId,
    penyetoranCollectionId,
    [Query.equal("$id", id)]
  );

  return res.documents[0]; // langsung return 1 dokumen
};

export async function fetchCekDataPenyetoran(id) {
  try {
    const response = await db.getDocument(
      databaseId,
      penyetoranCollectionId,
      id
    );
    return response;
  } catch (error) {
    console.log("Error fetchDataPenyetoran:", error);
    throw new Error("Gagal mengambil data penyetoran");
  }
}


export const fetchAllPenyetoran = async () => {
  const res = await db.listDocuments(databaseId, penyetoranCollectionId);
  return res.documents; 
};

export async function penukaranKoin({ jumlah, users, bank }) {
  try {
    const response = await db.createDocument(
      databaseId,
      penukaranRequestCollectionId,
      ID.unique(),
      {
        jumlah: jumlah,
        users: users,
        status: "Menunggu Persetujuan",
        bank: bank,
      }
    );
    return response;
  } catch (error) {
    console.log("Error : ", error);
  }
}

export async function fetchDataPenukaran() {
  try {
    const response = await db.listDocuments(
      databaseId,
      penukaranRequestCollectionId
    );
    return response.documents;
  } catch (error) {
    console.log(error);
  }
}

export async function cekDataPenukaran(id) {
  try {
    const response = await db.getDocument(
      databaseId,
      penukaranRequestCollectionId,
      id
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file, type) {
  if (!file) return;

  const extension = file.uri.split(".").pop();
  const generatedName = `photo_${Date.now()}.${extension}`;

  const assets = {
    name: generatedName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  console.log("file : ", assets);

  try {
    const result = await storage.createFile(storageId, ID.unique(), assets);

    console.log("Result : ", result);

    const imgUrl = await storage.getFilePreview(
      storageId,
      result.$id,
      2000,
      2000,
      "top",
      100
    );

    if (!imgUrl) throw Error;
    return imgUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePenukaranRequest(id, imagePick) {
  try {
    const [imageUrl] = await Promise.all([uploadFile(imagePick, "image")]);

    const updatePenukaran = await db.updateDocument(
      databaseId,
      penukaranRequestCollectionId,
      id,
      {
        status: "Selesai",
        buktiURL: imageUrl,
      }
    );

    const userId = updatePenukaran.users.$id;

    const getKoin = await db.getDocument(databaseId, userCollectionId, userId);

    console.log(getKoin.coin - updatePenukaran.jumlah);

    const updateKoin = await db.updateDocument(
      databaseId,
      userCollectionId,
      userId,
      {
        coin: getKoin.coin - updatePenukaran.jumlah,
      }
    );

    return updateKoin;
  } catch (error) {
    console.log(error);
  }
}

