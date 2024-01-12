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


@Entity('addressess')
export class Address {

    @PrimaryGeneratedColumn()
    id: string;

    @IsNotEmpty()
    @Column()
    cep: string;

    @IsNotEmpty()
    @Column()
    bairro: string;

    @IsNotEmpty()
    @Column()
    cidade: string;

    @IsNotEmpty()
    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    comprovanteEndereco: string;

    @CreateDateColumn()
    createdAt: string;
  
    @UpdateDateColumn()
    updatedAt: string;
  
    @DeleteDateColumn()
    deletedAt: string;

    @ManyToOne(() => User, user => user.addresses)
    user: User;
}