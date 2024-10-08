import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "./base.model";


@Entity()
export class Users extends BaseModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "mediumblob", nullable: true })
  image: Buffer;

}