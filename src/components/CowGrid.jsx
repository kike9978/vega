import CowCard from "./CowCard";
import PropTypes from 'prop-types';

export default function CowGrid({ cows, selectedCows, onSelect, getMenuOptions }) {
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
                {cows && cows.map(cow => (
                    <CowCard
                        key={cow.id}
                        {...cow}
                        selected={selectedCows.has(cow.id)}
                        onSelect={onSelect}
                        getMenuOptions={getMenuOptions}
                    />
                ))}
            </div>
        </main>
    );
}

CowGrid.propTypes = {
    cows: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedCows: PropTypes.instanceOf(Set).isRequired,
    onSelect: PropTypes.func.isRequired,
    getMenuOptions: PropTypes.func.isRequired,
};