import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('get')
    async getAll() {
        return await this.userService.getAll()
    }

    @Get('utype')
    async getUtype() {
        return this.userService.getUtype();
    }

    @Post('reg')
    async create(@Body('user') user) {
        return await this.userService.createUser(user);
    }


    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        console.log(email, password);
        return await this.userService.login(email, password);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return await this.userService.get(id);
    }

    @Get('privilage/:id')
    async getPrivilage(@Param('id') id: number) {
        return await this.userService.getPrivilages(id);
    }


}
