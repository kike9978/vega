import Button from "../Button";
import RadioFieldset from "../RadioFieldset";
import Select from "../Select";
import Input from "./Input";


export default function CowForm({ onSubmit }) {

    return (
        <form
            className="flex flex-col gap-2 w-80 m-5"
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

            <Input name="name" label="Vaca" required={true} />
            <Input name="id" label="Arete" required={true} />
            <Input name="birthDate" label="Fecha de nacimiento" type="date" />

            <Select
                defaultOption={{ value: "tacahuite", text: "Tacahuite" }}
                label="Upp"
                name="upp"
                options={[
                    {
                        value: "otherUpp",
                        text: "Otro Upp"
                    },
                ]} />
            <Select
                defaultOption={{ value: "iL", text: "IL" }}
                label="Fierro"
                name="mark"
                options={[
                    {
                        value: "fM",
                        text: "FM"
                    },
                ]} />
            <Select
                defaultOption={{ value: "ill", text: "Ill" }}
                label="Cruza"
                name="breed"
                options={[
                    {
                        value: "orr",
                        text: "Orr"
                    },
                    {
                        value: "mich",
                        text: "Mich"
                    }
                ]} />


            <Input name="isRegistered" type="checkbox" label="Registrado" />
            <RadioFieldset
                legend={"Sexo"}
                name={"sex"}
                radios={[
                    {
                        value: "male",
                        label: "Macho"
                    },
                    {
                        value: "female",
                        label: "Hembra",
                    }
                ]}
            />

            <Button
                text={"✖️"}
                onClick={() => document.querySelector("dialog").close()}
                type={"button"}
                severity={"none"} />
            <Button text={"Crear vaca"} />
        </form>
    )
}
