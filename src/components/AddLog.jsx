import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry } from '../api'

const AddLogForm = ({ location, onClose }) => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const onSubmit = async (data) => { 
        try {
            setLoading(true)
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data)
            onClose()
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="logForm">
            { error ? <h4 className="error">{error}</h4> : null}
            <h5 className="addLogHeader">Kindly fill</h5>
            <div className="input-group">
                <label>API Key</label>
                <input type="password" className="form-style" ref={register} name="apiKey" required />
            </div>
            <div className="input-group">
                <label>Title</label>
                <input type="text" className="form-style" ref={register} name="title" required />
            </div>
            <div className="input-group">
                <label>Comment</label>
                <textarea ref={register} name="comment" rows="3">
                </textarea>
            </div>
            <div className="input-group">
                <label>Description</label>
                <textarea ref={register} name="description" rows="3">

                </textarea>
            </div>
            <div className="input-group">
                <label>Rating</label>
                <select ref={register} className="form-style" name="rating">
                    <option value="5">5</option>
                </select>
            </div>
            <div className="input-group">
                <label>Image</label>
                <input ref={register} type="text" className="form-style" name="image" />
            </div>
            <div className="input-group">
                <label>Visit Date</label>
                <input ref={register} type="date" className="form-style" name="visitDate" required />
            </div>
            <div className="input-group">
                <button disabled={loading} type="submit" className="custom-button">
                    {
                        loading ? 'Loading...' : 'Add Log Entry'
                    }
                </button>
            </div>
        </form>
    )
}

export default AddLogForm;