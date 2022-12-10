import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Game, UserWord, Word} from '../entity'
import {UsersModule} from "../users/users.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, UserWord, Word]),
    UsersModule
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
