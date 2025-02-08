import CowCard from "./CowCard";

export default function CowGrid({ cows }) {


    return (


        <main>
            <div className="flex justify-around mb-4 text-gray-700">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-lg font-semibold">
                        🏠 Ganado en Tacahuite: <span className="text-blue-600">{cows.filter(cow => cow.upp === "tacahuite").length}</span>
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-lg font-semibold">
                        🏡 Ganado en El Jobo: <span className="text-blue-600">{cows.filter(cow => cow.upp === "elJobo").length}</span>
                    </p>
                </div>
            </div>
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