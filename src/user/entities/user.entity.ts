import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '80' }) //DB에만 저장하기 위해 사용
  password: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: '50' })
  email: string;
  @Field(() => String)
  @Column({ type: 'varchar', length: '50' })
  name: string;

  @Field(() => Date)
  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
