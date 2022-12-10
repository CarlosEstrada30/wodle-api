import { DataSource } from "typeorm";
import {User, Game, UserWord, Word} from "../entity"
import { ConfigService } from "@nestjs/config";

require('dotenv').config()
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Game, UserWord, Word],
    synchronize: true,
    migrations: ["./src/migrations/*.ts"],
})