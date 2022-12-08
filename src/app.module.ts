import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        migrationsTableName: "migrations",
        autoLoadEntities: true,
        migrations: ["src/database/migrations/*.ts"],
        cli: {
          migrationsDir: "src/database/migrations"
        }
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
