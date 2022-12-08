import { DataSource } from "typeorm";
import {User} from "../entity/user.entity"
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 9999,
    username: 'postgres',
    password: 'postgres',
    database: 'wordle',
    entities: [User],
    synchronize: true,
    migrations: ["./src/migrations/*.ts"],
})