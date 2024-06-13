import Input from "./Input";


export default function CowForm({ onSubmit }) {

    return (
        <form
            className="flex flex-col"
            action=""
            onSubmit={(e) => {
                e.preventDefault()
                const dialog = document.querySelector("dialog")
                const form = e.target

                const formData = new FormData(form)
                const formObj = Object.fromEntries(formData.entries())
                console.log(formObj)

                onSubmit(formObj)
                form.reset()
                dialog.close()
            }}>

            <Input name="name" label="Vaca" />
            <Input name="id" label="Arete" />
            <Input name="birthDate" label="Fecha de nacimiento" type="date" />
            <Input name="upp" label="Upp" />
            <Input name="mark" label="Fierro" />

            <label htmlFor="">
                Cruza
                <select name="breed" id="breed">
                    <option value="ill">Ill</option>
                    <option value="orr">Orr</option>
                    <option value="mich">Mich</option>
                </select>
            </label>
            <Input name="isRegistered" type="checkbox" label="Registrado" />



            <button type="button" onClick={() => document.querySelector("dialog").close()}>x</button>
            <button>Crear vaca</button>
        </form>
    )
}
