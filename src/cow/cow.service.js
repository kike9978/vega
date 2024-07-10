import Cow from "./cow.model"
import data from "../data/data"


export default class CowService {
    constructor() {
        const initialCows = JSON.parse(localStorage.getItem("cows")) ? JSON.parse(localStorage.getItem("cows")) : []
        this.cows = initialCows.map(cow => new Cow(cow.name, cow.id, new Date(cow.birthDate), cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex, cow.hasEaring, cow.earingId))
    }

    createCow(cow) {
        console.log(cow)
        if (!this.cows) {
            this.cows = [new Cow(cow.name, cow.id, new Date(cow.birthDate), cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex, cow.hasEaring, cow.earingId)]
            return
        }
        this.cows = [...this.cows, new Cow(cow.name, cow.id, new Date(cow.birthDate), cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex, cow.hasEaring, cow.earingId)]
        localStorage.setItem("cows", JSON.stringify(this.cows))
    }

    getCows() {
        return this.cows
    }

}