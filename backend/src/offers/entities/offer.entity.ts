import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,type Relation, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity.js";
import { Ride } from "../../rides/entities/ride.entity.js";


@Entity('offer')
export class Offer {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer'})
    rideId : number

    @Column({type : 'integer'})
    driverId : number

    @Column({type : 'integer'})
    price : number

    @Column({type : 'varchar', nullable : true})
    message ?: string


    @ManyToOne(() => User, (user) => user.offers)
    @JoinColumn({name : 'driverId'})
    driver : Relation<User>

    @ManyToOne(() => Ride, (ride) => ride.offers, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'rideId'})
    Ride : Relation<Ride>

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}   
