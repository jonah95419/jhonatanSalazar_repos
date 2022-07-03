import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
