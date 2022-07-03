import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Metrics } from "./metrics.entity";
import { Tribe } from "./tribe.entity";

@Entity("Repository")
export class Repository {

  @PrimaryGeneratedColumn("increment")
  "id_repository": number;

  @ManyToOne(() => Tribe , { eager: true, nullable: false })
  @JoinColumn({name: 'id_tribe'})
  "tribe": Tribe

  @OneToOne(() => Metrics, (metrics) => metrics.repository,  { eager: true })
  "metrics": Metrics[]

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
  "create_time": Date;

  @Column({
    length: 1,
    type: "char",
  })
  "status": string;
}
