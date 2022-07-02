import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrganizationDTO {
  @PrimaryGeneratedColumn("increment")
  "id": number;

  @Column({
    length: 50,
    type: "char",
  })
  "name": string;

  @Column({ type: "integer" })
  "status": number;
}
