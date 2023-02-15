import { createHmac } from "crypto";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true, default: "" })
  phoneNumber!: string;

  @Column({ nullable: true, default: "" })
  profilePhoto!: string;

  @Column("text", { nullable: true, default: "" })
  bio!: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = createHmac("sha256", this.password).digest("hex");
  }
}
