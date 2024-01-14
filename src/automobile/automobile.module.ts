import { Module } from '@nestjs/common';
import { AutomobileController } from './automobile.controller';
import { AutomobileService } from './automobile.service';
import { Automobile } from './entities/automobile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Automobile])],
  controllers: [AutomobileController],
  providers: [AutomobileService],
  exports: [AutomobileService],
})
export class AutomobileModule {}
