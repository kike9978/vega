import Input from "./Input";


export default function CowForm({ onSubmit }) {
    return (
        <form
            action=""
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
                document.querySelector("dialog").close()
            }}>

            <Input name="cow" />
            <button type="button" onClick={() => document.querySelector("dialog").close()}>x</button>
            <button>Crear vaca</button>
        </form>
    )
}