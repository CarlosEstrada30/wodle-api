import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import {GameService} from 'src/game/services/game.service'
import { AuthGuard } from '@nestjs/passport';

@Controller('api/game')
export class GameController {
    constructor(private gameService: GameService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(){
        return this.gameService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/start")
    create(){
        return this.gameService.create()
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/play")
    userWord(@Body() body: any, @Req() request: any){
        return this.gameService.userWord(body, request.user.token)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("/users")
    topUsers(){
        return this.gameService.userWord()
    }


}
