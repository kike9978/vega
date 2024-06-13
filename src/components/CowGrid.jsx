import CowCard from "./CowCard";

export default function CowGrid({ cows }) {

    return (
        cows && cows.map(cow => {
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
        })
    )

}