import { useState, useEffect } from "react";
import Button from "../Button";
import RadioFieldset from "../RadioFieldset";
import Select from "../Select";
import Input from "./Input";
import Card from "../layout/Card";
import PropTypes from 'prop-types';

export default function CowForm({ onSubmit, onClose, initialData = null }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        sex: initialData?.sex || '',
        upp: initialData?.upp || '',
        mark: initialData?.mark || '',
        breed: initialData?.breed || '',
        birthDate: initialData?.birthDate || new Date(),
        isRegistered: initialData?.isRegistered || false,
        hasEaring: initialData?.hasEaring || false,
        earingId: initialData?.earingId || ''
    });

    const [isCowRegistered, setIsCowRegistered] = useState(initialData?.isRegistered || false);
    const [earingIdValue, setEaringIdValue] = useState(initialData?.earingId || "");
    const [hasEaringValue, setHasEaringValue] = useState(initialData?.hasEaring ?? true);
    const [errors, setErrors] = useState({})

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                sex: initialData.sex,
                upp: initialData.upp,
                mark: initialData.mark,
                breed: initialData.breed,
                birthDate: initialData.birthDate,
                isRegistered: initialData.isRegistered,
                hasEaring: initialData.hasEaring,
                earingId: initialData.earingId || ''
            });
            setIsCowRegistered(initialData.isRegistered);
            setHasEaringValue(initialData.hasEaring);
            setEaringIdValue(initialData.earingId || '');
        }
    }, [initialData]);

    // Format date for input
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

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
            if (hasEaringValue && !earingIdValue) {
                newErrors.earingId = 'El número de arete es requerido para vacas registradas con arete';
            }

            if (earingIdValue && !/^\d+$/.test(earingIdValue.toString())) {
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
            birthDate: new Date(data.birthDate),
            id: initialData?.id // Keep the same ID if editing
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
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                error={errors.name}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="birthDate"
                    label="Fecha de nacimiento"
                    type="date"
                    required
                    value={formatDateForInput(formData.birthDate)}
                    onChange={(e) => setFormData({...formData, birthDate: new Date(e.target.value)})}
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
                    value={formData.sex}
                    onChange={(value) => setFormData({...formData, sex: value})}
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
                            type="text"
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
                    value={formData.upp}
                    onChange={(value) => setFormData({...formData, upp: value})}
                />
                <Select
                    defaultOption={{ value: "iL", text: "IL" }}
                    label="Fierro"
                    name="mark"
                    required
                    options={[
                        { value: "fM", text: "FM" },
                    ]}
                    value={formData.mark}
                    onChange={(value) => setFormData({...formData, mark: value})}
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
                    value={formData.breed}
                    onChange={(value) => setFormData({...formData, breed: value})}
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
                    text={initialData ? "Guardar cambios" : "Crear vaca"}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                />
            </div>
        </form>
    );
}

CowForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialData: PropTypes.object
};
