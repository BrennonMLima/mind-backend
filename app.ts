import * as express from "express";
import { AppDataSource } from "./src/db/data-source";
import { publicRouter, userRouter } from "./src/routes";
import * as cors from "cors"

AppDataSource.initialize()
  .then(() => {
    console.log("Banco Inicializado!");
  })
  .catch((err) => {
    console.log("Erro ao inicializar o banco.", err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("", publicRouter);

app.listen(8000);