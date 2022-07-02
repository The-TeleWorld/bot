import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator_id: number;

  @Column()
  creator_username: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  serializedContentMessage: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
