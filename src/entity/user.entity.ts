import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm';
import {Game} from './game.entity '

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  token: string;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @OneToMany(() => Game, (game) => game.user)
    games: Game[]
}