export default function Dialog({ children, open }) {
    return (
        <dialog className="rounded-lg">
            {children}
        </dialog>
    )
}