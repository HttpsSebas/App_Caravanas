import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function cleanDatabase(db: any) {
  try {
    await db.execAsync("DELETE FROM ganados");
    await db.execAsync("DELETE FROM productores");
    await db.execAsync("DELETE FROM session_ganados");
    await db.execAsync("DELETE FROM sessions");
    return {
      ok: true,
      message: "Base de datos limpiada con éxito",
    }
  } catch (e) {
    return {
      ok: false,
      message: "Error limpiando la base de datos",
    }
  }
}

export async function closeDatabase(db: any) {
  await db.closeAsync();
}

export async function deleteDatabase(db: any) {
  try {
    await db.closeAsync();
    await SQLite.deleteDatabaseAsync("ganados.db");
    return {
      ok: true,
      message: "Base de datos borrada con éxito",
    }
  } catch (e) {
    return {
      ok: false,
      message: "Error borrando la base de datos",
    }
  }
}
