export default function RadioButton({ name, value, label }) {
    return (
        <label htmlFor={value}>
            <input type="radio" name={name} value={value} id={value} />
            {label}
        </label>
    )
}