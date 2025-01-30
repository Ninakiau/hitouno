import { CatModel } from "../schema/cat.model";
import { UserModel } from "../schema/user.model";


// Traemos todos los gatos 
const getAllCats = async () => {
    const cats = await CatModel.findAll();

    return cats;
}
//Obtenemos 1 gato por id
const getACat = async (id: string) => {
    const cat = await CatModel.findByPk(id);
    if (!cat) throw new Error("Cat not found");
    return cat;
}
type CreateCatDTO = {
    name: string;
    weight: number;
    height: number;
    age: number;
    isFat: boolean;
    userId: string;
};

const writeCats = async (name: string, weight: number, height: number, age: number, isFat: boolean, userId: string) => {
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
    if (!userId || typeof userId !== 'string') {
        throw new Error("El campo 'user' es obligatorio y debe ser una cadena.");
    }

    // Validar existencia del usuario
    const user = await UserModel.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }

    // Crear el gato
    const newCat = await CatModel.create({ name, weight, height, age, isFat, userId } );
    return newCat;
};
const deleteCat = async (id: string): Promise<{ message: string }> => {
    const cat = await CatModel.findByPk(id);
    if (!cat) throw new Error("Cat not found");
    
    await cat.destroy();
    return { message: `Cat with id ${id} deleted successfully` };
  };
export const CatService = {
    getAllCats,
    getACat,
    writeCats,
    deleteCat
}