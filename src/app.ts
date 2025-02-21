import "dotenv/config";
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import express from "express";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { Server } from "socket.io";
import { httpErrorHandler } from "./middlewares/httpErrorHandler";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import authRoute from "./routes/auth.route";
import catRoute from "./routes/cat.route";
import userRoute from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./config/swagger";
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const httpServer = createServer(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar Express para servir archivos estáticos
app.use(express.static(join(__dirname, '../public')));

// Asegurarse de que chat.html sea accesible
app.get('/chat.html', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

interface AuthenticatedSocket extends Socket {
    user?: {
        email: string;
        uid: string;
    };
}
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication error'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        socket.user = decoded as { email: string; uid: string };
        next();
    } catch (err) {
        next(new Error('invalid token'));
    }
});

io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`Usuario ${socket.user?.email} conectado`);

    socket.on("chat message", (msg: { message: string }) => {
        io.emit("chat message", {
            username: socket.user?.email,
            message: msg.message
        });
    });

    socket.on("disconnect", () => {
        console.log(`Usuario ${socket.user?.email} desconectado`);
    });
});

// Middlewares requeridos
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static("public"));


app.use(
    "/api/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
);

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

// Aplicar el limitador globalmente
app.use(limiter);

app.use(loggerMiddleware);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cats", catRoute);

app.use(httpErrorHandler);

export { app, httpServer };