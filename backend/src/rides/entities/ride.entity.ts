import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from "typeorm";
import { Offer } from "../../offers/entities/offer.entity.js";
import { User } from "../../users/entities/user.entity.js";


type Location = {
    location : string,
    latitude : number,
    longitude : number
}

export enum CabType {
    ECONOMY = 'economy',
    COMFORT = 'comfort',
    XL = 'xl'
}

export enum Status {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    STARTED = 'started',
    COMPLETED = 'completed'
}

@Entity('Ride')
export class Ride {
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer'})
    passengerId: number

    @Column({type : 'integer', nullable : true})
    driverId : number

    @Column({type : 'jsonb'})
    pickup : Location

    @Column({type : 'jsonb'})
    drop : Location

    @Column({type : 'integer'})
    price : number

    @Column({type : 'enum', enum : CabType})
    cab_type : CabType

    @Column ({type : 'enum', enum : Status, default : Status.PENDING})
    status : Status

    @OneToMany(() => Offer, (offer) => offer.rideId)
    offers : Relation<Offer[]>

    @ManyToOne(() => User, (user) => user.rides)
    passenger: Relation<User>

    @ManyToOne(() => User, (user) => user.drives)
    @JoinColumn({name : 'driverId'})
    driver: Relation<User>

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}

