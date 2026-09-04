export async function getSessions(db: any) {
  try {
    const sessions = await db.getAllAsync(
      "SELECT DISTINCT name FROM sessions ORDER BY session_date DESC",
    );
    return sessions;
  } catch (e) {
    throw new Error("Error getting sessions");
  }
}

export async function getSessionsByDate({
  limit,
  productorId,
  db
}: {
  limit?: number;
  productorId?: number;
  db: any
}) {
  try {

    let query = "SELECT * FROM sessions";
    const params: (string | number)[] = [];

    if (productorId) {
      query += " WHERE productor_id = ?";
      params.push(productorId);
    }

    query += " ORDER BY session_date DESC";

    if (limit !== undefined) {
      query += " LIMIT ?";
      params.push(limit);
    }

    const sessions = await db.getAllAsync(query, params);
    return sessions;
  } catch (e) {
    throw new Error("Error getting sessions by date");
  }
}

export async function createSession({ db, name, productor_id }) {
  try {
    const date = new Date();
    const session = await db.runAsync(
      "INSERT INTO sessions (name, productor_id, session_date) VALUES (?, ?, ?)",
      [name, productor_id, date.toISOString()],
    );
    return session.lastInsertRowId;
  } catch (e) {
    throw new Error("Error creating session");
  }
}
