import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ScheduleIndex = ({ gamePeriod, schedules }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [type, setType] = useState('game');

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
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        />
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
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Додати розклад
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
        
    );
};

export default ScheduleIndex;
