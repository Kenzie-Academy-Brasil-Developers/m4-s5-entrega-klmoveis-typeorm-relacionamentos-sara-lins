import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class SchedulesUsers {
  @PrimaryColumn()
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, (Property) => Property)
  property: Properties;

  @ManyToOne(() => User, (User) => User)
  user: User;
}
