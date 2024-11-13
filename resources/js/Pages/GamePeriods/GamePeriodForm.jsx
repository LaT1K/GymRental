import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Button from '@/Components/Button';

const GamePeriodForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        start_date: '',
        end_date: '',
        duration_weeks: '',
    });

    // Функція для обчислення кількості тижнів
    const calculateWeeks = (start, end) => {
        if (!start || !end) return '';
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDifference = endDate - startDate;
        const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        return weeks > 0 ? weeks : '';
    };

    // Виконуємо розрахунок тривалості при зміні дат
    useEffect(() => {
        const weeks = calculateWeeks(data.start_date, data.end_date);
        setData('duration_weeks', weeks);
    }, [data.start_date, data.end_date]);

    // Обчислюємо статус форми, чи всі поля заповнені
    const isFormComplete = data.start_date && data.end_date && data.duration_weeks;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/game_periods', {
            onSuccess: () => {
                window.location.href = '/game_periods';
            },
        });
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Створити Період Гри</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Початок</label>
                    <input
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Кінець</label>
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Тривалість (тижні)</label>
                    <input
                        type="number"
                        value={data.duration_weeks}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.duration_weeks && <p className="text-red-500 text-sm mt-1">{errors.duration_weeks}</p>}
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    color="blue"
                    disabled={processing || !isFormComplete} // Кнопка неактивна, якщо форма не повна
                >
                    Створити
                </Button>
            </form>
        </div>
    );
};

export default GamePeriodForm;
