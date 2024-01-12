import { IsNotEmpty } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @IsNotEmpty()
  @Column()
  nome: string;

  @IsNotEmpty()
  @Column()
  telefone: string;

  @IsNotEmpty()
  @Column()
  telefoneParente: string;

  @IsNotEmpty()
  @Column()
  cnh: string;

  @IsNotEmpty()
  @Column()
  adm: string;

  @IsNotEmpty()
  @Column()
  indicacao: string;

  @IsNotEmpty()
  @Column()
  fotoDocumento: string;

  @IsNotEmpty()
  @Column()
  ativo: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
