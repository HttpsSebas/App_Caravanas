import { File, Paths, Directory } from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { cleanDatabase, getDatabase } from "../schema/db";

const exportDatabase = async () => {
  try {
    const db = await getDatabase();
    const ganados = await db.getAllAsync("SELECT * FROM ganados");
    const productores = await db.getAllAsync("SELECT * FROM productores");

    const backup = {
      version: 1,
      exportDate: new Date().toISOString(),
      ganados,
      productores,
    };

    const toJson = JSON.stringify(backup, null, 2);

    const file = new File(Paths.cache, "backup-ganados.json");
    file.write(toJson);

    await Sharing.shareAsync(file.uri);

    return "Base de datos exportada con éxito";
  } catch (e) {
    throw new Error(`Error exportando la base de datos: ${e.message}`);
  }
};

const importDatabase = async () => {
  try {
    const documentResult = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });

    if (documentResult.canceled) return;

    const file = new File(documentResult.assets[0].uri);

    const content = await file.text();

    const backup = JSON.parse(content);

    const db = await getDatabase();

    await cleanDatabase();

    backup.productores.map(async (productor) => {
      await db.runAsync("INSERT INTO productores (id, nombre) VALUES (?, ?)", [
        productor.id,
        productor.nombre,
      ]);
    });

    backup.ganados.map(async (ganado) => {
      await db.runAsync(
        "INSERT INTO ganados (caravana_id, sexo, productor_id) VALUES (?, ?, ?)",
        [ganado.caravana_id, ganado.sexo, ganado.productor_id],
      );
    });

    return "Base de datos importada con éxito, reinicie la aplicación";
  } catch (e) {
    throw new Error(`Error importando la base de datos: ${e.message}`);
  }
};

export { exportDatabase, importDatabase };
