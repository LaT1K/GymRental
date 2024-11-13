import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ScheduleIndex = ({ gamePeriod, schedules }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState(''); 
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [type, setType] = useState('game');

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'];
        const selectedDay = new Date(date).getDay();
        setDayOfWeek(days[selectedDay]);
    };

    const handleScheduleSubmit = () => {
        if (!selectedDate || !startTime || !endTime) {
            alert("Заповніть всі поля.");
            return;
        }

        Inertia.post(`/game_periods/${gamePeriod.id}/schedules`, {
            date: selectedDate,
            start_time: startTime,
            end_time: endTime,
            type: type,
        });
    };

    // Перевіряємо, чи всі поля заповнені
    const isFormComplete = selectedDate && startTime && endTime;

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 py-8">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    Розклад для періоду з {gamePeriod.start_date} по {gamePeriod.end_date}
                </h1>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                    <div className="mb-6">
                        <label className="block text-gray-700">Виберіть дату</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full p-2 border rounded mt-2"
                        />
                        {dayOfWeek && (
                            <p className="mt-2 text-gray-500">{dayOfWeek}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Час початку</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Час закінчення</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Тип</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        >
                            <option value="game">Гра</option>
                            <option value="training">Тренування</option>
                            <option value="sublease">Суборенда</option>
                        </select>
                    </div>

                    <button
                        onClick={handleScheduleSubmit}
                        className={`px-4 py-2 rounded ${
                            isFormComplete ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200'
                        }`}
                        disabled={!isFormComplete}
                    >
                        Додати розклад
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ScheduleIndex;
