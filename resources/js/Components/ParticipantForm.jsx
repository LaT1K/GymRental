import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const ParticipantForm = ({ participant = {}, isEditing = false }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        name: participant.name || '',
        phone: participant.phone || '',
        telegram_username: participant.telegram_username || '',
        joined_date: participant.joined_date || '',
    });

    const [isFormComplete, setIsFormComplete] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Перевірка на заповнення всіх полів
        if (!data.name || !data.phone || !data.telegram_username || !data.joined_date) {
            Swal.fire({
                icon: 'warning',
                title: 'Помилка',
                text: 'Будь ласка, заповніть усі поля!',
            });
            return;
        }

        const submitAction = isEditing ? put : post;
        const url = isEditing ? `/participants/${participant.id}` : '/participants';

        submitAction(url, {
            onError: (error) => {
                if (error.name) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Помилка',
                        text: 'Учасник з таким ім\'ям вже існує!',
                    });
                }
            },
        });
    };

    // Обробник введення для поля телефону (тільки цифри, не більше 10 символів)
    const handlePhoneInput = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Видаляє всі нецифрові символи
        setData('phone', value.slice(0, 10)); // Обмежує до 10 символів
    };

    // Обробник введення для Telegram username (тільки англійські букви, цифри та підкреслення)
    const handleTelegramInput = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, ''); // Видаляє всі символи, крім англійських букв, цифр і підкреслення
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
                            onChange={handlePhoneInput}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="Телефон"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Telegram Username</label>
                        <input
                            type="text"
                            value={data.telegram_username}
                            onChange={handleTelegramInput}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            placeholder="@username"
                        />
                        {errors.telegram_username && <p className="text-red-500 text-sm mt-1">{errors.telegram_username}</p>}
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
                            className={`w-full py-3 rounded-lg shadow transition duration-200 ${
                                isFormComplete ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                            disabled={processing || !isFormComplete}
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
