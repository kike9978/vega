import CowCard from "./CowCard";

export default function CowGrid({ cows }) {


    return (


        <main>
            <p>Ganado en Tacahuite: {cows.filter(cow => cow.upp === "tacahuite").length}</p>
            <p>Ganado en El Jobo: {cows.filter(cow => cow.upp === "elJobo").length}</p>
            <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-4">
                {cows && cows.map(cow => {
                    return (
                        <CowCard
                            key={cow.id}
                            id={cow.id}
                            name={cow.name}
                            birthDate={cow.birthDate}
                            isRegistered={cow.isRegistered}
                            mark={cow.mark}
                            breed={cow.breed}
                            upp={cow.upp}
                            sex={cow.sex}
                            earingId={cow.earingId}
                            hasEaring={cow.hasEaring}
                        />
                    )
                })}
            </div>
        </main>
    )

}