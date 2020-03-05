import React from 'react'
import './PreLoader.css'

const PreLoader = () => {
    return (
        <div className="preloader-wrapper">
            <div className="bar">
                <div className="circle"></div>
                <p>Loading</p>  
            </div>
        </div>
    )
}

export default PreLoader
