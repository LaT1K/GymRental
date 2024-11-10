import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [telegramUsername, setTelegramUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/participants', {
            name,
            phone,
            telegram_username: telegramUsername,
        });
    };

    return (
        <div>
            <h1>Add New Participant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Telegram Username:</label>
                    <input type="text" value={telegramUsername} onChange={(e) => setTelegramUsername(e.target.value)} />
                </div>
                <button type="submit">Add Participant</button>
            </form>
        </div>
    );
};

export default Create;
