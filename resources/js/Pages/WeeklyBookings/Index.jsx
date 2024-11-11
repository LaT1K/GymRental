import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const WeeklyBookingIndex = ({ gamePeriod, bookings, participants }) => {
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const { flash } = usePage().props;

    const handleParticipantChange = (e) => {
        const value = parseInt(e.target.value);

        setSelectedParticipants((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((id) => id !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };

    const handleBookingSubmit = () => {
        if (selectedParticipants.length === 0) {
            alert("Виберіть принаймні одного гравця.");
            return;
        }

        Inertia.post(`/game_periods/${gamePeriod.id}/weekly_bookings`, {
            participant_ids: selectedParticipants,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Ви впевнені, що хочете видалити це бронювання?")) {
            Inertia.delete(`/weekly_bookings/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 py-8">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    Бронювання для періоду з {gamePeriod.start_date} по {gamePeriod.end_date}
                </h1>
                
                {flash && flash.message && (
                    <div className="bg-green-500 text-white p-4 rounded mb-4">
                        {flash.message}
                    </div>
                )}

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Додати гравців до бронювання</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Виберіть гравців</label>
                        <div className="border rounded p-2 mt-2">
                            {participants.map((participant) => (
                                <label key={participant.id} className="block">
                                    <input
                                        type="checkbox"
                                        value={participant.id}
                                        checked={selectedParticipants.includes(participant.id)}
                                        onChange={handleParticipantChange}
                                        className="mr-2"
                                    />
                                    {participant.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleBookingSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Додати гравців
                    </button>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Список бронювань</h2>
                    {bookings.length === 0 ? (
                        <p>Немає заброньованих гравців.</p>
                    ) : (
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking.id} className="flex justify-between items-center border-b py-2">
                                    <span>{booking.participant.name}</span>
                                    <button
                                        onClick={() => handleDelete(booking.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Видалити
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
        
    );
};

export default WeeklyBookingIndex;
