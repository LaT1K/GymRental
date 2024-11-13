import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const EditParticipantForm = () => {
    const { participant } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: participant.name || '',
        phone: participant.phone || '',
        telegram_username: participant.telegram_username || '',
        joined_date: participant.joined_date || '',
    });

    const [isFormComplete, setIsFormComplete] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormComplete) {
            put(route('participants.update', participant.id), {
                onSuccess: () => {
                    Inertia.visit(route('participants.index')); // Перенаправлення після успішного оновлення
                },
            });
        }
    };

    // Обробник для введення тільки цифр у полі "Телефон"
    const handlePhoneInput = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Залишає тільки цифри
        setData('phone', value.slice(0, 10)); // Обмежує до 10 символів
    };

    // Обробник для введення тільки англійських букв, цифр та підкреслення в полі "Telegram"
    const handleTelegramInput = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, ''); // Залишає тільки англійські символи, цифри та підкреслення
        setData('telegram_username', value);
    };

    // Оновлення статусу форми при зміні значень полів
    useEffect(() => {
        setIsFormComplete(
            data.name.trim() !== '' &&
            data.phone.trim().length === 10 && // Перевірка на 10 цифр
            data.telegram_username.trim() !== '' &&
            data.joined_date.trim() !== ''
        );
    }, [data]);

    return (
        <AuthenticatedLayout>
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
                            onChange={handlePhoneInput}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Telegram</label>
                        <input
                            type="text"
                            value={data.telegram_username}
                            onChange={handleTelegramInput}
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
                            disabled={processing || !isFormComplete}
                            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                                isFormComplete ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            Зберегти зміни
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditParticipantForm;
