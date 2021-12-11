import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from "typeorm";
import { Report } from "../reports/report.entity";

 @Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with Id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User with Id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User with Id', this.id);
  }
}