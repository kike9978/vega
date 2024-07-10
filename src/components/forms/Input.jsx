export default function Input({ name, type, label, required, disabled, onChange, value, checked }) {

    return (
        <label
            htmlFor=""
            className={`flex ${type === "checkbox" ? "" : "flex-col"} text-slate-700 ${disabled ? "disabled:text-slate-300 text-slate-400" : ""
                }`}
        >
            {label}
            {type === "checkbox" ? (
                <input
                    name={name}
                    type={type}
                    required={required}
                    disabled={disabled}
                    className="border rounded-sm px-2"
                    onChange={onChange}
                    checked={checked}
                />
            ) : (
                <input
                    name={name}
                    type={type ? type : "text"}
                    required={required}
                    disabled={disabled}
                    className="border rounded-sm px-2"
                    onChange={onChange}
                    value={value}
                />
            )}
        </label>
    )
}