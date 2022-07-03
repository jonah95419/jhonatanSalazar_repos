import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tribe } from "./tribe.entity";

@Entity("Organization")
export class Organization {
  @PrimaryGeneratedColumn("increment")
  "id_organization": number;

  @Column({
    length: 50,
    type: "char",
  })
  "name": string;

  @Column({ type: "integer" })
  "status": number;

  @OneToMany(() => Tribe, (tribe) => tribe.organization )
  "tribu": Tribe[]
}
