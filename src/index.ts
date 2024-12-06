import "dotenv/config"
import express from "express";
import rateLimit from "express-rate-limit";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import catRouter from "./routes/cat.route";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./config/swagger";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { httpErrorHandler } from "./middlewares/httpErrorHandler";
import { pool } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el limitador
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por IP
    message:
        "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
    standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
    legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});

app.use(limiter);

app.use(loggerMiddleware);
app.use(httpErrorHandler); // Middleware para manejar errores  
app.use("/api/v1/", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cats", catRouter);


const main = async () => {
    try {
        const { rows } = await pool.query("SELECT NOW()");
        console.log(rows[0].now, "db conectada!");
        app.listen(PORT, () => {
            console.log("Servidor andando en el puerto: " + PORT);
        });
    } catch (error) {
        console.log(error);
    }
};


main();