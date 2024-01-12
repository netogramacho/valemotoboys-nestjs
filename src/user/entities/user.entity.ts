import { IsNotEmpty } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { Automobile } from 'src/automobile/entities/automobile.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ unique: true, nullable: false })
  telefone: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  telefoneParente: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  cnh: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  adm: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  indicacao: string;

  @IsNotEmpty()
  @Column()
  fotoDocumento: string;

  @IsNotEmpty()
  @Column({ default: 1 })
  ativo: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Automobile, (automobile) => automobile.user)
  automobiles: Address[];
}
