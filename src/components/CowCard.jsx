import cowImage from "../assets/imgs/vaca-test.webp"
import Chip from "./Chip"

export default function CowCard({ name, id, upp, mark, isRegistered, birthDate, breed }) {
    return (
        <article className="rounded-lg border border-black border-solid overflow-hidden">
            <img src={cowImage} alt="Foto de vaca" />
            <h2 className="text-xl font-bold">{name}</h2>
            <h3>{id}</h3>
            <Chip text={upp} />
            {isRegistered ? "🟢" : "🔴"}
            <p>{birthDate}</p>
            <p>{mark}</p>
            <p>{breed}</p>

        </article>
    )
}