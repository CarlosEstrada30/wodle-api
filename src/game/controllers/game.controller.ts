import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import {GameService} from 'src/game/services/game.service'
import { AuthGuard } from '@nestjs/passport';

@Controller('api/game')
export class GameController {
    constructor(private gameService: GameService){}

    @Get()
    getAll(){
        return this.gameService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/start")
    create(@Req() request: any){
        return this.gameService.create(request.user.token)
    }

    @Post("/user-word")
    userWord(@Body() body: any, @Req() request: any){
        return this.gameService.userWord(body, request.user.token)
    }


}
