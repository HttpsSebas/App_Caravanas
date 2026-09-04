
export async function getSessionGanadosById({ id, db }: { id: number, db: any }) {
  try {
    const sessionGanados = await db.getAllAsync(
      "SELECT * FROM session_ganados JOIN ganados ON session_ganados.caravana_id = ganados.caravana_id WHERE session_id = ?",
      [id],
    );

    return sessionGanados;
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
