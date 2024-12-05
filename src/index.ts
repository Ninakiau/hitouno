import express from "express";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import catRouter from "./routes/cat.route";

const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({extended:true})); // Para formularios

app.use("/api/v1/", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cats", catRouter);

app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto:  ${PORT}`);
});

