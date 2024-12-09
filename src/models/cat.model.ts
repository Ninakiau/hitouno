import { pool } from "../config/database";
import { Cat } from "../interfaces/cat.interface";


//Leer todos los gatos
const readCats = async () => {
    const query = {
        text: "SELECT * FROM cats",
        values: [],
    };
    const { rows } = await pool.query(query);
    return rows as Cat[];
}

// Obtenemos 1 gato por id
const readCatById = async (id: string) => {
    const query = {
        text: "SELECT * FROM cats WHERE id = $1",
        values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0] as Cat;
}
// Crear un gato en la base de datos 
const createCat = async (name: string, weight: number, height: number, age: number, isFat: boolean, user: string) => {
    // Verifica si los valores necesarios están presentes y son del tipo correcto
    if (!name || typeof weight !== 'number' || typeof height !== 'number' || typeof age !== 'number' || typeof isFat !== 'boolean' || !user) {
        throw new Error('Todos los parámetros son obligatorios y deben tener el tipo adecuado');
    }

    try {
        const query = {
            text: "INSERT INTO cats(name, weight, height, age, is_fat, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            values: [name, weight, height, age, isFat, user],
        };
        
        // Ejecuta la consulta
        const { rows } = await pool.query(query);

        // Retorna el primer gato creado
        return rows[0] as Cat;
    } catch (error) {
        console.error('Error al crear el gato:', error);
        throw new Error('Error al crear el gato en la base de datos');
    }
}


// Delete cat by id 
const deleteCat = async (id: string) => {
    const query = {
        text: "DELETE FROM cats WHERE id = $1",
        values: [id],
    };
    const { rows } = await pool.query(query);
    return { message: `Cat with id ${id} deleted successfully` };
}



export const CatModel = {
    readCats,
    readCatById,
    createCat,
    deleteCat
}