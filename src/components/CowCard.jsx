import PropTypes from "prop-types"
import { SEX_TEXT, UPP_TEXT, MARK_TEXT } from "../data/types"
import Badge from "./cards/Badge"
import CardHeader from "./cards/CardHeader"
import DetailItem from "./cards/DetailItem"
import { getCowImage } from "../data/cowImages"
import Tooltip from "./common/Tooltip"
import Button from "./Button"
import MoreOptionsMenu from './common/MoreOptionsMenu'
import { useState } from 'react'
import ImageModal from './modals/ImageModal'

export default function CowCard({ id, name, upp, mark, isRegistered, birthDate, breed, sex, earingId, hasEaring, onDelete, selected, onSelect, getMenuOptions, imageUrl }) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const date = new Date()
    const months = date.getMonth() - birthDate.getMonth() + 
      (date.getDate() < birthDate.getDate() ? -1 : 0)
    const age = date.getFullYear() - birthDate.getFullYear() - 
      (months < 0 ? 1 : 0)
    const adjustedMonths = months < 0 ? months + 12 : months

    const renderSubtitle = () => (
        <div className="flex items-center gap-2">
            <Tooltip text={`Fecha de nacimiento: ${birthDate.toLocaleDateString()}`}>
                <span>
                    {age} {age === 1 ? 'año' : 'años'}
                    {adjustedMonths > 0 && `, ${adjustedMonths} ${adjustedMonths === 1 ? 'mes' : 'meses'}`}
                </span>
            </Tooltip>
            <span className="text-gray-300">•</span>
            <span>
                Cruza: {breed}
            </span>
        </div>
    )

    const menuOptions = getMenuOptions({ id, name, upp, mark, isRegistered, birthDate, breed, sex, earingId, hasEaring });

    return (
        <>
            <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
                <div className="relative">
                    <img 
                        src={imageUrl || getCowImage(id)} 
                        alt={`Foto de ${name}`}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => setIsImageModalOpen(true)}
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                        <Badge>{SEX_TEXT[sex]}</Badge>
                        <MoreOptionsMenu options={menuOptions} />
                    </div>
                    <div className="absolute top-3 left-3">
                        <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => onSelect(id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    <CardHeader 
                        title={name}
                        subtitle={renderSubtitle()}
                    />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <DetailItem 
                                label="Fierro"
                                value={MARK_TEXT[mark]}
                            />
                            <Badge variant="info">
                                {UPP_TEXT[upp]}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                            {isRegistered ? (
                                <DetailItem 
                                    label="Arete"
                                    value={earingId}
                                />
                            ) : (
                                <span className="text-sm text-red-500 font-medium">
                                    Sin registrar
                                </span>
                            )}
                            
                            {!hasEaring && isRegistered && (
                                <Badge variant="error">
                                    Sin arete
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            <ImageModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={imageUrl || getCowImage(id)}
                cowName={name}
            />
        </>
    )
}

CowCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    upp: PropTypes.string.isRequired,
    mark: PropTypes.string.isRequired,
    isRegistered: PropTypes.bool.isRequired,
    birthDate: PropTypes.instanceOf(Date).isRequired,
    breed: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    earingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasEaring: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    getMenuOptions: PropTypes.func.isRequired,
    imageUrl: PropTypes.string,
}