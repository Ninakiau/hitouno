import { CatModel } from "../models/cat.model";
import {Cat} from "../interfaces/cat.interface";
import { nanoid } from "nanoid";

// Traemos todos los gatos 
const getAllCats = async () => {
    const cats = await CatModel.readCats();
    return cats;
}
//Obtenemos 1 gato por id
const getACat = async (id: string) => {
    const cat = await CatModel.readCatById(id);
    return cat;
}

const writeCats = async (name: string, weight: number, height: number, age: number) => {
    //Validamos los campos
    if (!name || !weight || !height || !age) {
        throw new Error("Todos los campos del gato son obligatorios: name, weight, height, age.");
    }

    // Obtenemos la lista de gatos existente
    const cats = await getAllCats();

    // Creamos el nuevo gato con un ID único
    const newCat = {
        id: nanoid(), // Genera un ID único
        name,
        weight,
        height,
        age  
    };
    //Agregamos el nuevo gato 
    cats.push(newCat);
    await CatModel.writeCats(cats); // Guardamos los gatos actualizados
    return newCat; // Retorna el gato recién agregado
};


export const CatService = {
    getAllCats,
    getACat,
    writeCats
}