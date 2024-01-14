import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Automobile } from './entities/automobile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutomobileService {
  constructor(
    @InjectRepository(Automobile)
    private automobileRepository: Repository<Automobile>,
  ) {}

  async create(data: any, user: User) {
    try {
      const attAutomobile = { ...data, user };
      console.log(attAutomobile)
      const automobile = this.automobileRepository.create(attAutomobile);
      return await this.automobileRepository.save(automobile);
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
}
