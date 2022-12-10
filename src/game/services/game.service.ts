import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User, UserWord, Word } from 'src/entity';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
        @InjectRepository(UserWord) private readonly userWordRepository: Repository<UserWord>,
        @InjectRepository(Word) private readonly wordRepository: Repository<Word>,
        private userService: UsersService,
      ) {}
          
      findAll(){
        return this.gameRepository.find()
      }

      topUsers(){
        return this.gameRepository.find()

      }
          
      findUsersById(id: number) {
        return this.gameRepository.findOneBy({id: id});
      }

      async create(){
        let word = await this.getRandomWord()
        let new_word = new Word;
        new_word.word = word;
        return this.wordRepository.save(new_word)
      }

      async userWord(body: any, user_token){
        const user = await this.userService.findUsersByToken(user_token);
        // get the last game of user
        const play_word = await this.wordRepository.findOne({where: {}, order: { id: 'DESC' }}) 
        try {
          var game = await this.gameRepository.findOneOrFail({where: {userId: user.id, word: play_word}, relations: ['word']})
        } catch (EntityNotFoundError) { 
          game = await this.gameRepository.create({user: user, word: play_word})
          await this.gameRepository.save(game)
          game = await this.gameRepository.findOneOrFail({where: {userId: user.id, word: play_word}, relations: ['word']})
        }
        let result: any = []
        let win: boolean = true
        if (game.count < 5 && game.win == false){
            for(let letter of body.user_word){
                let value = 3
                if (game.word.word.includes(letter)){
                    if (game.word.word.indexOf(letter) == body.user_word.indexOf(letter)){
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
            let user_word = new UserWord()
            user_word.word = body.user_word
            user_word.game = game
            this.userWordRepository.save(user_word)
        }
        return {count: game.count, win: game.win, result: result}
      }

     async getRandomWord() {
        const fs = require('fs');
        const path = require("path");
        try {
        const data = await fs.readFileSync(path.resolve(__dirname, "../../../words.txt"), 'utf8');
        // mess up the dictionary of words
        const array_words = data.split(/\r?\n/).sort(await function() {return Math.random() - 0.5});
        for (const line of array_words) {
            if (line.length == 5){
                const exist = await this.wordRepository.findOne({where: {word: line}})
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
