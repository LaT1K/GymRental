// resources/js/Pages/Prices/Index.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/Button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ prices = [] }) => {
    const [editingPrice, setEditingPrice] = useState(null); // Ціна, яку редагуємо
    const [priceValue, setPriceValue] = useState(''); // Значення для редагування

    const handleEditClick = (price) => {
        setEditingPrice(price);
        setPriceValue(price.price); // Встановлюємо початкове значення ціни
    };

    const handleSaveClick = () => {
        Inertia.put(route('prices.update', editingPrice.id), { price: priceValue });
        setEditingPrice(null); // Закриваємо форму редагування після збереження
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Управління цінами</h1>
                {prices.length === 0 ? (
                    <p>Ціни ще не додані.</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-3">Тип бронювання</th>
                                <th className="border-b p-3">Тип ціни</th>
                                <th className="border-b p-3">Ціна</th>
                                <th className="border-b p-3">Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map((price) => (
                                <tr key={price.id}>
                                    <td className="border-b p-3">{price.booking_type}</td>
                                    <td className="border-b p-3">{price.pricing_type}</td>
                                    <td className="border-b p-3">
                                        {editingPrice && editingPrice.id === price.id ? (
                                            <input
                                                type="number"
                                                value={priceValue}
                                                onChange={(e) => setPriceValue(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            />
                                        ) : (
                                            price.price
                                        )}
                                    </td>
                                    <td className="border-b p-3">
                                        {editingPrice && editingPrice.id === price.id ? (
                                            <Button onClick={handleSaveClick} color="blue">
                                                Зберегти
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleEditClick(price)} color="blue">
                                                Змінити ціну
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        </AuthenticatedLayout>
        
    );
};

export default Index;
