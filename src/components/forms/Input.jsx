export default function Input({ name, type, label, required, disabled, onChange, value, checked }) {

    return (
        <label

            className={`flex text-slate-700 gap-2 ${type === "checkbox" ? "" : "flex-col"}  ${disabled ? "disabled:text-slate-300 text-slate-400" : ""}`}
        >
            {type === "checkbox" ? (
                <>
                    <input
                        name={name}
                        type={type}
                        required={required}
                        disabled={disabled}
                        onChange={onChange}
                        checked={checked}
                    />
                    {label}
                </>
            ) : (
                <>
                    {label}
                    <input
                        name={name}
                        type={type ? type : "text"}
                        required={required}
                        disabled={disabled}
                        className="border rounded-sm px-2 h-8"
                        onChange={onChange}
                        value={value}

                    />
                </>
            )}
        </label>
    )
}