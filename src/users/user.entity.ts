import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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