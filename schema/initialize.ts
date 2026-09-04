import { createGanados } from "./ganados";
import { createProductor } from "./productores";
import { createSession } from "./session";
import { createSessionGanados } from "./session_ganados";

export async function initializeDatabase(db: any) {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS productores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL)`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS ganados (
            caravana_id TEXT PRIMARY KEY,
            sexo TEXT NOT NULL,
            observaciones TEXT,
            productor_id INTEGER,
            FOREIGN KEY (productor_id) REFERENCES productores(id))
            
            `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            productor_id INTEGER NOT NULL,
            session_date TEXT NOT NULL,
            FOREIGN KEY (productor_id) REFERENCES productores(id)
            );
        `);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS session_ganados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id INTEGER NOT NULL,
            caravana_id TEXT NOT NULL,
            FOREIGN KEY (session_id) REFERENCES sessions(id),
            FOREIGN KEY (caravana_id) REFERENCES ganados(caravana_id),
            UNIQUE (session_id, caravana_id)
        )`);
}

type Reading = {
  caravana: string;
  sexo: string;
  observaciones: string;
};

type InsertDataParams = {
  db: any;
  sheetName: string;
  readings: Reading[];
};

export async function insertData({ db, sheetName, readings }: InsertDataParams) {
  try {
    await db.withTransactionAsync(async () => {
      const productorId = await createProductor({ db, nombre: sheetName });

      const sessionId = await createSession({
        db,
        name: sheetName,
        productor_id: productorId,
      });

      await createGanados({
        db,
        data: readings.map(({ caravana, sexo, observaciones }) => ({
          caravana_id: caravana,
          sexo,
          observaciones,
          productor_id: productorId,
        })),
      });

      await createSessionGanados({
        db,
        data: readings.map(({ caravana }) => ({
          session_id: sessionId,
          caravana_id: caravana,
        })),
      });
    });
    return {
      ok: true,
      message: "Datos insertados con éxito",
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error insertando los datos",
    }
  }
}
