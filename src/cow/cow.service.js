import Cow from "./cow.model"
import data from "../data/data"


export default class CowService {
    constructor() {
        const initialCows = JSON.parse(localStorage.getItem("cows")) ? JSON.parse(localStorage.getItem("cows")) : []
        this.cows = initialCows.map(cow => new Cow(cow.name, cow.id, new Date(cow.birthDate), cow.upp, cow.mark, cow.isRegistered, cow.breed, cow.sex, cow.hasEaring, cow.earingId))
    }

    createCow(cow) {
        const cows = this.getCows();
        const updatedCows = [...cows, cow];
        localStorage.setItem('cows', JSON.stringify(updatedCows));
    }

    getCows() {
        const cows = localStorage.getItem('cows');
        if (!cows) return [];
        return JSON.parse(cows).map(cow => ({
            ...cow,
            birthDate: new Date(cow.birthDate)
        }));
    }

    setCows(cows) {
        localStorage.setItem('cows', JSON.stringify(cows));
    }
}