import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity("Tribe")
export class Tribe {
  @PrimaryGeneratedColumn("increment")
  "id_tribe": number;

  @ManyToOne(() => Organization, { cascade: true, nullable: false })
  @JoinColumn({name: 'id_organization'})
  "organization": Organization

  @Column({
    length: 50,
    type: "char",
  })
  "name": string;

  @Column({ type: "integer" })
  "status": number;
}
