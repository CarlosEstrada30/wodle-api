import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { CronService } from './services/cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Game, UserWord, Word} from '../entity'
import {UsersModule} from "../users/users.module"
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, UserWord, Word]),
    UsersModule,
    ScheduleModule.forRoot()
  ],
  controllers: [GameController],
  providers: [GameService, CronService]
})
export class GameModule {}
