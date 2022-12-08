import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Game } from 'src/entity';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        private userService: UsersService
      ) {}
          
      findAll(){
        return this.gameRepository.find()
      }
          
      findUsersById(id: number) {
        return this.gameRepository.findOneBy({id: id});
      }

      async create(body: any){
        console.log(body)
        const user = await this.userService.findUsersByEmail(body.email);
        let game = new Game;
        game.word = "newword";
        game.user = user;
        return this.gameRepository.save(game)
      }

      async userWord(body: any){
        const user = await this.userService.findUsersByEmail(body.email);
        const game = await this.gameRepository.findOne({where: {userId: user.id}, order: { id: 'DESC' }})
        let result: any = []
        let win: boolean = true
        if (game.count < 5 && game.win == false){
            for(let letter of body.user_word){
                let value = 3
                if (game.word.includes(letter)){
                    if (game.word.indexOf(letter) == body.user_word.indexOf(letter)){
                        value = 1
                    }else{
                        value = 2
                        win = false
                    }
                }else{
                    win = false
                }
                result.push({
                    letter: letter,
                    value: value
                })
            }
            game.count += 1;
            game.win = win
            this.gameRepository.save(game)
        }
        return {count: game.count, win: game.win, result: result}
      }
}
