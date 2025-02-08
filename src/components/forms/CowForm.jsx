import { useState } from "react";
import Button from "../Button";
import RadioFieldset from "../RadioFieldset";
import Select from "../Select";
import Input from "./Input";
import Card from "../layout/Card";
import PropTypes from 'prop-types';

export default function CowForm({ onSubmit, onClose }) {
    const [isCowRegistered, setIsCowRegistered] = useState(false)
    const [earingIdValue, setEaringIdValue] = useState("")
    const [hasEaringValue, setHasEaringValue] = useState(true)
    const [errors, setErrors] = useState({})

    const validateForm = (formData) => {
        const newErrors = {};

        // Required fields validation
        if (!formData.name?.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.birthDate) {
            newErrors.birthDate = 'La fecha de nacimiento es requerida';
        }

        if (!formData.sex) {
            newErrors.sex = 'El sexo es requerido';
        }

        // Registered cow validations
        if (isCowRegistered) {
            if (hasEaringValue && !earingIdValue?.trim()) {
                newErrors.earingId = 'El número de arete es requerido para vacas registradas con arete';
            }

            if (earingIdValue && !/^\d+$/.test(earingIdValue)) {
                newErrors.earingId = 'El número de arete debe contener solo números';
            }
        }

        // Date validation
        if (formData.birthDate) {
            const birthDate = new Date(formData.birthDate);
            const today = new Date();
            if (birthDate > today) {
                newErrors.birthDate = 'La fecha de nacimiento no puede ser futura';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const cowData = {
            ...data,
            isRegistered: isCowRegistered,
            hasEaring: hasEaringValue,
            earingId: earingIdValue,
            birthDate: new Date(data.birthDate)
        };

        if (!validateForm(cowData)) {
            return;
        }

        onSubmit(cowData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
                name="name" 
                label="Nombre" 
                required 
                error={errors.name}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="birthDate"
                    label="Fecha de nacimiento"
                    type="date"
                    required
                    error={errors.birthDate}
                />

                <RadioFieldset
                    legend="Sexo"
                    name="sex"
                    required
                    error={errors.sex}
                    radios={[
                        { value: "male", label: "Macho" },
                        { value: "female", label: "Hembra" }
                    ]}
                />
            </div>

            <Card className="space-y-4">
                <Input
                    name="isRegistered"
                    type="checkbox"
                    label="Está registrado"
                    checked={isCowRegistered}
                    onChange={(e) => {
                        setIsCowRegistered(e.target.checked);
                        if (!e.target.checked) {
                            setEaringIdValue("");
                            setHasEaringValue(true);
                        }
                    }}
                />

                {isCowRegistered && (
                    <>
                        <Input
                            name="hasEaring"
                            type="checkbox"
                            label="Tiene arete"
                            checked={hasEaringValue}
                            onChange={(e) => {
                                setHasEaringValue(e.target.checked);
                                if (!e.target.checked) {
                                    setEaringIdValue("");
                                }
                            }}
                        />

                        <Input
                            name="earingId"
                            label="Código de arete"
                            required={hasEaringValue}
                            disabled={!hasEaringValue}
                            value={earingIdValue}
                            onChange={(e) => setEaringIdValue(e.target.value)}
                            type="number"
                            min="1"
                            error={errors.earingId}
                        />
                    </>
                )}
            </Card>

            <div className="grid grid-cols-3 gap-4">
                <Select
                    defaultOption={{ value: "tacahuite", text: "Tacahuite" }}
                    label="UPP"
                    name="upp"
                    required
                    options={[
                        { value: "elJobo", text: "El Jobo" },
                    ]}
                />
                <Select
                    defaultOption={{ value: "iL", text: "IL" }}
                    label="Fierro"
                    name="mark"
                    required
                    options={[
                        { value: "fM", text: "FM" },
                    ]}
                />
                <Select
                    defaultOption={{ value: "ill", text: "Ill" }}
                    label="Cruza"
                    name="breed"
                    required
                    options={[
                        { value: "orr", text: "Orr" },
                        { value: "mich", text: "Mich" }
                    ]}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                    text="Cancelar"
                    onClick={onClose}
                    type="button"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                />
                <Button 
                    text="Crear vaca" 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                />
            </div>
        </form>
    );
}

CowForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};
