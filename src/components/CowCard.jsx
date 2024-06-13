export default function CowCard({ name, id, upp, mark, isRegistered, birthDate, breed }) {
    return (
        <article className="rounded-lg border border-black border-solid">
            <h2>{name}</h2>
            <h3>{id}</h3>
            <h3>{upp}</h3>
            {isRegistered ? "Está registrado" : "No está registrado"}
            <p>{birthDate}</p>
            <p>{mark}</p>
            <p>{breed}</p>

        </article>
    )
}