import React, { useState } from 'react';

const CalenderView = ({ events, onEdit, onDelete }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const calendarDays = [];
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null);
    }
    // Add actual days
    for (let i = 1; i <= totalDays; i++) {
        calendarDays.push(i);
    }

    const getDayEvents = (day) => {
        if (!day) return [];
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(ev => ev.date === dateStr);
    };

    return (
        <div className="calendar-view">
            <div className="calendar-header">
                <button className="nav-btn-prev" onClick={prevMonth}>&lt; Prev</button>
                <div className="calendar-title">
                    <h2>{monthNames[month]} {year}</h2>
                </div>
                <button className="nav-btn-next" onClick={nextMonth}>Next &gt;</button>
            </div>
            <div className="calendar-grid">
                <div className="day-name">Sun</div>
                <div className="day-name">Mon</div>
                <div className="day-name">Tue</div>
                <div className="day-name">Wed</div>
                <div className="day-name">Thu</div>
                <div className="day-name">Fri</div>
                <div className="day-name">Sat</div>
                {calendarDays.map((day, index) => (
                    <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
                        {day && (
                            <>
                                <span className="day-number">{day}</span>
                                <div className="day-events">
                                    {getDayEvents(day).map(ev => (
                                        <div key={ev.id} className="small-event" onClick={() => onEdit(ev)}>
                                            {ev.title}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalenderView;
