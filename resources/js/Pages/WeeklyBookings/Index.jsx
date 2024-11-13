import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const WeeklyBookingIndex = ({ gamePeriod, bookings, participants, schedules, pricing }) => {
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedPricingTypes, setSelectedPricingTypes] = useState({});
    const { flash } = usePage().props;

    const handleParticipantChange = (e) => {
        const value = parseInt(e.target.value);
        setSelectedParticipants((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((id) => id !== value)
                : [...prevSelected, value]
        );
    };

    const handlePricingTypeChange = (participantId, pricingType) => {
        setSelectedPricingTypes((prev) => ({
            ...prev,
            [participantId]: pricingType,
        }));
    };

    const handleBookingSubmit = () => {
        if (!selectedSchedule) {
            Swal.fire({
                icon: 'warning',
                title: 'Помилка',
                text: 'Виберіть день тренування.',
            });
            return;
        }

        if (selectedParticipants.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Помилка',
                text: 'Виберіть принаймні одного гравця.',
            });
            return;
        }

        for (const participantId of selectedParticipants) {
            if (!selectedPricingTypes[participantId]) {
                const participantName = participants.find(p => p.id === participantId)?.name || 'гравця';
                Swal.fire({
                    icon: 'warning',
                    title: 'Помилка',
                    text: `Виберіть тип оплати для ${participantName}.`,
                });
                return;
            }
        }

        Inertia.post(
            `/game_periods/${gamePeriod.id}/weekly_bookings`,
            {
                participant_ids: selectedParticipants,
                schedule_id: selectedSchedule,
                pricing_types: selectedPricingTypes,
            },
            {
                onSuccess: () => {
                    setSelectedParticipants([]);
                    setSelectedPricingTypes({});
                    setSelectedSchedule(''); 
                    Inertia.reload(); 
                },
            }
        );
    };

    const handleDelete = (id) => {
        const participantName = bookings.find(b => b.id === id)?.participant?.name || 'гравця';
        Swal.fire({
            title: 'Ви впевнені?',
            text: `Це бронювання для ${participantName} буде видалено!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Так, видалити!',
            cancelButtonText: 'Скасувати'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/weekly_bookings/${id}`, {
                    onSuccess: () => Inertia.reload(),
                });
                Swal.fire(
                    'Видалено!',
                    `Бронювання для ${participantName} успішно видалено.`,
                    'success'
                );
            }
        });
    };

    const getPricingForSchedule = (scheduleId) => {
        const schedule = schedules.find((s) => s.id === parseInt(scheduleId));
        if (!schedule) return { oneTimePrice: 0, bookingPrice: 0 };

        const bookingPrices = pricing.filter((p) => p.booking_type === schedule.booking_type);
        const oneTimePrice = bookingPrices.find((p) => p.pricing_type === 'one_time')?.price || 0;
        const bookingPrice = bookingPrices.find((p) => p.pricing_type === 'booking')?.price || 0;
        return { oneTimePrice, bookingPrice };
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
                        <label className="block text-gray-700">Виберіть день тренування</label>
                        <select
                            value={selectedSchedule}
                            onChange={(e) => setSelectedSchedule(e.target.value)}
                            className="w-full p-2 border rounded mt-2"
                        >
                            <option value="">Оберіть день</option>
                            {schedules.map((schedule) => {
                                const { oneTimePrice, bookingPrice } = getPricingForSchedule(schedule.id);
                                return (
                                    <option key={schedule.id} value={schedule.id}>
                                        {schedule.date} ({schedule.day}) - {schedule.start_time} до {schedule.end_time} - {schedule.booking_type === 'game' ? 'Гра' : schedule.booking_type === 'training' ? 'Тренування' : 'Суборенда'}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Виберіть гравців</label>
                        <div className="border rounded p-2 mt-2">
                            {participants.map((participant) => (
                                <div key={participant.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        value={participant.id}
                                        checked={selectedParticipants.includes(participant.id)}
                                        onChange={handleParticipantChange}
                                        className="mr-2"
                                    />
                                    <span className="mr-4">{participant.name}</span>
                                    <div className="flex items-center">
                                        <label className="mr-2">
                                            <input
                                                type="radio"
                                                name={`pricingType_${participant.id}`}
                                                onChange={() => handlePricingTypeChange(participant.id, 'one_time')}
                                                checked={selectedPricingTypes[participant.id] === 'one_time'}
                                            />
                                            Одноразово - {getPricingForSchedule(selectedSchedule).oneTimePrice} грн
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`pricingType_${participant.id}`}
                                                onChange={() => handlePricingTypeChange(participant.id, 'booking')}
                                                checked={selectedPricingTypes[participant.id] === 'booking'}
                                            />
                                            Бронювання - {getPricingForSchedule(selectedSchedule).bookingPrice} грн
                                        </label>
                                    </div>
                                </div>
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
                    <h2 className="text-xl font-semibold mb-4">Список бронювань для обраного дня</h2>
                    {bookings.filter(b => b.schedule_id === parseInt(selectedSchedule)).length === 0 ? (
                        <p>Немає заброньованих гравців для обраного дня.</p>
                    ) : (
                        <ul>
                            {bookings.filter(b => b.schedule_id === parseInt(selectedSchedule)).map((booking) => (
                                <li key={booking.id} className="flex justify-between items-center border-b py-2">
                                    <span>{booking.participant.name} - {booking.fixed_price} грн</span>
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
