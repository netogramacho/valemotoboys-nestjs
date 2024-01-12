import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get()
    getUsers() {
        return `teste`;
    }

    @Get(':id')
    getUsersById(@Param('id') id: string) {
        return `testando id: ${id}`;
    }
}
