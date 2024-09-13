import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "./base.model";
import { Tasks } from "./task.model";

@Entity()
export class Projects extends BaseModel {
    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(() => Tasks, (task) => task.project)
    tasks: Tasks[];
}
