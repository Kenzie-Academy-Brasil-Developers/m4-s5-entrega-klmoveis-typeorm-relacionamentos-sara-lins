import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { boolean } from "yup";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { SchedulesUsers } from "./schedulesUsersProperties.entity";

@Entity("properties")
export class Properties {
  @PrimaryColumn()
  id: string;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories, (Categories) => Categories)
  category: Categories;

  @OneToMany(() => SchedulesUsers, (schedule) => schedule.property)
  schedules: SchedulesUsers[];
}
