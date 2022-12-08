import { Body, Controller, Get, Post } from '@nestjs/common';
import {GameService} from 'src/game/services/game/game.service'

@Controller('api/game')
export class GameController {
    constructor(private gameService: GameService){}

    @Get()
    getAll(){
        return this.gameService.findAll();
    }

    @Post("/start")
    create(@Body() body: any){
        return this.gameService.create(body)
    }

    @Post("/user-word")
    userWord(@Body() body: any){
        return this.gameService.userWord(body)
    }


}
