import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator_id: number;

  @Column({ nullable: true })
  subscriber_id: number;

  @Column()
  creator_public_key: string;

  @Column()
  creator_private_key: string;

  @Column({ nullable: true })
  subscriber_public_key: string;

  @Column({ nullable: true })
  subscriber_private_key: string;

  @Column('text')
  @Column({ nullable: true })
  state: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
