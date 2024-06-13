export default function Input({ name }) {
    return (
        <label htmlFor="">
            {name}
            <input type="text" name={name} />
        </label>
    )
}