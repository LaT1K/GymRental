import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

const EditParticipantForm = () => {
    const { participant } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: participant.name || '',
        phone: participant.phone || '',
        telegram_username: participant.telegram_username || '',
        joined_date: participant.joined_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('participants.update', participant.id));
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Редагувати Учасника</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Ім'я</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Телефон</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Telegram</label>
                    <input
                        type="text"
                        value={data.telegram_username}
                        onChange={(e) => setData('telegram_username', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.telegram_username && (
                        <div className="text-red-500 text-sm mt-1">{errors.telegram_username}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Дата приєднання</label>
                    <input
                        type="date"
                        value={data.joined_date}
                        onChange={(e) => setData('joined_date', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.joined_date && <div className="text-red-500 text-sm mt-1">{errors.joined_date}</div>}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Зберегти зміни
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditParticipantForm;
