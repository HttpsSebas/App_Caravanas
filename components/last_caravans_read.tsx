import { View, FlatList } from "react-native";
import GanadoCard from "./ganado_card";
import { getGanados } from "../schema/ganados";
import { useState, useEffect } from "react";
import { useRefreshDB } from "@/context/refreshDBContext";


export default function LastCaravansRead() {
  const [ganados, setGanados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { refresh } = useRefreshDB();

  useEffect(() => {
    const fetchGanados = async () => {
      const data = await getGanados();
      setGanados(data);
      setLoading(false);
    };

    fetchGanados();
  }, [refresh]);

  const renderGanado = ({ item }: any) => (
    <GanadoCard caravana={item.caravana_id} sexo={item.sexo} />
  );

  return (
    <View>
      <FlatList data={ganados} renderItem={renderGanado} keyExtractor={(ganado: any) => ganado.caravana_id} />
    </View>
  );
}
