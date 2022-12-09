import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
      ) {}

      async getUser({ username , password }): Promise<User | undefined> {
        return this.userRepository.findOneBy({username: username,
          password: password,
        });
      }
          
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

      async findUsersByToken(token: string) {
        if(token){
          return await this.userRepository.findOneBy({token: token});
        }
        return null
      }
}
