import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const ParticipantForm = ({ participant = {}, isEditing = false }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        name: participant.name || '',
        phone: participant.phone || '',
        telegram_username: participant.telegram_username || '',
        joined_date: participant.joined_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/participants/${participant.id}`);
        } else {
            post('/participants');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    {isEditing ? "Редагувати Учасника" : "Додати Учасника"}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700">Ім'я</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="Ім'я"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Телефон</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="Телефон"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Telegram Username</label>
                        <input
                            type="text"
                            value={data.telegram_username}
                            onChange={e => setData('telegram_username', e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="@username"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Дата Приєднання</label>
                        <input
                            type="date"
                            value={data.joined_date}
                            onChange={e => setData('joined_date', e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                        />
                        {errors.joined_date && <p className="text-red-500 text-sm mt-1">{errors.joined_date}</p>}
                    </div>

                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                            disabled={processing}
                        >
                            {isEditing ? "Зберегти Зміни" : "Додати Учасника"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParticipantForm;
