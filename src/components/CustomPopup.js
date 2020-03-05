import React from 'react'

const CustomPopup = ({ entry }) => {
    return (
        <div className="popup">
            <h3>{entry.title}</h3>
            <h4>{entry.comment}</h4>
            <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
            {
                entry.image ? 
                <img src={entry.image} alt={`View of ${entry.title}`} />
                : null
            }
        </div>
    )
}

export default CustomPopup
