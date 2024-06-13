import CowCard from "./CowCard";

export default function CowGrid({ cows }) {

    return (
        <div className="grid grid-cols-4 gap-2">
            {cows && cows.map(cow => {
                return (
                    <CowCard
                        key={cow.id}
                        id={cow.id}
                        name={cow.name}
                        birthDate={cow.birthDate}
                        isRegistered={cow.isRegistered}
                        mark={cow.mark}
                        opp={cow.opp} />
                )
            })}
        </div>
    )

}