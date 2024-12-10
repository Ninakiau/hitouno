import { Request, Response } from "express";
import { CatService } from "../services/cat.service";

//Obtener todos los gatos
const getCats = async (req: Request, res: Response) => {
    try {
        const cats = await CatService.getAllCats();
        res.status(200).json(cats);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error del server" });
        }

    }
}

// Obtener un gato por id
const getCat = async (req: Request, res: Response) => {
    try {
        // Obtener el id del gato desde los parámetros de la solicitud
        const id = req.params.id;
        // Obtener el gato por su ID
        const cat = await CatService.getACat(id);
        // Verificar si el gato fue encontrado
        if (!cat) {
            res.status(404).json({ error: "Cat not found" });
        } else {
            res.json(cat);
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error del server" });
        }
    }
}

// Creamos un gato 
const writeCat = async (req: Request, res: Response) => {


    try {
        const { name, weight, height, age, isFat, userId } = req.body;

        // Log de cada campo individualmente
        console.log('name:', name);
        console.log('weight:', weight);
        console.log('height:', height);
        console.log('age:', age);
        console.log('isFat:', isFat);
        console.log('user:', userId);

        // Validación de los campos obligatorios
        if (!name || weight === undefined || height === undefined || age === undefined || isFat === undefined || !userId) {
            return res.status(400).json({
                error: "Todos los campos del gato son obligatorios: name, weight, height, age, isFat, user.",
                receivedData: req.body // Incluye los datos recibidos en la respuesta de error
            });
        }

        // Validación de tipos para los valores
        if (typeof weight !== 'number' || typeof height !== 'number' || typeof age !== 'number' || typeof isFat !== 'boolean') {
            return res.status(400).json({
                error: "Los tipos de datos no son correctos. weight, height, y age deben ser números y isFat debe ser un valor booleano.",
                receivedTypes: {
                    weight: typeof weight,
                    height: typeof height,
                    age: typeof age,
                    isFat: typeof isFat
                }
            });
        }

        // Llamada al servicio para crear el gato
        const newCat = await CatService.writeCats(name, weight, height, age, isFat, userId);

        // Responde con el código 201 para indicar creación exitosa
        res.status(201).json({
            message: "Gato creado exitosamente",
            cat: newCat
        });

    } catch (error) {
        console.error("Error en la creación del gato:", error);
        // Captura de errores y respuesta
        res.status(500).json({
            error: error instanceof Error ? error.message : "Error del servidor al crear el gato"
        });
    }
};

const deleteCat = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const cat = await CatService.delectCat(id);
        res.json(cat);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error del server" });
        }
    }
}

export const catController = {
    getCats,
    getCat,
    writeCat,
    deleteCat
};