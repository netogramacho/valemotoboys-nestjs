import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    return this.userService.findOneOrFail({ id });
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'fotoDocumento', maxCount: 1 },
        { name: 'comprovanteEndereco', maxCount: 1 },
      ]
    ),
  )
  createUser(
    @UploadedFiles() files: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
    @Req() request:Request
  ) {
    return this.userService.create(createUserDto, request, files["fotoDocumento"]);
  }
}
