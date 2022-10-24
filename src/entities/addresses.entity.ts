import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("addresses")
export class Addresses {
  @PrimaryColumn()
  id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
