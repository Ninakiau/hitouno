import { Request, Response } from "express";
import { CatService } from "../services/cat.service";

//Obtener todos los gatos
const getCats = async (req: Request, res: Response) => {
    try {
        const cats = await CatService.getAllCats();
        res.json(cats);
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
        const { name, weight, height, age } = req.body;
        const newCat = await CatService.writeCats(name, weight, height, age);
        res.json(newCat);
    }catch (error) {
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
    writeCat
};