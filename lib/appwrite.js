import { Client, Account, Avatars, Databases } from "react-native-appwrite";

export const config = {
  projectId: "6805f3350031a662e30f",
  platform: "com.poltek.pbl",
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: "6805f3fa00050ad885d8",
  userCollectionId: "6805f3ff003dfcc81885",
  sampahCollectionId: "6805f50d000a9c1fdbb1",
  riwayatCollectionId: "6805f5e4001e4632109d",
  storageId: "6805fcb3001db0d06f70",
};

const {
  projectId,
  platform,
  endpoint,
  databaseId,
  userCollectionId,
  sampahCollectionId,
  riwayatCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform("com.example.myappwriteapp"); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);

export const createUser = async ({
  email,
  nama,
  bank,
  namaRekening,
  nomorRekening,
  password,
  konfirmPassword,
}) => {
  if (password === konfirmPassword) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        nama
      );

      if (!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(nama);

      signIn(email, password);

      const newUser = await db.createDocument(
        databaseId,
        userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          nama: nama,
          bank: bank,
          nama_rekening: namaRekening,
          nomor_rekening: nomorRekening,
          password: password,
          avatar_Url: avatarUrl,
        }
      );

      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
