import * as express from "express";
import { Request, Response } from "express";
import { TaskService } from "../service/task.service";
import protectedRoute, { TokenPayload } from "../security/guard";
import * as jwt from "jsonwebtoken";

const router = express.Router();

router.use(protectedRoute);

router.post("/", async (req: Request, res: Response) => {
    const { projectId, name, description, dueDate, status } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    try {
        const user = jwt.decode(token) as TokenPayload;
        const task = await TaskService.createTask(user.id, projectId, {
            name,
            description,
            dueDate,
            status,
        });
        return res.status(201).send({ task });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar tarefa." });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await TaskService.getAllTasks();
        return res.send({ tasks });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao consultar tarefas." });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await TaskService.getTaskById(id);
        return res.send({ task });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao consultar tarefa." });
    }
});

router.get("/project/:projectId", async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
        const tasks = await TaskService.getTasksByProjectId(projectId);
        return res.send({ tasks });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao consultar tarefas do projeto." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await TaskService.deleteTask(id);
        res.status(202).send({ message: "Tarefa excluída com sucesso." });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao excluir tarefa." });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const taskData = req.body;

    try {
        const updatedTask = await TaskService.updateTask(id, taskData);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
