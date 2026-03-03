import React from 'react';

const EventItem = ({ event, onEdit, onDelete, onComplete, showActions }) => {
    return (
        <div className={`event-item ${event.completed ? 'completed' : ''}`}>
            <div className="event-info">
                <h3>
                    {event.title}
                    {event.completed && <span className="status-badge completed">Completed</span>}
                </h3>
                <p className="event-time">
                    📅 {event.date} | 🕒 {event.startTime} - {event.endTime}
                </p>
                {event.description && <p className="event-desc">{event.description}</p>}
            </div>
            <div className="event-actions">
                {!event.completed && (
                    <button className="btn-complete" onClick={() => onComplete(event.id)}>Done</button>
                )}
                {showActions && (
                    <>
                        <button className="btn-edit" onClick={() => onEdit(event)}>Edit</button>
                        <button className="btn-delete" onClick={() => onDelete(event.id)}>Delete</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventItem;
