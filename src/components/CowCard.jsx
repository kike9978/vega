import cowImage from "../assets/imgs/vaca-test.webp"
import Chip from "./Chip"
import { SEX_TEXT, UPP_TEXT, MARK_TEXT } from "../data/types"

export default function CowCard({ name, upp, mark, isRegistered, birthDate, breed, sex, earingId, hasEaring }) {

    const date = new Date()


    return (
        <article className="rounded-lg border border-black border-solid overflow-hidden">
            <img src={cowImage} alt="Foto de vaca" />
            <div className="px-2">
                <h2 className="text-xl font-bold text-center">{name}</h2>

                <div className="flex  justify-between">
                    <p>{date.getFullYear() - birthDate.getFullYear()} años</p>
                    <p>Fierro: {MARK_TEXT[mark]}</p>
                    <p>Cruza: {breed}</p>
                </div>
                <div className="flex gap-2">
                    <h3 className={`${!isRegistered && "text-red-500"}`}>Arete: {isRegistered ? earingId : "Sin registro"}</h3>
                    {!hasEaring && isRegistered && <p className="text-red-500">🚨 Sin arete 🚨</p>}
                </div>
                <Chip text={UPP_TEXT[upp]} />
                <p>{SEX_TEXT[sex]}</p>
            </div>

        </article>
    )
}