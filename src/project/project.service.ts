import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>
    ) { }

    async create(project): Promise<Project> {
        return await this.projectRepository.save(project);
    }

    async getAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    async getOne(id): Promise<Project> {
        return await this.projectRepository.findOne(id);
    }


}
