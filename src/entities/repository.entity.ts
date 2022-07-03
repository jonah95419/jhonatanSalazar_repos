import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tribe } from "./tribe.entity";

@Entity("Repository")
export class Repository {

  @PrimaryGeneratedColumn("increment")
  "id_repository": number;

  @ManyToOne(() => Tribe , { cascade: true, nullable: false })
  @JoinColumn({name: 'id_tribe'})
  "tribe": Tribe

  @Column({
    length: 50,
    type: "char",
  })
  "name": string;

  @Column({
    length: 1,
    type: "char",
  })
  "state": string;

  @Column({
    type: "timestamp",
  })
  "create_time": string;

  @Column({
    length: 1,
    type: "char",
  })
  "status": string;
}
