import { Module } from '@nestjs/common';
import { GameController } from './controllers/game/game.controller';
import { GameService } from './services/game/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Game} from '../entity'
import {UsersModule} from "../users/users.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    UsersModule
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
