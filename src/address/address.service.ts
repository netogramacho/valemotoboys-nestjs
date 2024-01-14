import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateAddressDto } from './dto/create-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import * as fs from 'fs/promises';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AddressService {
    constructor(
      @InjectRepository(Address)
      private addressRepository: Repository<Address>,
    ) {}
    
  async create(data: CreateAddressDto, user: User, request: Request, file: any) {
    try {
        
      const baseUrl = `${request.protocol}://${request.get('host')}/`;
      const uploadedFile = await this.uploadFile(file);
      const attAddress = { ...data, comprovanteEndereco: baseUrl + uploadedFile, user };
      const address = this.addressRepository.create(attAddress);
      return await this.addressRepository.save(address);
    } catch (error) {
      console.log(error);
      if (error.response && error.status) {
        throw new HttpException(
          { message: error.response.message },
          error.status,
        );
      } else {
        throw new HttpException(
          { message: ['Erro ao criar usuário.'], error },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  
  private async uploadFile(file: any) {
    // Seu código de lógica para processar os arquivos
    const bytes = randomBytes(10);
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);

    const ext = extname(file[0].originalname);
    const filename = `${bytes.toString('hex')}-${uniqueSuffix}${ext}`;
    const destination = `./files`;
    await fs.writeFile(`${destination}/${filename}`, file[0].buffer);
    return `files/${filename}`;
  }
}
