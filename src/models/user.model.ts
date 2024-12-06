import { pool } from "../config/database";
import { User } from "../interfaces/user.interface";


const create = async (email: string, password: string) => {
    const query = {
        text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
        values: [email, password],
    };
    const { rows } = await pool.query(query);
    return rows[0] as User;
}

const findById = async (id: string) => {
    const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0] as User;
}

const findByEmail = async (email: string) => {
    const query = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [email],
    };
    const { rows } = await pool.query(query);
    return rows[0] as User;

}

const update = async (id: string, email: string, password: string) => {
    const query = {
        text: "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *",
        values: [email, password, id],
    };
    const { rows } = await pool.query(query);
    return rows[0] as User;
}

const remove = async (id: string) => {
    const query = {
        text: "DELETE FROM users WHERE id = $1",
        values: [id],
    };
    const { rows } = await pool.query(query);
    return rows[0] as User;
}
const findAll = async () => {
    const query = {
        text: "SELECT * FROM users",
        values: [],
    };
    const { rows } = await pool.query(query);
    return rows as User[];

}
export const UserModel = {
    create,
    findById,
    findByEmail,
    update,
    remove,
    findAll
}