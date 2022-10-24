import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Properties } from "./properties.entity";

@Entity("categories")
export class Categories {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Properties, (property) => property.category)
  properties: Properties[];
}
