export async function getSessionGanadosById({
  id,
  db,
}: {
  id: number;
  db: any;
}) {
  try {
    const sessionGanados = await db.getAllAsync(
      "SELECT * FROM session_ganados JOIN ganados ON session_ganados.caravana_id = ganados.caravana_id WHERE session_id = ?",
      [id],
    );

    return sessionGanados || [];
  } catch (e) {
    throw new Error("Error getting session ganados by id");
  }
}

export async function createSessionGanados({
  db,
  data,
}: {
  db: any;
  data: Array<{ session_id: number; caravana_id: string }>;
}) {
  try {
    for (const { session_id, caravana_id } of data) {
      await db.runAsync(
        "INSERT INTO session_ganados (session_id, caravana_id) VALUES (?, ?)",
        [session_id, caravana_id],
      );
    }
  } catch (e) {
    throw new Error("Error creating session ganados");
  }
}

export async function deleteSessionGanadoByCaravana({
  caravana_id,
  db,
}: {
  caravana_id: string;
  db: any;
}) {
  try {
    await db.runAsync("DELETE FROM session_ganados WHERE caravana_id = ?", [
      caravana_id,
    ]);
    return {
      ok: true,
      message: "Session ganado eliminado con éxito",
    };
  } catch (e) {
    return {
      ok: false,
      message: "Error deleting session ganado",
    };
  }
}
