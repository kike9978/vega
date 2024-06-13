import Input from "./Input";


export default function CowForm({ onSubmit }) {
    return (
        <form
            className="flex flex-col"
            action=""
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
                document.querySelector("dialog").close()
            }}>

            <Input name="cow" label="vaca" />
            <Input name="id" label="Arete" />
            <Input name="birthDate" label="Fecha de nacimiento" type="date" />
            <Input name="opp" label="Opp" />
            <Input name="mark" label="Fierro" />
            <Input name="isRegistered" type="checkbox" label="Registrado" />



            <button type="button" onClick={() => document.querySelector("dialog").close()}>x</button>
            <button>Crear vaca</button>
        </form>
    )
}
