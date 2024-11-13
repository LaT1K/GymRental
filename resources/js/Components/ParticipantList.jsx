import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const ParticipantList = ({ participants }) => {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Ви впевнені?',
            text: "Ви хочете видалити цього учасника?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Так, видалити!',
            cancelButtonText: 'Скасувати'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/participants/${id}`);
                Swal.fire(
                    'Видалено!',
                    'Учасника успішно видалено.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {participants.map((participant) => (
                <div key={participant.id} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-2">{participant.name}</h3>
                    <p className="text-gray-600">Телефон: {participant.phone || "Немає даних"}</p>
                    <p className="text-gray-600">Telegram: {participant.telegram_username || "Немає даних"}</p>
                    <p className="text-gray-600">Дата приєднання: {participant.joined_date}</p>
                    <div className="flex justify-end mt-4">
                        <Link
                            href={`/participants/${participant.id}/edit`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Редагувати
                        </Link>
                        <button
                            onClick={() => handleDelete(participant.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Видалити
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParticipantList;
