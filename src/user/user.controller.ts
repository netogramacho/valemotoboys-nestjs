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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AddressService } from 'src/address/address.service';
import { AutomobileService } from 'src/automobile/automobile.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
    private readonly automobileService: AutomobileService,
  ) {}

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
    FileFieldsInterceptor([
      { name: 'fotoDocumento', maxCount: 1 },
      { name: 'comprovanteEndereco', maxCount: 1 },
    ]),
  )
  async createUser(
    @UploadedFiles() files: Express.Multer.File,
    @Body() { dadosPessoais, endereco, automovel }: any,
    @Req() request: Request,
  ) {
    dadosPessoais = JSON.parse(dadosPessoais);
    endereco = JSON.parse(endereco);
    automovel = JSON.parse(automovel);
    console.log(automovel)
    const newUser: any = await this.userService.create(
      dadosPessoais,
      request,
      files['fotoDocumento'],
    );
    const newAddress = await this.addressService.create(
      endereco,
      newUser,
      request,
      files['comprovanteEndereco'],
    );
    const newAutomobile = await this.automobileService.create(
      automovel,
      newUser
    );
    newUser.addresses = [newAddress];
    newUser.automobiles = [newAutomobile];
    return newUser;
    // const newAutomobile = '';
  }
}
