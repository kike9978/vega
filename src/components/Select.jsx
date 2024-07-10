export default function Select({ name, label, defaultOption, options }) {
    return (
        <label htmlFor={name} className="flex flex-col gap-2 text-slate-700">
            {label}
            <select name={name} id={name} className="border px-2 h-8" >
                <option value={defaultOption.value}>{defaultOption.text}</option>
                {options.map(option => {
                    return (
                        <option value={option.value} key={option.value}>{option.text}</option>
                    )
                })}
            </select>
        </label>
    )
}