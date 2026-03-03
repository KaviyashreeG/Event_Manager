import React, { useState } from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onEdit, onDelete, onComplete, onAdd }) => {
    const [showActions, setShowActions] = useState(false);

    if (events.length === 0) {
        return (
            <div className="event-list">
                <div className="event-list-header">
                    <h2>Upcoming Events</h2>
                    <button className="btn-add-circle" onClick={onAdd} title="Add Event">+</button>
                </div>
                <div className="empty-list">No events scheduled.</div>
            </div>
        );
    }

    // Sort events by date and time
    const sortedEvents = [...events].sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.startTime.localeCompare(b.startTime);
    });

    return (
        <div className="event-list">
            <div className="event-list-header">
                <h2>Upcoming Events</h2>
                <div className="header-actions">
                    <button
                        className={`btn-toggle-actions ${showActions ? 'active' : ''}`}
                        onClick={() => setShowActions(!showActions)}
                    >
                        {showActions ? 'Done Editing' : 'Edit List'}
                    </button>
                    <button className="btn-add-circle" onClick={onAdd} title="Add Event">+</button>
                </div>
            </div>
            <div className="event-items">
                {sortedEvents.map(event => (
                    <EventItem
                        key={event.id}
                        event={event}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onComplete={onComplete}
                        showActions={showActions}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventList;
