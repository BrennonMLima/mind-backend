import { NotFoundException, InternalException } from "../exceptions";
import { Projects } from "../models/project.model";

export class ProjectService {
    static async getAllProjects(): Promise<Projects[]> {
        try {
            const projects = await Projects.find();
            if (projects.length === 0) throw new NotFoundException("Nenhum projeto encontrado.");
            return projects;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao consultar projetos.");
        }
    }

    static async getProjectById(projectId: string): Promise<Projects> {
        try {
            const project = await Projects.findOneBy({ id: projectId });
            if (!project) throw new NotFoundException("Projeto não encontrado.");
            return project;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao consultar projeto.");
        }
    }

    static async createProject(projectData: Partial<Projects>): Promise<Projects> {
        try {

            const project = new Projects();
            Object.assign(project, projectData);

            const newProject = await Projects.save(project);
            return newProject;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao criar projeto.");
        }
    }

    static async updateProject(projectId: string, projectData: Partial<Projects>): Promise<Projects> {
        try {
            const project = await Projects.findOneBy({ id: projectId });
            if (!project) throw new NotFoundException("Projeto não encontrado.");

            Object.assign(project, projectData);
            const updatedProject = await Projects.save(project);
            return updatedProject;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao atualizar projeto.");
        }
    }

    static async deleteProject(projectId: string): Promise<void> {
        try {
            const result = await Projects.delete({ id: projectId });
            if (result.affected === 0) throw new NotFoundException("Projeto não encontrado.");
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao deletar projeto.");
        }
    }
}
