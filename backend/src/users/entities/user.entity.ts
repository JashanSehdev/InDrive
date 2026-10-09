import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";

export enum Roles {
    passenger = "passenger",
    driver = 'driver'
}

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar'})
    username : string

    @Column({type : 'varchar'})
    email : string

    @Column({type : 'varchar'})
    password : string

    @Column({type : 'enum' ,  enum : Roles})
    role : Roles


}