import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto, request: Request, file: any) {
    try {
      if (await this.verifyTelefoneExists({ telefone: data.telefone })) {
        throw new HttpException(
          { message: ['Telefone já cadastrado.'] },
          HttpStatus.CONFLICT,
        );
      }
      const baseUrl = `${request.protocol}://${request.get('host')}/`;
      const uploadedFile = await this.uploadFile(file);
      const attUser = { ...data, fotoDocumento: baseUrl + uploadedFile };
      const user = this.userRepository.create(attUser);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.response && error.status) {
        throw new HttpException(
          { message: error.response.message },
          error.status,
        );
      } else {
        throw new HttpException(
          { message: ['Erro ao criar usuário.'] },
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

  async verifyTelefoneExists(conditions: FindOptionsWhere<User>) {
    try {
      return await this.userRepository.findOneOrFail({
        where: conditions,
      });
    } catch (error) {
      return null;
    }
  }

  async findAll() {
    return await this.userRepository.find({
      where: { ativo: 1 },
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<User>,
    options?: FindOneOptions<User>,
  ) {
    try {
      return await this.userRepository.findOneOrFail({
        where: conditions,
        ...options,
        relations: ['addresses', 'automobiles'],
      });
    } catch (error) {
      throw new NotFoundException(error.error);
    }
  }
}
