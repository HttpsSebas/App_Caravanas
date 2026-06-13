import { getDatabase } from "./db";

export async function getGanados({limit = 10} = {limit: 10}){
    const db = await getDatabase();
    const result = await db.getAllAsync("SELECT * FROM ganados LIMIT ?", [limit]);
    return result;
}

export async function getGanado(id: string){
    const db = await getDatabase();
    const result = await db.getFirstAsync("SELECT * FROM ganados WHERE caravana_id = ?", [id]);
    return result;
}

export async function createGanados(data: Array<{caravana_id: string, sexo: string, productor_id: number}>){
    const db = await getDatabase();
    console.log(data);
    for (const { caravana_id, sexo, productor_id } of data) {
        await db.runAsync("INSERT INTO ganados (caravana_id, sexo, productor_id) VALUES (?, ?, ?)", [caravana_id, sexo, productor_id]);
    }
}