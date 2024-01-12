import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';

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
      ],
      {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, callback) => {
            const bytes = randomBytes(10);
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${bytes.toString('hex')}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      },
    ),
  )
  createUser(
    @UploadedFiles() files: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log('file', files);
    return 'teste';
    return this.userService.create(createUserDto);
  }
}
