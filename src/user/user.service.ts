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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    console.log(data);
    try {
      if (await this.verifyTelefoneExists({ telefone: data.telefone })) {
        throw new HttpException(
          { message: ['Telefone já cadastrado.'] },
          HttpStatus.CONFLICT,
        );
      }
      const attUser = { ...data, password: '123456' };
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
