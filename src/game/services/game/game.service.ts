import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User, UserWord } from 'src/entity';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        @InjectRepository(UserWord) private readonly userWordRepository: Repository<UserWord>,
        private userService: UsersService,
      ) {}
          
      findAll(){
        return this.gameRepository.find()
      }
          
      findUsersById(id: number) {
        return this.gameRepository.findOneBy({id: id});
      }

      async create(user_token: any){
        const user = await this.userService.findUsersByToken(user_token);
        let word = await this.getRandomWord(user)
        let game = new Game;
        game.word = word;
        game.user = user;
        return this.gameRepository.save(game)
      }

      async userWord(body: any, user_token){
        const user = await this.userService.findUsersByToken(user_token);
        // get the last game of user
        const game = await this.gameRepository.findOne({where: {userId: user.id}, order: { id: 'DESC' }})
        let result: any = []
        let win: boolean = true
        if (game.count < 5 && game.win == false){
            let record = 0 
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
                record = record+value
            }
            game.count += 1;
            game.win = win
            this.gameRepository.save(game)
            let user_word = new UserWord()
            user_word.word = body.user_word
            user_word.game = game
            user_word.record = record
            this.userWordRepository.save(user_word)
        }
        return {count: game.count, win: game.win, result: result}
      }

     async getRandomWord(user: User) {
        const fs = require('fs');
        const path = require("path");
        try {
        const data = await fs.readFileSync(path.resolve(__dirname, "../../../../words.txt"), 'utf8');
        // mess up the dictionary of words
        const array_words = data.split(/\r?\n/).sort(await function() {return Math.random() - 0.5});
        for (const line of array_words) {
            if (line.length == 5){
                const exist = await this.gameRepository.findOne({where: {word: line, userId: user.id}})
                if(!exist){
                    return line
                }
            }
          }
        } catch (err) {
        console.error(err);
        }
        return null
      }
      
}
