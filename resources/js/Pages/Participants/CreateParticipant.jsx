import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import ParticipantForm from '@/Components/ParticipantForm';

const CreateParticipant = () => {
    const { post } = useForm({
        name: '',
        phone: '',
        telegram_username: '',
        joined_date: '',
    });

    const handleSubmit = (data) => {
        post('/participants', data);
    };

    return (
        <>
            <Head title="Додати учасника" />
            <div className="container mx-auto mt-8">
                <ParticipantForm onSubmit={handleSubmit} />
            </div>
        </>
    );
};

export default CreateParticipant;
