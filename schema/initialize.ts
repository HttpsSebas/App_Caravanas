import { getDatabase } from "./db";

export async function initializeDatabase(){
    const db = await getDatabase();
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS productores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL)`);
    
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS ganados (
            caravana_id TEXT PRIMARY KEY,
            sexo TEXT NOT NULL,
            productor_id INTEGER,
            FOREIGN KEY (productor_id) REFERENCES productores(id))`);
}