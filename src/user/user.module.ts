import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AddressService } from 'src/address/address.service';
import { AddressModule } from 'src/address/address.module';
import { Address } from 'src/address/entities/address.entity';
import { AutomobileService } from 'src/automobile/automobile.service';
import { AutomobileModule } from 'src/automobile/automobile.module';
import { Automobile } from 'src/automobile/entities/automobile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([Automobile]),
    AddressModule,
    AutomobileModule
  ],
  controllers: [UserController],
  providers: [UserService, AddressService, AutomobileService],
})
export class UserModule {}
