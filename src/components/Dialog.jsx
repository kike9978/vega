export default function Dialog({ children, title }) {
    return (
        <dialog className="rounded-lg">
            <h2>{title}</h2>
            {children}
        </dialog>
    )
}