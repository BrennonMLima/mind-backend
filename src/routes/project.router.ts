import * as express from "express";
import { Request, Response } from "express";
import { ProjectService } from "../service/project.service";
import protectedRoute, { TokenPayload } from "../security/guard";
import * as jwt from "jsonwebtoken";

const router = express.Router();

router.use(protectedRoute);

router.post("/", async (req: Request, res: Response) => {
    const { name, description, status } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    try {
        const user = jwt.decode(token) as TokenPayload;
        const project = await ProjectService.createProject({
            name,
            description,
        });
        return res.status(201).send({ project });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao criar projeto." });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
        const projects = await ProjectService.getAllProjects();
        return res.send({ projects });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao consultar projetos." });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const project = await ProjectService.getProjectById(id);
        return res.send({ project });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao consultar projeto." });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await ProjectService.deleteProject(id);
        res.status(202).send({ message: "Projeto excluído com sucesso." });
    } catch (error) {
        return res.status(500).send({ message: "Erro ao excluir projeto." });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const projectData = req.body;

    try {
        const updatedProject = await ProjectService.updateProject(id, projectData);
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
