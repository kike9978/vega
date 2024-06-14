export default function Button({ text, onClick, type, severity }) {
    return (
        <button className={`${severity ? "" : "bg-blue-500 text-white"} rounded-md px-2`} onClick={onClick} type={type ? type : ""}>{text}</button>
    )
}