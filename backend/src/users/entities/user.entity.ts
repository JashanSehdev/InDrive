import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Ride } from "../../rides/entities/ride.entity.js";
import { Offer } from "../../offers/entities/offer.entity.js";

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

    @OneToMany(()=> Ride, (ride) => ride.passenger)
    rides : Relation<Ride[]>

    @OneToMany(()=> Ride, (ride) => ride.driver)
    drives : Relation<Ride[]>

    @OneToMany(() => Offer, (offer) => offer.driver)
    offers: Relation<Offer>
}