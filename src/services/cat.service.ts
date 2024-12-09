import { CatModel } from "../models/cat.model";
import {Cat} from "../interfaces/cat.interface";


// Traemos todos los gatos 
const getAllCats = async () => {
    const cats = await CatModel.readCats();
    if (cats.length === 0) throw new Error('No cats found');
    return cats;
}
//Obtenemos 1 gato por id
const getACat = async (id: string) => {
    const cat = await CatModel.readCatById(id);
    if (!cat) throw new Error("Cat not found");
    return cat;
}

const writeCats = async (name: string, weight: number, height: number, age: number, isFat: boolean, user: string) => {

    // Validación adicional para asegurar que los datos son correctos
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error("El campo 'name' es obligatorio y debe ser una cadena no vacía.");
    }
    if (typeof weight !== 'number' || weight <= 0) {
        throw new Error("El campo 'weight' debe ser un número positivo.");
    }
    if (typeof height !== 'number' || height <= 0) {
        throw new Error("El campo 'height' debe ser un número positivo.");
    }
    if (typeof age !== 'number' || age <= 0) {
        throw new Error("El campo 'age' debe ser un número positivo.");
    }
    if (typeof isFat !== 'boolean') {
        throw new Error("El campo 'isFat' debe ser un valor booleano (true o false).");
    }
    if (!user || typeof user !== 'string') {
        throw new Error("El campo 'user' es obligatorio y debe ser una cadena.");
    }

    // Llamada al modelo para insertar el gato
    const newCat = await CatModel.createCat(name, weight, height, age, isFat, user);
    return newCat;
};


const delectCat = async (id: string) => {
    const cat = await CatModel.readCatById(id);
    if (!cat) throw new Error("Cat not found");
    await CatModel.deleteCat(id);
    return { message: `Cat with id ${id} deleted successfully` }
}
export const CatService = {
    getAllCats,
    getACat,
    writeCats,
    delectCat
}