import {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  projectId: "6805f3350031a662e30f",
  platform: "com.poltek.pbl",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "6805f3fa00050ad885d8",
  userCollectionId: "6805f3ff003dfcc81885",
  sampahCollectionId: "6805f50d000a9c1fdbb1",
  bankCollectionId: "6809f73f003641eafec2",
  riwayatCollectionId: "6805f5e4001e4632109d",
  tongCollectionId: "683ac7ad00061316ab36",
  storageId: "6805fcb3001db0d06f70",
  penyetoranCollectionId: "683eca33000387e47378",
  alamatCollectionId: "683f60fb00060f12a2e8",
};

const {
  projectId,
  platform,
  endpoint,
  databaseId,
  userCollectionId,
  sampahCollectionId,
  bankCollectionId,
  riwayatCollectionId,
  storageId,
  penyetoranCollectionId,
  alamatCollectionId,
} = config;

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);


export { db, storage, ID, Query, Client, account };


export const createUser = async ({
  email,
  nama,
  bank,
  namaRekening,
  nomorRekening,
  password,
}) => {
  try {
  
    try {
      await signOut();
    } catch (_) {
 
    }

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


export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || "Gagal login");
  }
}


export async function signOut() {
  try {
    await account.deleteSession("current");
    console.log("Signout berhasil");
  } catch (error) {
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
      throw new Error("User tidak ditemukan");
    }

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error.message || "Gagal mengambil akun aktif");
  }
}
