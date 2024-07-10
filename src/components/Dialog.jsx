import Button from "./Button";
export default function Dialog({ children, title }) {
    return (
        <dialog className="rounded-lg">
            <div className="flex justify-between px-5 py-3 border-b border-solid border-b-indigo-100 items-center">
                <h2 className="font-bold">{title}</h2>
                <Button
                    text={"✖️"}
                    onClick={() => document.querySelector("dialog").close()}
                    type={"button"}
                    severity={"none"} />
            </div>
            {children}
        </dialog>
    )
}