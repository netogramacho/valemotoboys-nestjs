import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('automobiles')
export class Automobile {
  @PrimaryGeneratedColumn()
  id: string;

  @IsNotEmpty()
  @Column()
  tipo: string;

  @IsNotEmpty()
  @Column()
  modelo: string;

  @IsNotEmpty()
  @Column()
  ano: number;

  @IsNotEmpty()
  @Column()
  placa: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
  
  @ManyToOne(() => User, user => user.automobiles)
  user: User;
}
