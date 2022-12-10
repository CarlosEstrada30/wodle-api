import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import {Game} from '../entity'

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  word: string;

  @OneToMany(() => Game, (game) => game.word)
  games: Game[];

}