import { Column, Entity, PrimaryGeneratedColumn,ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import {User, UserWord, Word} from '../entity'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: false
  })
  win: boolean;

  @Column({
    nullable: false,
    default: 0
  })
  count: number

  @Column({ nullable: false })
    userId: number;

  @ManyToOne(() => User, (user) => user.games)
  user: User;

  @OneToMany(() => UserWord, (user_word) => user_word.game)
  user_words: UserWord[]

  @ManyToOne(() => Word, (word) => word.games)
  @JoinColumn()
  word: Word
  

}