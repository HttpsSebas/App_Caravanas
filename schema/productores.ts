
export async function getProductores(db: any) {
  try {
    const productores = await db.getAllAsync(
      "SELECT * FROM productores ORDER BY nombre",
    );
    return productores;
  } catch (e) {
    throw new Error("Error getting productores");
  }
}

export async function getProductorById(id: number, db: any) {
  try {
    const productor = await db.getFirstAsync(
      "SELECT * FROM productores WHERE id = ?",
      [id],
    );
    return productor;
  } catch (e) {
    throw new Error("Error getting productor by id");
  }
}

export async function createProductor({
  db,
  nombre,
}: {
  db: any;
  nombre: string;
}) {
  try {
    const existing = await db.getFirstAsync(
      "SELECT id FROM productores WHERE LOWER(nombre) = LOWER(?)",
      [nombre],
    );

    if (existing) {
      return existing.id;
    }

    const result = await db.runAsync(
      "INSERT INTO productores (nombre) VALUES (?)",
      [nombre],
    );
    return result.lastInsertRowId;
  } catch (e) {
    throw new Error("Error creating productor");
  }
}
