export default function Select({ name, label, defaultOption, options }) {
    return (
        <label htmlFor={name}>
            {label}
            <select name={name} id="">
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