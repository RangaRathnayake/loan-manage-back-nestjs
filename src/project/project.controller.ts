import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(
        private projectService: ProjectService
    ) { }

    @Post()
    async create(@Body('project') project) {
        return await this.projectService.create(project);
    }

    @Get()
    async getAll() {
        return await this.projectService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id) {
        return await this.projectService.getOne(id);
    }


}
