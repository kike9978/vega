import { useState } from "react";
import Button from "../Button";
import RadioFieldset from "../RadioFieldset";
import Select from "../Select";
import Input from "./Input";


export default function CowForm({ onSubmit }) {
    const [isCowRegistered, setIsCowRegistered] = useState(false)
    const [earingIdValue, setEaringIdValue] = useState("")
    const [hasEaringValue, setHasEaringValue] = useState(true)


    function resetForm() {
        const form = document.querySelector("dialog form")
        form.reset()
        setIsCowRegistered(false)
        setEaringIdValue("")
    }

    return (
        <form
            className="flex flex-col gap-4 md:w-80 m-5"
            action=""
            onSubmit={(e) => {
                e.preventDefault()
                const dialog = document.querySelector("dialog")
                const form = e.target

                const formData = new FormData(form)
                const formObj = Object.fromEntries(formData.entries())
                console.log(formObj)

                onSubmit(formObj)
                resetForm()
                dialog.close()
            }}>

            <Input name="name" label="Nombre" required={true} />
            <Input
                name="isRegistered"
                type="checkbox"
                label="Está registrado"
                checked={isCowRegistered}
                onChange={(e) => {
                    setIsCowRegistered(e.target.checked)
                }} />
            <Input name="earingId" label="Código de arete" required={isCowRegistered} disabled={!isCowRegistered} value={earingIdValue} onChange={(e) => setEaringIdValue(e.target.value)} />
            <Input
                disabled={!isCowRegistered}
                name="hasEaring"
                type="checkbox"
                label="Tiene arete"
                checked={hasEaringValue}
                onChange={(e) => setHasEaringValue(e.target.checked)}
            />
            <Input name="birthDate" label="Fecha de nacimiento" type="date" />

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

            <div className="flex justify-between">
                <Select
                    defaultOption={{ value: "tacahuite", text: "Tacahuite" }}
                    label="UPP"
                    name="upp"
                    options={[
                        {
                            value: "elJobo",
                            text: "El Jobo"
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
            </div>




            <div className="flex justify-between">
                <Button
                    text={"Cancel"}
                    onClick={() => {

                        resetForm()
                        document.querySelector("dialog").close()
                    }
                    }
                    type={"button"}
                    severity={"none"} />
                <Button text={"Crear vaca"} />
            </div>
        </form>
    )
}
