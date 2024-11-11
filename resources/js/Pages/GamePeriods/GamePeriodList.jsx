import React from 'react';
import { Link } from '@inertiajs/react';

const GamePeriodList = ({ gamePeriods }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gamePeriods.map((period) => (
            <div key={period.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">
                    Період з {period.start_date} по {period.end_date}
                </h3>
                <p className="text-gray-600">Тривалість: {period.duration_weeks} тижнів</p>
                <div className="flex justify-end mt-4">
                    <Link
                        href={`/game_periods/${period.id}/schedules`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Розклад
                    </Link>
                    <Link
                        href={`/game_periods/${period.id}/weekly_bookings`}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Бронювання
                    </Link>
                </div>
            </div>
        ))}
    </div>
);

export default GamePeriodList;
