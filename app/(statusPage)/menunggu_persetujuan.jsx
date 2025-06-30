import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomProsesCard from "../../components/CustomProsesCard";
import { db, config } from "../../lib/appwrite"; 
import { Query } from "appwrite";


const menunggu_persetujuan = () => {
  const [penyetoranData, setPenyetoranData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataPenyetoran = async () => {
  try {
    const response = await db.listDocuments(
      config.databaseId,
      config.penyetoranCollectionId,
      [
       Query.equal("status", ["menunggu persetujuan", "menunggu_persetujuan"])
      ]
    );
    setPenyetoranData(response.documents);
  } catch (error) {
    console.error("Gagal mengambil data penyetoran:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDataPenyetoran();
  }, []);

  return (
    <SafeAreaView className="h-full bg-primary">
      {loading ? (
        <ActivityIndicator size="large" color="#000" className="mt-10" />
      ) : (
        <FlatList
          data={penyetoranData}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <CustomProsesCard data={item} containerStyles="px-4" />
          )}
        />
      )}
      <StatusBar style="dark" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default menunggu_persetujuan;
