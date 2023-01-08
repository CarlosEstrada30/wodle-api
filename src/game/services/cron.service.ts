import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule"
import { GameService } from "./game.service";

@Injectable()
export class CronService{
    constructor(private gameService: GameService){}

    @Cron('* * * * *')
    CreateWord(){
        console.log("Creating word ...")
        this.gameService.create()
        console.log("Finish creating word ...")
    }
}