import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { Cat } from "../interfaces/cat.interface";

//La dirección del archivo 
const __dirname = import.meta.dirname;
const pathFile = path.resolve(__dirname, "../../data/cats.json");

//Leer todos los gatos
const readCats = async () => {
    const catJson = await readFile(pathFile, "utf-8");
    const cats = JSON.parse(catJson) as Cat[];
    return cats;
}

// Obtenemos 1 gato por id
const readCatById = async (id: string) => {
    const catJson = await readFile(pathFile, "utf-8");
    const cats = JSON.parse(catJson) as Cat[];
    const cat = cats.find(item => item.id === id);
    return cat;
}
// Escribir los gatos en el archivo
const writeCats = async (cats: Cat[]) => {
    const catsJson = JSON.stringify(cats, null, 2);
    return await writeFile(pathFile, catsJson);
}


export const CatModel = {
    readCats,
    readCatById,
    writeCats
}