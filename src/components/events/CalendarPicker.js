import React, { useState } from 'react';

const CalendarPicker = ({ selectedDate, onDateSelect, onCancel }) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        calendarDays.push(i);
    }

    const handleDateClick = (day) => {
        if (!day) return;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onDateSelect(dateStr);
    };

    const isToday = (day) => {
        if (!day) return false;
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    const isSelected = (day) => {
        if (!day || !selectedDate) return false;
        const sel = new Date(selectedDate);
        return (
            day === sel.getDate() &&
            month === sel.getMonth() &&
            year === sel.getFullYear()
        );
    };

    return (
        <div className="calendar-picker-overlay">
            <div className="calendar-picker">
                <div className="calendar-picker-header">
                    <button type="button" onClick={prevMonth}>&lt;</button>
                    <h3>{monthNames[month]} {year}</h3>
                    <button type="button" onClick={nextMonth}>&gt;</button>
                </div>
                <div className="calendar-picker-grid">
                    <div className="day-name">Su</div>
                    <div className="day-name">Mo</div>
                    <div className="day-name">Tu</div>
                    <div className="day-name">We</div>
                    <div className="day-name">Th</div>
                    <div className="day-name">Fr</div>
                    <div className="day-name">Sa</div>
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`picker-day ${day ? '' : 'empty'} ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calendar-picker-footer">
                    <button type="button" onClick={onCancel} className="btn-cancel-picker">Close</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarPicker;
