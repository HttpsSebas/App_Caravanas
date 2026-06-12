import XLSX from "xlsx";
import { File, Paths }from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function export_excel({data, sheetName, fileName}) {
    try{
        console.log(data)
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);

        const wbout = XLSX.write(wb, { 
            type: "base64", 
            bookType: "xlsx" 
        });

        const file = new File(Paths.cache, `${fileName}.xlsx`);
        file.write(wbout, { encoding: "base64" });
        await Sharing.shareAsync(file.uri);
        
    } catch(e) {
        throw new Error(`Error exporting to Excel: ${e.message}`);
    }
}