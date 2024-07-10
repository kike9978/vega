import RadioButton from "./RadioButton";

export default function RadioFieldset({ legend, radios, name }) {
    console.log
    return (
        <fieldset>
            <legend>{legend}:</legend>
            <div className="flex justify-between">
                {radios.map(radio => {
                    return (<RadioButton name={name} label={radio.label} value={radio.value} key={radio.value} />)
                })}
            </div>
        </fieldset>
    )
}