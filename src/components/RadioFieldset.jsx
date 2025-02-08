import RadioButton from "./RadioButton";

export default function RadioFieldset({ legend, name, radios, required, error, value, onChange }) {
    return (
        <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-1">{legend}</legend>
            <div className="space-y-2">
                {radios.map(radio => (
                    <label key={radio.value} className="flex items-center">
                        <input
                            type="radio"
                            name={name}
                            value={radio.value}
                            checked={value === radio.value}
                            onChange={(e) => onChange(e.target.value)}
                            required={required}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{radio.label}</span>
                    </label>
                ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </fieldset>
    );
}