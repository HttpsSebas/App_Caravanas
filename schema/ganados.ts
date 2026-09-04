export async function getGanados({ limit = 10, db } = { limit: 10, db: null }) {
  try {
    const result = await db.getAllAsync("SELECT * FROM ganados LIMIT ?", [
      limit,
    ]);
    return result;
  } catch (e) {
    throw new Error("Error getting ganados");
  }
}

export async function getGanado(id: string, { db } = { db: null }) {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM ganados WHERE caravana_id = ?",
      [id],
    );
    return result;
  } catch (e) {
    throw new Error("Error getting ganado");
  }
}

export async function createGanados({
  db,
  data,
}: {
  db: any;
  data: Array<{
    caravana_id: string;
    sexo: string;
    observaciones: string;
    productor_id: number;
  }>;
}) {
  try {
    for (const { caravana_id, sexo, observaciones, productor_id } of data) {
      await db.runAsync(
        "INSERT OR IGNORE INTO ganados (caravana_id, sexo, observaciones, productor_id) VALUES (?, ?, ?, ?)",
        [caravana_id, sexo, observaciones, productor_id],
      );
    }
  } catch (e) {
    throw new Error("Error creating ganados");
  }
}

export async function updateGanado({
  db,
  data,
}: {
  db: any;
  data: Array<{
    caravana_id: string;
    sexo: string;
    observaciones: string;
    productor_id: number;
  }>;
}) {
  try {
    for (const { caravana_id, sexo, observaciones, productor_id } of data) {
      await db.runAsync(
        "UPDATE ganados SET sexo = ?, observaciones = ?, productor_id = ? WHERE caravana_id = ?",
        [sexo, observaciones, productor_id, caravana_id],
      );
    }
    return {
      ok: true,
      message: "Ganado actualizado con éxito",
    }
  } catch (e) {
    return {
      ok: false,
      message: "Error actualizando el ganado",
    }
  }
}
