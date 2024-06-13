export default function Input({ name, type, label, required }) {

    return (
        <label htmlFor="" className={`flex ${type === "checkbox" ? "" : "flex-col"} text-slate-700`}>
            {label}
            <input name={name} type={type ? type : "text"} required={required} className="border rounded-sm px-2" />
        </label>
    )
}