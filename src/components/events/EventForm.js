import React, { useState, useEffect } from 'react';
import CalendarPicker from './CalendarPicker';

const EventForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateSelect = (dateStr) => {
        setFormData({ ...formData, date: dateStr });
        setShowPicker(false);
    };

    const validate = () => {
        if (!formData.title || !formData.date || !formData.startTime || !formData.endTime) {
            setError('Title, Date, Start Time, and End Time are required.');
            return false;
        }
        if (formData.startTime >= formData.endTime) {
            setError('End time must be after start time.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="event-form">
            <h2>{initialData ? 'Edit Event' : 'Add New Event'}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Go to Gym"
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <div className="date-input-wrapper">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="btn-calendar-trigger"
                            onClick={() => setShowPicker(true)}
                            title="Open Calendar Picker"
                        >
                            📅
                        </button>
                    </div>
                </div>

                {showPicker && (
                    <CalendarPicker
                        selectedDate={formData.date}
                        onDateSelect={handleDateSelect}
                        onCancel={() => setShowPicker(false)}
                    />
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label>Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Description (Optional)</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Leg day workout"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {initialData ? 'Update Event' : 'Create Event'}
                    </button>
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
