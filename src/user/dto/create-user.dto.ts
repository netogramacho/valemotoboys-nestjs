import { IsNotEmpty } from "class-validator";


export class CreateUserDto {
  
    @IsNotEmpty()
    nome: string;
  
    @IsNotEmpty()
    telefone: string;
  
    @IsNotEmpty()
    telefoneParente: string;
  
    @IsNotEmpty()
    cnh: string;
  
    @IsNotEmpty()
    adm: string;
  
    @IsNotEmpty()
    indicacao: string;
}
