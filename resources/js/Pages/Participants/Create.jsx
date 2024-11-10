import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        telegram_username: '',
        joined_date: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/participants', form);
    };

    return (
        <div>
            <h1>Add Participant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Telegram Username:</label>
                    <input type="text" name="telegram_username" value={form.telegram_username} onChange={handleChange} />
                </div>
                <div>
                    <label>Joined Date:</label>
                    <input type="date" name="joined_date" value={form.joined_date} onChange={handleChange} required />
                </div>
                <button type="submit">Add Participant</button>
            </form>
        </div>
    );
};

export default Create;
