import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
      ) {}
          
      findAll(){
        return this.userRepository.find()
      }
          
      findUsersById(id: number) {
        return this.userRepository.findOneBy({id: id});
      }

      create(body: any){
        const user = this.userRepository.create(body);
        return this.userRepository.save(user)
      }
}
