import { View, FlatList } from "react-native";
import GanadoCard from "./ganado_card";
import { getGanados } from "../schema/ganados";
import { useState, useEffect } from "react";

export default function LastCaravansRead() {
  const [ganados, setGanados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGanados = async () => {
      const ganados = await getGanados();
      setGanados(ganados);
      setLoading(false);
    };

    fetchGanados();
  }, []);

  const renderGanado = ({ item }: any) => (
    <GanadoCard caravana={item.caravana_id} sexo={item.sexo} />
  );

  return (
    <View>
      <FlatList data={ganados} renderItem={renderGanado} keyExtractor={(ganado: any) => ganado.caravana_id} />
    </View>
  );
}
