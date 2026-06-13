import * as SQLite from "expo-sqlite";


let db: SQLite.SQLiteDatabase | null = null

export async function getDatabase(){
    if (!db){
        db = await SQLite.openDatabaseAsync("ganados.db");
    }
    return db
}

export async function cleanDatabase(){
    const db = await getDatabase();
    await db.execAsync("DELETE FROM ganados");
    await db.execAsync("DELETE FROM productores");
}

export async function closeDatabase(){
    const db = await getDatabase();
    await db.closeAsync();
}