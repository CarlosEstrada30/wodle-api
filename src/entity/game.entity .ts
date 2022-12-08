import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {User} from './user.entity'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  word: string;

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

  

}