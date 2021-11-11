import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAll() {
        return await this.userService.getAll()
    }

    @Get('utype')
    async getUtype() {
        return this.userService.getUtype();
    }

    @Post('reg')
    async create(@Body('user') user) {
        console.log('-------------');
        console.log(Body);
        return await this.userService.createUser(user);
    }



    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return await this.userService.login(email, password);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        console.log('id  ' + id);
        return await this.userService.get(id);
    }


}
