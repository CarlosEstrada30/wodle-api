import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Game} from '../entity'

@Entity()
export class UserWord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  word: string;

  @Column({
    nullable: false,
  })
  record: number

  @Column({ nullable: false })
  gameId: number;

  @ManyToOne(() => Game, (game) => game.user_words)
  game: Game;

}