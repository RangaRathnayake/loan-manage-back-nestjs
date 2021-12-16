import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Privilage } from './privilage.entity';
import { User } from './user.entity';
import { Utype } from './utype.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Utype) private readonly utypeRepository: Repository<Utype>,
        @InjectRepository(Privilage) private readonly privilageRepository: Repository<Privilage>

    ) { }

    async createUser(user): Promise<User> {
        console.log(user);
        const ut = await this.utypeRepository.findOne(user.utype);
        user.utype = ut;
        return await this.userRepository.save(user);
    }

    async getUtype() {
        return this.utypeRepository.find({ where: { status: 1 } });
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find({ where: { status: 1 }, "relations": ["utype"] });
    }


    async get(id: number): Promise<User> {
        let u = await this.userRepository.findOne(id);
        delete u.passowrd;
        return u;
    }

    async login(email: string, passowrd: string): Promise<any> {
        try {
            let user = await this.userRepository.findOne({ email }, { "relations": ["utype"] });

            if (user && user.status == 1) {
                if (user.passowrd === passowrd) {
                    delete user.passowrd;
                    return user;
                } else {
                    return null;
                }
            } else { return null; }

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ email })
    }

    async getPrivilages(id: number): Promise<any> {
        return await this.utypeRepository.findOne(id, { "relations": ["privilages"] });
    }

    // testing comment
}
