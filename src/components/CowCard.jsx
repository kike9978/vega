export default function CowCard({ name, id, opp, mark, isRegistered, birthDate }) {
    return (
        <article className="rounded-lg border border-black border-solid">
            <h2>{name}</h2>
            <h3>{id}</h3>
            <h3>{opp}</h3>
            {isRegistered ? "Está registrado" : "No está registrado"}
            <p>{birthDate}</p>
            <p>{mark}</p>

        </article>
    )
}