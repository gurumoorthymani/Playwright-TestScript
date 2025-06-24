import * as XLSX from 'xlsx';
export interface TestData {
    username: string;
    password: string;
}
export function readExcelData(filePath:string):TestData[]{
    const workBook = XLSX.readFile(filePath);
    const sheetName = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[sheetName];

    const data:TestData[] = XLSX.utils.sheet_to_json(workSheet);
    console.log('Excel parsed data:', data);
    return data;
}

