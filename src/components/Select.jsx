export default function Select({ label, name, options, defaultOption, required, value, onChange }) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                name={name}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option value={defaultOption.value}>{defaultOption.text}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
}