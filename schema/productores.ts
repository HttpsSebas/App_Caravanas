import { getDatabase } from "./db";

export async function getProductores() {
    const db = await getDatabase();
    const productores = await db.getAllAsync("SELECT * FROM productores");
    return productores;
}

export async function getProductorById(id: number) {
    const db = await getDatabase();
    const productor = await db.getFirstAsync("SELECT * FROM productores WHERE id = ?", id);
    return productor;
}

export async function createProductor(nombre: string) {
    const db = await getDatabase();
    console.log("Creating productor with name:", nombre);
    const result = await db.runAsync("INSERT INTO productores (nombre) VALUES (?)", nombre);
    return result.lastInsertRowId;    
}