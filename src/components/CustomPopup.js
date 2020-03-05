import React from 'react'

const CustomPopup = ({ entry }) => {
    return (
        <div className="popup">
            <h3>{entry.title}</h3>
            <p>{entry.comment}</p>
            <small>Visited Date: {new Date(entry.visitDate).toLocaleDateString()}</small>
            {
            entry.image ? 
            <img src={entry.image} alt={`View of ${entry.title}`} />
            : null
            }
        </div>
    )
}

export default CustomPopup
