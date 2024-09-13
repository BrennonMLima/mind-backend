import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./base.model";
import { Users } from "./user.model";
import { Projects } from "./project.model";

@Entity()
export class Tasks extends BaseModel {
    @Column()
    name: string;

    @Column("text")
    description: string;

    @Column({ default: "Pendente" })
    status: string;

    @Column({ type: "date", nullable: true })
    dueDate: Date;

    @ManyToOne(() => Users, (user) => user.id, { nullable: true })
    user: Users;

    @ManyToOne(() => Projects, (project) => project.tasks, { onDelete: "CASCADE" })
    project: Projects;
}
