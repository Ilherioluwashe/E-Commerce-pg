import { IsEmail, Length, IsEnum } from "class-validator";
import bcrypt from "bcrypt";
import { BeforeInsert, Column, Entity } from "typeorm";
import Model from "./model";

@Entity("users")
export class User extends Model {
  @Column()
  @Length(3, 50)
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Length(6, 50)
  password: string;

  @Column({
    type: "enum",
    enum: ["user", "admin"],
    default: "user",
  })
  @IsEnum(["user", "admin", undefined])
  role: string;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
