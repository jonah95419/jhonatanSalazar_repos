import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn, BeforeInsert } from "typeorm";
import { Repository } from './repository.entity';

@Entity("Metrics")
export class Metrics {

  @PrimaryColumn()
  "id_repository": number

  @OneToOne(() => Repository, (repository) => repository.id_repository,  { cascade: true })
  @JoinColumn({ name: "id_repository" } )
  "repository": Repository

  @BeforeInsert()
  newid() { this.id_repository = this.repository.id_repository; }

  @Column({ type: "integer" })
  "coverage": number;

  @Column({ type: "integer" })
  "bugs": number;

  @Column({ type: "integer" })
  "status": number;

  @Column({ type: "integer" })
  "hotspot": number;

  @Column({ type: "integer" })
  "code_smells": number;
}
