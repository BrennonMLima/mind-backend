import { NotFoundException, InternalException } from "../exceptions";
import { Tasks } from "../models/task.model";
import { Projects } from "../models/project.model";
import { Users } from "../models/user.model";

export class TaskService {
    static async getAllTasks(): Promise<Tasks[]> {
        try {
            const tasks = await Tasks.find();
            if (tasks.length === 0) return [];
            return tasks;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao consultar tarefas.");
        }
    }

    static async getTaskById(taskId: string): Promise<Tasks> {
        try {
            const task = await Tasks.findOneBy({ id: taskId });
            if (!task) throw new NotFoundException("Tarefa não encontrada.");
            return task;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao consultar tarefa.");
        }
    }

    static async getTasksByProjectId(projectId: string): Promise<Tasks[]> {
        try {
            const project = await Projects.findOneBy({ id: projectId });
            if (!project) throw new NotFoundException("Projeto não encontrado.");

            const tasks = await Tasks.find({
                where: { project: { id: projectId } },
                relations: ["user"],
            });

            if (tasks.length === 0) return [];

            return tasks;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao consultar tarefas do projeto.");
        }
    }

    static async createTask(userId: string, projectId: string, taskData: Partial<Tasks>): Promise<Tasks> {
        try {
            const user = await Users.findOneBy({ id: userId });
            const project = await Projects.findOneBy({ id: projectId });
            if (!user || !project) throw new NotFoundException("Usuário ou Projeto não encontrado.");

            const task = new Tasks();
            task.user = user;
            task.project = project;
            Object.assign(task, taskData);

            const newTask = await Tasks.save(task);
            return newTask;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao criar tarefa.");
        }
    }

    static async updateTask(taskId: string, taskData: Partial<Tasks>): Promise<Tasks> {
        try {
            const task = await Tasks.findOneBy({ id: taskId });
            if (!task) throw new NotFoundException("Tarefa não encontrada.");

            Object.assign(task, taskData);
            const updatedTask = await Tasks.save(task);
            return updatedTask;
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao atualizar tarefa.");
        }
    }

    static async deleteTask(taskId: string): Promise<void> {
        try {
            const result = await Tasks.delete({ id: taskId });
            if (result.affected === 0) throw new NotFoundException("Tarefa não encontrada.");
        } catch (error) {
            console.error(error);
            throw new InternalException("Erro ao deletar tarefa.");
        }
    }
}
