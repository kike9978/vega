export default function Input({ name, type, label, required }) {

    return (
        <label htmlFor="">
            {label}
            <input name={name} type={type ? type : "text"} />
        </label>
    )
}